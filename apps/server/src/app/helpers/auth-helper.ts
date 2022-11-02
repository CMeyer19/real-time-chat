import { parseJwt } from "@real-time-chat/util-shared/helpers/jwt-utils";
import { Request } from "express";
import { IdTokenInterface } from "@real-time-chat/util-shared/auth/abstractions/interfaces/id-token.interface";

export function transform(req: Request): IdTokenInterface {
  return parseJwt(req.header('Authorization'));
}
