import { Model } from 'mongoose';

export type UserSchema = {
    password: string;
    email: string;
};

export interface IUserModel extends Model<UserSchema, {}, UserMethods> {}

export type UserMethods = {
    isValidPassword: (password: UserSchema['password']) => Promise<boolean>;
    isAuthor: (userId: string) => boolean
};



export interface UserSession {
    id: string;
    email: string;
}