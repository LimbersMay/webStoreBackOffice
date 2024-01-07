import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {Category, Product} from "../../types";

interface initialState {
    storeProducts: Product[];
    storeCategories: Category[]
}

const initialState: initialState = {
    storeProducts: [],
    storeCategories: []
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
        }
    }
});


// Action creators are generated for each case reducer function

export const { setStoreProducts, setStoreCategories } = storeSlice.actions;

export const selectStore = (state: RootState) => state.store;