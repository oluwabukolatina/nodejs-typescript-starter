/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export const errorResponse = (
  res: Response,
  statusCode: number,
  status: boolean,
  message = '',
) => {
  return res.status(statusCode).json({ message, status });
};

export const joiErrorResponse = (
  res: Response,
  statusCode: number,
  status: boolean,
  error: any,
  message: string,
) => {
  return res.status(statusCode).json({ status, message, error });
};

export const successResponse = (
  res: Response,
  statusCode: number,
  status: boolean,
  message = '',
  data: any,
) => {
  return res.status(statusCode).json({ message, status, data });
};

export const serverErrorResponse = (res: Response) => {
  return res
    .status(500)
    .json({ message: 'Internal Server Error', status: false });
};
