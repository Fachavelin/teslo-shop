import { jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';

export const singToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) throw new Error('No hay semilla de JWT - Revisar variables de entorno');

  return jwt.sign(
    //Payload
    {
      _id,
      email,
    },
    //Semilla
    process.env.JWT_SECRET_SEED,
    //Opciones
    {
      expiresIn: '30d',
    }
  );
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) throw new Error('No hay semilla de JWT - Revisar variables de entorno');

  if (token.length <= 10) return Promise.reject('JWT no valido');

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || '', (err, payload) => {
        if (err) return reject('JWT no es valido');

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (error) {
      reject('JWT no es valido');
    }
  });
};

/* export const isValidTokenJose = async (token: string) => {
  if (!token) throw new Error('No hay token');

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    const { _id } = payload as { _id: string };
    return _id;
  } catch (error) {
    throw new Error('Token invalido');
  }
};
 */
