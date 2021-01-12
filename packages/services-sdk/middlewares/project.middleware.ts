import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class ProjectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    const projectId = req.headers['x-project-id'];
    next();
  }
}
