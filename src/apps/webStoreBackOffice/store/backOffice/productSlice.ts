import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store.ts";
import {Product} from "../../backoffice";

interface initialState {
    products: Product[];
    activeProduct: Product | null;
}

const initialState: initialState = {
    products: [],
    activeProduct: null
}

export const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },
        setProduct: (state, action: PayloadAction<Product>) => {
            state.products.push(action.payload)
        },
        onSetActiveProduct: (state, action: PayloadAction<Product | null>) => {
            state.activeProduct = action.payload;
        },
        updateProduct: (state, action: PayloadAction<Partial<Product>>) => {
            const index = state.products.findIndex(product => product.id === action.payload.id);

            state.products[index] = {
                ...state.products[index],
                ...action.payload
            };
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(product => product.id !== action.payload);
        }
    }
});


// Action creators are generated for each case reducer function
export const {
    setProducts,
    setProduct,
    onSetActiveProduct,
    updateProduct,
    deleteProduct
} = productsSlice.actions;

export const selectProduct = (state: RootState) => state.product;