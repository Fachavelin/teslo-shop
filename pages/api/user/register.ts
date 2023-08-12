import { db } from '@/database';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { jwt } from '@/utils';
import { isValidEmail } from '@/utils/validations';

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        role: string;
        name: string;
      };
    };

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
  switch (req.method) {
    case 'POST':
      return registerUser(req, res);

    default:
      res.status(400).json({
        message: 'Bad request',
      });
  }
}

async function registerUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    email = '',
    password = '',
    name = '',
  } = req.body as { email: string; password: string; name: string };

  await db.connect();

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      message: 'No puede usar ese correo',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: 'La contraseña debe ser de 6 caracteres',
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'El nombre debe tener al menos 3 carácteres',
    });
  }

  //TODO Validar email
  if (!isValidEmail(email)) {
    return res.status(400).json({
      message: 'Debe ser un email válido',
    });
  }

  const newUser = new User({
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password),
    role: 'client',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Revisar logs del servidor',
    });
  }

  const { role, _id } = newUser;

  const token = jwt.singToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
}
