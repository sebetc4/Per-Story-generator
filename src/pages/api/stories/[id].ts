import { dbConnect } from '@/apps/api/configs';
import { deleteStory, getOneStory } from '@/apps/api/contollers';
import { handleHttpError } from '@/apps/api/utils';
import { CustomError } from '@/package/classes';
import { ReqMethods } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function storiesIdRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            await getOneStory(req, res);
            break;
        case ReqMethods.DELETE:
            await deleteStory(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }
}
