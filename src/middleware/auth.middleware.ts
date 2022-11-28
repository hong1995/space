import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const name: string = req.query.name || req.body.name;

    if (name == 'Ryan') {
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
