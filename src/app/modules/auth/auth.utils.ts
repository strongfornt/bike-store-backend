import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  jwtPayload: { userId: any; role: string },
  secret: string,
  expiresIn: number | string ,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn: +expiresIn ,
  });

};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
