import { dbConnect } from '@/apps/api/configs';
import { getOneChapter, modifyOneChapter } from '@/apps/api/contollers';
import { handleHttpError } from '@/apps/api/utils';
import { CustomError } from '@/package/classes';
import { ReqMethods } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function chaptersIdRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            await getOneChapter(req, res);
            break;
        case ReqMethods.PUT:
            await modifyOneChapter(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb'
        }
    }
}