import { ChapterData, NextChapter, PreviousChapter, SetNewChapterDataIsValid } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/services';
import { AxiosError } from 'axios';

type ChapterGeneratorState = {
    previousChapter: PreviousChapter;
    nextChapter: NextChapter;
    isLoading: boolean;
    error: null | string;
};

const initialState: ChapterGeneratorState = {
    previousChapter: {
        title: '',
        text: '',
        summary: '',
        allChoices: [],
    },
    nextChapter: {
        themeIsEnabled: false,
        theme: '',
        allRequiredWords: [],
    },
    isLoading: false,
    error: null,
};

export const chapterGeneratorSlice = createSlice({
    name: 'chapterGenerator',
    initialState,
    reducers: {
        resetChapterGeneratorState: (state) => {
            state.previousChapter = initialState.previousChapter;
            state.nextChapter = initialState.nextChapter;
            state.isLoading = false;
            state.error = null;
        },

        /*
        / Set previous chapter data
        */
        setFirstChapterData: (state, action: PayloadAction<{ text: string; title: string }>) => {
            const { text, title } = action.payload;
            state.previousChapter.text = text;
            state.previousChapter.title = title;
        },
        /*
        / Set next chapter settings
        */
        setNextChapterTheme: (state, action: PayloadAction<string>) => {
            state.nextChapter.theme = action.payload;
        },
        toggleNextChapterThemeIsEnable: (state) => {
            state.nextChapter.themeIsEnabled = !state.nextChapter.themeIsEnabled;
        },
        setNextChapterAllRequiredWords: (state, action: PayloadAction<string[]>) => {
            state.nextChapter.allRequiredWords = action.payload;
        },
        /*
        / Loading
        */
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
    },

    extraReducers: (builder) => {
        /**
         * Fetch chapter data
         */
        builder.addCase(fetchChapterDataForGeneration.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchChapterDataForGeneration.fulfilled, (state, action) => {
            const { text, title, allChoices } = action.payload;
            state.previousChapter.text = text;
            state.previousChapter.title = title;
            state.previousChapter.allChoices = allChoices || [];
            state.previousChapter.summary = action.payload.summary || '';
            state.isLoading = false;
            state.error = null;
        });
        builder.addCase(fetchChapterDataForGeneration.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    },
});

export const fetchChapterDataForGeneration = createAsyncThunk<ChapterData, string>(
    'chapterGenerator/fetchChapterDataForGeneration',
    async (chapterId, { rejectWithValue }) => {
        try {
            const { data } = await api.getOneChapter(chapterId);
            return data.chapter;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const {
    resetChapterGeneratorState,
    setIsLoading,
    setNextChapterTheme,
    toggleNextChapterThemeIsEnable,
    setFirstChapterData,
    setNextChapterAllRequiredWords,
} = chapterGeneratorSlice.actions;
export const chapterGeneratorReducer = chapterGeneratorSlice.reducer;
