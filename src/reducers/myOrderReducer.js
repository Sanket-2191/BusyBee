import { createSlice } from "@reduxjs/toolkit";


const initialState = { orders: [] };

const myOrdersSlice = createSlice({
    name: 'myOrders',
    initialState,
    reducers: {
        placeOrder: (state, action) => {
            const { products, totalValue } = action.payload;
            const order = {
                date: new Date().toLocaleString(),
                products,
                totalValue
            }

            state.orders.push(order);
        }

    }
})


export const myOrdersReducer = myOrdersSlice.reducer;
export const myOrdersSelector = (state) => state.myOrders;

export const { placeOrder } = myOrdersSlice.actions;