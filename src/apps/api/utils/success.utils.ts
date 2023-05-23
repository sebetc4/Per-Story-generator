import { ResStatus } from "@/types";
import { NextApiResponse } from "next";

export const onSuccess = (statusCode: number, data: {}, res: NextApiResponse) => {
    res.status(statusCode).json({
        status: ResStatus.SUCCESS,
        ...data,
    });
}