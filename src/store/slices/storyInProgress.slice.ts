import { api } from '@/services';
import {
    CompletedChapter,
    CreateStoryBody,
    CreateStoryRes,
    CurrentChapter,
    StoryData,
} from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

type StoryInProgressState = {
    storyData: {
        id: string;
        title: string;
        protagonist: string;
        story: [string[], string[], string[], string[], string[]];
        currentChapter: [number, number];
    };
    isLoading: boolean;
    error: null | string;
};
const firstChapter = new Array(1).fill('');
const secondChapter = new Array(3).fill('');
const thirdChapter = new Array(6).fill('');
const fourthChapter = new Array(12).fill('');
const fifthChapter = new Array(24).fill('');

const initialState: StoryInProgressState = {
    storyData: {
        id: '',
        title: '',
        protagonist: '',
        story: [firstChapter, secondChapter, thirdChapter, fourthChapter, fifthChapter],
        currentChapter: [0, 0],
    },
    isLoading: false,
    error: null,
};

export const storyInProgressSlice = createSlice({
    name: 'storyInProgress',
    initialState,
    reducers: {
        resetStoryInProgressState: (state) => {
            state.storyData = initialState.storyData;
            state.isLoading = false;
            state.error = null;
        },
        setProtagonist: (state, action: PayloadAction<string>) => {
            state.storyData.protagonist = action.payload;
            state.storyData.currentChapter = [1, 0];
        },
        setCurrentChapter: (state, action: PayloadAction<CurrentChapter>) => {
            const { rowIndex, chapterIndex } = action.payload;
            state.storyData.currentChapter = [rowIndex, chapterIndex];
        },
        setChapterIsCompleted: (state, action: PayloadAction<CompletedChapter>) => {
            const { id, rowIndex, chapterIndex } = action.payload;
            state.storyData.story[rowIndex][chapterIndex] = id;
        },
    },
    extraReducers: (builder) => {
        /**
         * Create Story
         */
        builder.addCase(createStory.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createStory.fulfilled, (state, action) => {
            const { storyId, chapterId, storyTitle, protagonist } = action.payload;
            state.storyData.id = storyId;
            state.storyData.title = storyTitle;
            state.storyData.story[0][0] = chapterId;
            state.storyData.protagonist= protagonist
            state.storyData.currentChapter = [1, 0];
            state.isLoading = false;
        });
        builder.addCase(createStory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
        /**
         * Selected story
         */
        builder.addCase(fetchSelectedStory.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSelectedStory.fulfilled, (state, action) => {
            const { title, _id, story, protagonist} = action.payload;
            state.storyData.id = _id;
            state.storyData.title = title;
            state.storyData.story = story; 
            state.storyData.protagonist = protagonist;
            state.isLoading = false;
            
        });
        builder.addCase(fetchSelectedStory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null;
        });
    },
});

export const createStory = createAsyncThunk<CreateStoryRes, CreateStoryBody>(
    'storyInProgress/createStory',
    async (body, { rejectWithValue }) => {
        try {
            const { data } = await api.createStory(body);
            return data;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const fetchSelectedStory = createAsyncThunk<StoryData, string>(
    'storyInProgress/fetchSelectedStory',
    async (storyId, { rejectWithValue }) => {
        try {
            const { data } = await api.getOneStory(storyId);
            return data.story;
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const { resetStoryInProgressState, setCurrentChapter, setProtagonist, setChapterIsCompleted } =
    storyInProgressSlice.actions;
export const storyInProgressReducer = storyInProgressSlice.reducer;
