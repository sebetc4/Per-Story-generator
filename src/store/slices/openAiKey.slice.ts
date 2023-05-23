import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OpenAiKeyState = {
    openAiKey: string;
    openAiKeyIsSaved: boolean;
};

const initialState: OpenAiKeyState = {
    openAiKey: '',
    openAiKeyIsSaved: false,
};

export const openAiKeySlice = createSlice({
    name: 'openAiKey',
    initialState,
    reducers: {
        setOpenAiKey: (state, action: PayloadAction<string>) => {
            state.openAiKey = action.payload;
        },
        setOpenAiKeyIsSaved: (state, action: PayloadAction<boolean>) => {
            state.openAiKeyIsSaved = action.payload;
        },
    },
    extraReducers: (builder) => {},
});

export const {
    setOpenAiKey,
    setOpenAiKeyIsSaved,
} = openAiKeySlice.actions;
export const openAiKeyReducer = openAiKeySlice.reducer;
