import { CustomError, CustomHttpError } from "@/package/classes";
import { NextApiRequest, NextApiResponse } from "next";

export const catchControllerError =
    (func: (req: NextApiRequest, res: NextApiResponse) => void) => (req: NextApiRequest, res: NextApiResponse) =>
        Promise.resolve(func(req, res)).catch((err) => handleHttpError(err, res));


export const handleHttpError = (err: Error | CustomError, res: NextApiResponse) => {
    const error = new CustomHttpError(err);
    let statusCode: number;
    if (!(err instanceof Error)) {
        statusCode = err.statusCode;
    } else if (err.name === 'ValidationError') {
        statusCode = 400;
    } else {
        statusCode = 500;
    }
    res.status(statusCode).json(error);
};