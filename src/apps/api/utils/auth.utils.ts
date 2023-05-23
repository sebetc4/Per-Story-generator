import { CustomError } from "@/package/classes"
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import { GetServerSidePropsContext, NextApiRequest } from "next"
import { getToken } from "next-auth/jwt"
import { User } from "../models"
import { getSession } from "next-auth/react"
import { setAuthIsChecked, setUserIsAuth } from "@/store"
import { Routes } from "@/types"

export const authUser = async (req: NextApiRequest) => {
    const token = await getToken({req})
    if(!token) {
        throw CustomError.UNAUTHORIZED
    } 
    const user = await User.findById(token.sub)
    if(!user) {
        throw CustomError.INVALID_TOKEN
    } 
    return user
}

export const requireAuthUser = async (
    store: ToolkitStore,
    context: GetServerSidePropsContext,
    cb: () => { props: any }
) => {
    store.dispatch(setAuthIsChecked());
    const session = await getSession(context);
    if (!session) {
    return {
        redirect: {
            destination: Routes.SIGNIN,
            permanent: false,
        },
    }
    } else {
        store.dispatch(setUserIsAuth(session.user!.id));
        return cb();
    }
};

export const requireUnauthUser = async (
    store: ToolkitStore,
    context: GetServerSidePropsContext,
    cb: () => { props: any }
) => {
    store.dispatch(setAuthIsChecked());
    const session = await getSession(context);
    if (session) {
        return {
            redirect: {
                destination: Routes.STORY_SCHEMA,
                permanent: false,
            },
        };
    }
    return cb();
};
