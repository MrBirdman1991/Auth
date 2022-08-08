import jwt from "jsonwebtoken"

export function signJwt(
    payload: Object,
    secret: string,
    options?: jwt.SignOptions | undefined,
  ) {
    return jwt.sign({ ...payload }, secret, {
      ...options,
    });
  }

export function verifyJwt(token: string, secret: string){
  return jwt.verify(token, secret)
}  