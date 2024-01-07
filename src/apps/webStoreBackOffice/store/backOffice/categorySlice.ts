import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {Category} from "../../types";

interface initialState {
    categories: Category[];
}

const initialState: initialState = {
    categories: [],
}

export const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setCategory: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload)
        },
        updateCategory: (state, action: PayloadAction<Partial<Category>>) => {
            const index = state.categories.findIndex(product => product.id === action.payload.id);

            state.categories[index] = {
                ...state.categories[index],
                ...action.payload
            };
        },
        deleteCategory: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    setCategories,
    setCategory,
    updateCategory,
    deleteCategory
} = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category;
