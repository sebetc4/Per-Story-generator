import { dbConnect } from '@/apps/api/configs';
import { createChapter } from '@/apps/api/contollers';
import { handleHttpError } from '@/apps/api/utils/error.utils';
import { CustomError } from '@/package/classes';
import { ReqMethods } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function chaptersRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.POST:
            await createChapter(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }

}