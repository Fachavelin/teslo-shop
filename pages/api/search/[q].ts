import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/database';
import { IProduct } from '@/interfaces';
import { Product } from '@/models';

type Data =
  | {
      message: string;
    }
  | IProduct[];

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'GET':
      return searchProduct(req, res);
    default:
      return res.status(400).json({
        message: 'Bad Request',
      });
  }
}
async function searchProduct(req: NextApiRequest, res: NextApiResponse<Data>) {
  await db.connect();

  let { q = '' } = req.query;

  if (q.length === 0) {
    return res.status(400).json({
      message: 'Debe especificar el query para su busqueda',
    });
  }
  q = q.toString().toLocaleLowerCase();
  const products = await Product.find({
    $text: { $search: q },
  })
    .select('title images price inStock slug -_id')
    .lean();

  await db.disconnect();

  return res.status(200).json(products);
}
