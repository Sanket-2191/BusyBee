import { configureStore } from "@reduxjs/toolkit";
import { storeReducer } from "./reducers/storeReducer";
import { cartReducer } from "./reducers/cartReducer";


export const store = configureStore({
    reducer: {
        store: storeReducer,
        cart: cartReducer
    }
})