import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

export default function ensureIsProvider(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (!request.user.provider) {
    throw new AppError(
      'Sem privilégios para alterar informações nesta rotina.',
      405,
    );
  }

  return next();
}
