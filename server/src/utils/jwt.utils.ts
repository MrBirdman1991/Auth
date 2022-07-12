import jwt from "jsonwebtoken"

export function signJwt(
    payload: Object,
    key: string,
    options?: jwt.SignOptions | undefined,
  ) {
    return jwt.sign({ ...payload }, key, {
      ...options,
    });
  }