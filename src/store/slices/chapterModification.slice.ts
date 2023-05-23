import { api } from '@/services';
import { ChapterData, ChapterType } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

type ChapterModification = {
    modifiedData: {
        title: string;
        text: string;
        summary: string;
        allChoices: string[];
        description: string;
        image?: {
            url: string | null;
            public_id: string | null;
        }
    };
    isLoading: boolean;
    error: null | string;
};

const initialState: ChapterModification = {
    modifiedData: {
        title: '',
        text: '',
        summary: '',
        allChoices: [],
        description: '',
        image: {
            url: null,
            public_id: null,
        },
    },
    isLoading: false,
    error: null,
};

export const chapterModificationSlice = createSlice({
    name: 'chapterModification',
    initialState,
    reducers: {
        /*
        /   Set Data
        */
        setModifiedChapterText: (state, action: PayloadAction<string>) => {
            state.modifiedData.text = action.payload;
        },
        setModifiedChapterTitle: (state, action: PayloadAction<string>) => {
            state.modifiedData.title = action.payload;
        },
        setModifiedChapterDescriprion: (state, action: PayloadAction<string>) => {
            state.modifiedData.description = action.payload;
        },
        setModifiedChapterSummary: (state, action: PayloadAction<string>) => {
            state.modifiedData.summary = action.payload;
        },
        setModifiedChapterChoices: (state, action: PayloadAction<{ choice: string; index: number }>) => {
            const { choice, index } = action.payload;
            state.modifiedData.allChoices[index] = choice;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchChapterDataForModification.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchChapterDataForModification.fulfilled, (state, action) => {
            const { title, text, summary, allChoices, description, image } = action.payload;
            state.modifiedData.title = title;
            state.modifiedData.text = text;
            state.modifiedData.summary = summary || '';
            state.modifiedData.allChoices = allChoices || [];
            state.modifiedData.description = description;
            state.modifiedData.image = image 
            state.isLoading = false;
        });
        builder.addCase(fetchChapterDataForModification.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    },
});

export const fetchChapterDataForModification = createAsyncThunk<ChapterData, string>(
    'chapterGenerator/fetchChapterDataForValidation',
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
    setModifiedChapterTitle,
    setModifiedChapterText,
    setModifiedChapterChoices,
    setModifiedChapterDescriprion,
    setModifiedChapterSummary,
} = chapterModificationSlice.actions;
export const chapterModificationReducer = chapterModificationSlice.reducer;
