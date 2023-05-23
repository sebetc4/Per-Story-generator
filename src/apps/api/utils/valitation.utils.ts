import { NextApiRequest } from "next";
import { ObjectSchema } from "yup";

export const validBody = async <T>(schema: ObjectSchema<any>, req: NextApiRequest): Promise<T> => {
    await schema.validate(req.body);
    return req.body;
}