import { Model, ObjectId } from 'mongoose';

export type StorySchema = {
    author: ObjectId
    title: string;
    story: string[][];
    protagonist: string
};

export interface IStoryModel extends Model<StorySchema, {}, StoryMethods> {}

export type StoryMethods = {};

export type CreatedStory = {
    storyId: string;
    title: string;
    chapterId: string;
};

export type StoryTitle = {
    title: string;
    _id: string;
};

export type StoryData = {
    _id: string;
    title: string;
    story: [string[], string[], string[], string[], string[]];
    protagonist: string;
};
