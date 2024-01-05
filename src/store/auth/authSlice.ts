import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import {authStatusTypes} from "../../auth/types";

// Define a type for the slice state
export interface AuthState {
    branchId?: string | null;
    status?: string;
    uid: string | null;
    email: string | null;
    displayName: string | null;
    errorMessage?: string | null;
    role?: string | null;
    userType?: string | null;
}

const initialState: AuthState = {
    branchId: null,
    status: authStatusTypes.checking,
    uid: null,
    email: null,
    displayName: null,
    errorMessage: null,
    role: null,
    userType: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }: PayloadAction<AuthState>) => {
            state.branchId = payload.branchId;
            state.status = authStatusTypes.authenticated;
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.role = payload.role;
            state.userType = payload.userType;
            state.errorMessage = null;
        },
        logout: (state, { payload }: PayloadAction<string | null>) => {
            state.status = authStatusTypes.notAuthenticated;
            state.uid = null;
            state.email = null;
            state.displayName = null;
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
