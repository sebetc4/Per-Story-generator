import { AlertColor } from '@mui/material';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AlertState = {
    open: boolean;
    message: string;
    type: AlertColor | null;
};

const initialState: AlertState = {
    open: false,
    message: '',
    type: null,
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<Omit<AlertState, 'open'>>) => {
            state.open = true;
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        closeAlert: (state) => {
            state.open = false;
        },
        removeAlert: (state) => {
            state.message = initialState.message;
            state.type = initialState.type;
        },
    },
});

export const { setAlert, removeAlert, closeAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
