import { IStoryModel, StoryMethods, StorySchema } from '@/types';
import { Schema, Types, model, models } from 'mongoose';

const schema = new Schema<StorySchema, IStoryModel, StoryMethods>(
    {
        author: {
            type: Types.ObjectId,
            ref: 'User',
            required: false,
        },
        title: {
            type: String,
        },
        story: {
            type: [[String]],
        },
        protagonist: {
            type: String,
        },
    },
    {
        timestamps: false,
    }
);

schema.pre('remove', function () {
    console.log('Removing doc!');
});

export const Story = models.Story || model<StorySchema, IStoryModel>('Story', schema);
