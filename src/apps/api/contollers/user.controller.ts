import { SignUpReq } from "@/package/types/request.types";
import { catchControllerError, onSuccess, validBody } from "../utils";
import { User } from "../models";
import { signUpSchema } from "@/package/schemas/auth.schemas";

export const signUp = catchControllerError(async (req, res) => {
    const { email, password } = await validBody<SignUpReq>(signUpSchema, req);
    await User.create({ email, password});
    onSuccess(201, { message: 'User is registered' }, res);
})