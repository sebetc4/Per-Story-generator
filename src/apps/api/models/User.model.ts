import { CustomError } from '@/package/classes';
import { IUserModel, UserMethods, UserSchema } from '@/types/user.types';
import { ObjectId, Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';
import { type } from 'os';

const schema = new Schema<UserSchema, IUserModel, UserMethods>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

schema.pre('validate', async function () {
    if (!this.email || this.isModified('email')) {
        const user = await User.findOne({ email: this.email });
        if (user) {
            throw CustomError.EMAIL_ALREADY_EXISTS;
        }
    }
});

schema.pre('save', async function () {
    if (this.password && this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

schema.methods.isValidPassword = async function (password: UserSchema['password']) {
    return await bcrypt.compare(password!, this.password);
};

schema.methods.isValidPassword = async function (password: UserSchema['password']) {
    return await bcrypt.compare(password!, this.password);
};

schema.methods.isAuthor = function (id: string | ObjectId) {
    return typeof id === 'string' ? this.id === id : this.id === id.toString();
};

export const User = models.User || model<UserSchema>('User', schema);
