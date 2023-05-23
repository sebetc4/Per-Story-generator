import { Model, ObjectId } from 'mongoose';

/*
/ Models
*/
export type ChapterSchema = {
    author: ObjectId;
    title: string;
    text: string;
    summary?: string;
    allChoices: string[];
    description: string;
    image: {
        url: string | null;
        public_id: string | null;
    };
};

export interface IChapterModel extends Model<ChapterSchema, {}, ChapterMethods> {}

export type ChapterMethods = {};

export type setValidatedChapterAllChoices = {
    choice: string;
    index: number;
};

export type ChapterType = {
    title: string;
    text: string;
    summary?: string;
    allChoices?: string[];
    description: string;
};

/*
/   Slice
*/
export type PreviousChapter = {
    title: string;
    text: string;
    summary?: string;
    allChoices: string[];
};

export type NextChapter = {
    themeIsEnabled: boolean;
    theme: string;
    allRequiredWords: string[];
};

export type GeneratedChapterType = {
    title: string;
    text: string;
    summary?: string;
    [key: string]: string | undefined;
    description: string;
};

export type SetNewChapterDataIsValid = {
    text: string;
    allChoices: string[];
    summary?: string;
};

/*
/ Front data
*/
export type ChapterData = {
    _id: string;
    title: string;
    text: string;
    summary?: string;
    allChoices?: string[];
    description: string;
    image: {
        url: string | null;
        public_id: string | null;
    };
};
