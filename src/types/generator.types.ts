export type PromptParams = {
    isEnd: boolean;
    protagonist: string;
    previousChapterText: string;
    allChoices?: string[],
    selectedChoice?: number,
    summary?: string;
    chapterTheme?: string;
    numbOfChoice: number;
    allRequiredWords: string[];
};

export type CurrentChapter = {
    rowIndex : number
    chapterIndex: number
}

export type CompletedChapter = {
    id: string
    rowIndex : number
    chapterIndex: number
}