import { configureStore } from "@reduxjs/toolkit";


import { storeReducer } from "./reducers/storeReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer } from "./reducers/myOrderReducer";
import { signinReducer } from "./reducers/loginReducer";


export const store = configureStore({
    reducer: {
        store: storeReducer,
        cart: cartReducer,
        myOrders: myOrdersReducer,
        signin: signinReducer
    }
})