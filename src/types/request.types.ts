import { StoryTitle, StoryData, ChapterData } from '.';

export enum ReqMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export enum ResStatus {
    SUCCESS = 'sucess',
    ERROR = 'error',
}

/*
/   StoriesStory
*/
export type CreateStoryBody = {
    storyTitle: string;
    chapterTitle: string;
    text: string;
    description: string;
    protagonist: string;
};

export type CreateStoryRes = {
    chapterId: string;
    storyId: string;
    storyTitle: string;
    protagonist: string;
};

export type GetOneStoryRes = {
    story: StoryData;
};

export type GetAllStoryTitlesRes = {
    storyTitles: StoryTitle[];
};

/*
/   Chapters
*/

export type GetOneChapterRes = {
    chapter: ChapterData;
};

export type CreateChapterBody = {
    title: string;
    text: string;
    summary?: string;
    allChoices: string[];
    description: string;
    rowIndex: number;
    chapterIndex: number;
    storyId: string;
};

export type CreateChapterRes = {
    chapterId: string;
};

export type ModifyChapterBody = {
    title: string;
    text: string;
    summary: string;
    allChoices: string[];
    description: string;
    image?: string;
};
