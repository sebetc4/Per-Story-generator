import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AppState = {
    layout: {
        headerHeight: number;
        footerHeight: number;
    };
};

const initialState: AppState = {
    layout: {
        headerHeight: 0,
        footerHeight: 0,
    },
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHeaderHeight: (state, action: PayloadAction<number>) => {
            state.layout.headerHeight = action.payload;
        },
        setFooterHeight: (state, action: PayloadAction<number>) => {
            state.layout.footerHeight = action.payload;
        },
    },
});

export const { setHeaderHeight, setFooterHeight } = appSlice.actions;
export const appReducer = appSlice.reducer;
