import { dbConnect } from "@/apps/api/configs";
import { signUp } from "@/apps/api/contollers";
import { handleHttpError } from "@/apps/api/utils";
import { CustomError } from "@/package/classes";
import { ReqMethods } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";


export default async function userRouter (req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.POST:
            await signUp(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
