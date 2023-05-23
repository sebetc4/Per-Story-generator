import { dbConnect } from '@/apps/api/configs';
import { createStory, getAllStoryTitles,  } from '@/apps/api/contollers';
import { handleHttpError } from '@/apps/api/utils/error.utils';
import { CustomError } from '@/package/classes';
import { ReqMethods } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function storiesRouter(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case ReqMethods.GET:
            await getAllStoryTitles(req, res);
            break;
        case ReqMethods.POST:
            await createStory(req, res);
            break;
        default:
            handleHttpError(CustomError.METHOD_NOT_ALLOWED, res);
    }

}