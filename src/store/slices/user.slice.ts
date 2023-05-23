import { SignInReq, SignUpReq } from "@/package/types/request.types";
import { api } from "@/services";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { SignInResponse, signIn } from "next-auth/react";

type UserState = {
    isLoading: boolean;
    isChecked: boolean;
    isAuth: boolean;
    userId: string | null
    error: string | null;
};

const initialState: UserState = {
    isLoading: false,
    isChecked: false,
    isAuth: false,
    userId: null,
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthIsChecked(state) {
            state.isChecked = true;
            state.error = null;
        },
        setUserIsAuth(state, action: PayloadAction<string>) {
            state.isChecked = true;
            state.userId = action.payload;
            state.isAuth = true;

            state.error = null;
        },
    },
    extraReducers: (builder) => {
        /**
        * Sign up
        */
        builder.addCase(signUp.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || action.error.message || null;
        });
    }
});

export const signUp = createAsyncThunk<void, SignUpReq, { rejectValue: string }>(
    'auth/signUp',
    async (body, { rejectWithValue }) => {
        try {
            await api.signUp(body);
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);
   

export const signInWithCredendtials = createAsyncThunk<void, SignInReq, { rejectValue: string }>(
    'auth/signIn',
    async (credentials, { rejectWithValue }) => {
        try {
            const res: SignInResponse | undefined = await signIn('credentials', { ...credentials, redirect: false });
            if (!res) {
                throw new Error('Failled to login');
            }
            if (res.error) {
                return rejectWithValue(res.error);
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                return rejectWithValue(err.response?.data.message);
            }
            throw err;
        }
    }
);

export const {setAuthIsChecked, setUserIsAuth } = userSlice.actions;
export const userReducer = userSlice.reducer;
