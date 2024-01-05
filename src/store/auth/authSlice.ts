import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import {authStatusTypes} from "../../auth/types";

// Define a type for the slice state
export interface AuthState {
    status?: string;
    uid: string | undefined;
    email: string | null | undefined;
    displayName: string | undefined | null;
    errorMessage?: string | null;
}

const initialState: AuthState = {
    status: authStatusTypes.checking,
    uid: undefined,
    email: null,
    displayName: undefined,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }: PayloadAction<AuthState>) => {
            state.status = authStatusTypes.authenticated;
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.errorMessage = undefined;
        },
        logout: (state, { payload }: PayloadAction<string | null>) => {
            state.status = authStatusTypes.notAuthenticated;
            state.uid = undefined;
            state.email = null;
            state.displayName = undefined;
            state.errorMessage = payload;
        },
        checkingCredentials: (state) => {
            state.status = authStatusTypes.checking;
        }
    }
});

// Action creators are generated for each case reducer function
export const {login, logout, checkingCredentials} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
