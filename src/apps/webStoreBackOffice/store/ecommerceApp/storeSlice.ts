import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {Category, Product, StoreSettings} from "../../types";

interface initialState {
    storeProducts: Product[];
    storeCategories: Category[];
    storeConfiguration: StoreSettings;
}

const initialState: initialState = {
    storeProducts: [],
    storeCategories: [],
    storeConfiguration: {
        id: '',
        title: '',
        description: '',
        bannerURL: '',
        bannerName: '',
        logoURL: '',
        logoName: '',
        phoneNumber: ''
    }
}

export const storeSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setStoreProducts: (state, action: PayloadAction<Product[]>) => {
            state.storeProducts = action.payload;
        },
        setStoreCategories: (state, action: PayloadAction<Category[]>) => {
            state.storeCategories = action.payload;
        },
        setStoreConfiguration: (state, action: PayloadAction<StoreSettings>) => {
            state.storeConfiguration = action.payload;
        }
    }
});


// Action creators are generated for each case reducer function

export const {
    setStoreProducts,
    setStoreCategories,
    setStoreConfiguration
} = storeSlice.actions;

export const selectStore = (state: RootState) => state.store;