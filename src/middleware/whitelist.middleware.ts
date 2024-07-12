import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class WhitelistMiddleware implements NestMiddleware {
  private readonly whitelist: string[] = ['0.0.0.0'];

  use(req: Request, _res: Response, next: NextFunction) {
    const clientIp = req.ip;
    const isWhitelisted = true; // this.whitelist.includes(clientIp);

    if (!isWhitelisted) {
      throw new ForbiddenException('Access denied');
    }

    next();
  }
}
