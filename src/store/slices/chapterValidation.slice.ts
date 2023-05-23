import { api } from '@/services';
import { ChapterData, ChapterType } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

type ChapterValidationState = {
    generatedData: {
        title: string;
        text: string;
        summary?: string;
        allChoices: string[];
        selectedChoice: number;
        description: string;
    };
};

const initialState: ChapterValidationState = {
    generatedData: {
        title: '',
        text: '',
        summary: '',
        allChoices: [],
        selectedChoice: -1,
        description: '',
    },
};

export const chapterValidationSlice = createSlice({
    name: 'chapterValidation',
    initialState,
    reducers: {
        resetChapterValidationState: (state) => {
            state.generatedData = initialState.generatedData;
        },
        /*
        /   Set Data
        */
        setGeneratedData: (state, action: PayloadAction<ChapterType>) => {
            const { title, text, summary, allChoices, description } = action.payload;
            state.generatedData.title = title;
            state.generatedData.text = text;
            state.generatedData.summary = summary;
            state.generatedData.allChoices = allChoices || [];
            state.generatedData.description = description
        },
        setGeneratedChapterText: (state, action: PayloadAction<string>) => {
            state.generatedData.text = action.payload;
        },
        setGeneratedChapterTitle: (state, action: PayloadAction<string>) => {
            state.generatedData.title = action.payload;
        },
        setGeneratedChapterDescriprion: (state, action: PayloadAction<string>) => {
            state.generatedData.description = action.payload;
        },
        setGeneratedChapterSummary: (state, action: PayloadAction<string>) => {
            state.generatedData.summary = action.payload;
        },
        setGeneratedChapterChoices: (state, action: PayloadAction<{choice: string, index: number}>) => {
            const { choice, index } = action.payload;
            state.generatedData.allChoices[index] = choice 
        },

    },

    extraReducers: (builder) => {},
});

export const { resetChapterValidationState, setGeneratedData, setGeneratedChapterTitle, setGeneratedChapterText, setGeneratedChapterChoices, setGeneratedChapterDescriprion, setGeneratedChapterSummary } = chapterValidationSlice.actions;
export const chapterValidationReducer = chapterValidationSlice.reducer;
