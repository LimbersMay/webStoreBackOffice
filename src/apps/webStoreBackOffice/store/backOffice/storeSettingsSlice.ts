import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {StoreSettings} from "../../types";

interface initialState extends StoreSettings {
}

const initialState: initialState = {
    id: '',
    title: 'Default',
    description: 'Default description',
    bannerURL: 'https://s3.amazonaws.com/thumbnails.venngage.com/template/19fb13e4-a435-4bae-9bbf-ff1ed161cb31.png',
    logoURL: 'https://icon-library.com/images/products-icon/products-icon-25.jpg',
    phoneNumber: '9991112223',
    bannerName: '',
    logoName: '',
}

export const storeSettingsSlice = createSlice({
    name: 'storeSettings',
    initialState: initialState,
    reducers: {
        setStoreSettings: (state, payload: PayloadAction<StoreSettings>) => {
            state.id = payload.payload.id;
            state.title = payload.payload.title;
            state.description = payload.payload.description;
            state.bannerURL = payload.payload.bannerURL;
            state.logoURL = payload.payload.logoURL;
            state.phoneNumber = payload.payload.phoneNumber;
            state.bannerName = payload.payload.bannerName;
            state.logoName = payload.payload.logoName;
        },
        updateStoreSettings: (state, payload: PayloadAction<Partial<StoreSettings>>) => {
            const updatedStoreSettings = {
                ...state,
                ...payload.payload
            };

            state.id = updatedStoreSettings.id;
            state.title = updatedStoreSettings.title;
            state.description = updatedStoreSettings.description;
            state.bannerURL = updatedStoreSettings.bannerURL;
            state.logoURL = updatedStoreSettings.logoURL;
            state.phoneNumber = updatedStoreSettings.phoneNumber;
            state.bannerName = updatedStoreSettings.bannerName;
            state.logoName = updatedStoreSettings.logoName;
        },
    }
});


// Action creators are generated for each case reducer function
export const {
    setStoreSettings,
    updateStoreSettings
} = storeSettingsSlice.actions;

export const selectStoreSettings = (state: RootState) => state.storeSettings;