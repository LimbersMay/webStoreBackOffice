import {configureStore} from "@reduxjs/toolkit";
import {authSlice, categorySlice, productsSlice, storeSettingsSlice} from "./";
import {storeSlice} from "./ecommerceApp";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        product: productsSlice.reducer,
        category: categorySlice.reducer,
        store: storeSlice.reducer,
        storeSettings: storeSettingsSlice.reducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
