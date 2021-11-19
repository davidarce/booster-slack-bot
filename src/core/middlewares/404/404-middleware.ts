import { NextFunction, Request, Response } from 'express';

export function fourOFourMiddleware() {
  return (_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({ message: 'Not Found' });
  };
}
