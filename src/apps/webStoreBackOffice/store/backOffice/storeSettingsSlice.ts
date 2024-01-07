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
}

export const productsSlice = createSlice({
    name: 'storeSettings',
    initialState: initialState,
    reducers: {

    }
});


// Action creators are generated for each case reducer function
export const {
    setProducts,
    setProduct,
    updateProduct,
    deleteProduct
} = productsSlice.actions;

export const selectProduct = (state: RootState) => state.StoreSettings;