import { ChapterMethods, ChapterSchema, IChapterModel } from '@/types';
import { Schema, Types, model, models } from 'mongoose';

const schema = new Schema<ChapterSchema, IChapterModel, ChapterMethods>(
    {
        author: {
            type: Types.ObjectId,
            ref: 'User',
            required: false,
        },
        title: {
            type: String,
        },
        text: {
            type: String,
        },
        summary: {
            type: String,
        },
        allChoices: {
            type: [String],
        },
        description: {
            type: String,
        },
        image: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
    },
    {
        timestamps: false,
    }
);

export const Chapter = models.Chapter || model<ChapterSchema, IChapterModel>('Chapter', schema);
