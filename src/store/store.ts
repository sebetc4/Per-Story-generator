import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import * as reducers from './slices';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { isDevEnv } from '@/package/constants';

const combinedReducer = combineReducers(reducers);


const reducer: typeof combinedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

export const makeStore = () => configureStore({ reducer, devTools: isDevEnv });

type Store = ReturnType<typeof makeStore>;
export type AppDispatch = Store['dispatch'];
export type AppState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;

export const wrapper = createWrapper(makeStore, { debug: false });
