import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {Category} from "../../backoffice";

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
        setProducts: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setProduct: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload)
        },
        updateProduct: (state, action: PayloadAction<Partial<Category>>) => {
            const index = state.categories.findIndex(product => product.id === action.payload.id);

            state.categories[index] = {
                ...state.categories[index],
                ...action.payload
            };
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.categories = state.categories.filter(category => category.id !== action.payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    setProducts,
    setProduct,
    updateProduct,
    deleteProduct
} = categorySlice.actions;

export const selectProduct = (state: RootState) => state.product;
