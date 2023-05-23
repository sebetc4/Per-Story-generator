import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { User } from '@/apps/api/models';
import { dbConnect } from '@/apps/api/configs';
import { UserSession } from '@/types/user.types';

declare module 'next-auth' {
    interface Session {
        expires: 'string';
        user: UserSession | null;
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials, req) {
                await dbConnect();
                const { email, password } = credentials as any
                console.log({ email, password })
                const user = await User.findOne({ email }).select('+password');
                if (!user) {
                    throw new Error('Aucun compte associé à cet email');
                }
                if (!(await user.isValidPassword(password))) {
                    throw new Error('Mot de passe incorrect');
                }
                return user;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, account }) => {
            if (account?.userId) {
                token.sub = account.userId;
            }
            return token;
        },

        session: async ({ session, token }) => {
            await dbConnect();
            const user = await User.findById(token.sub);
            if (!user) {
                session.user = null;
            } else {
                session.user = {
                    id: user._id,
                    email: user.email,
                }
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
