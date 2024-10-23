import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], totalValue: 0 };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add a product to the cart
        addToCart: (state, action) => {
            const product = action.payload; // Get the product from the action payload

            // Check if the product is already in the cart
            const productInCart = state.products.find(p => p.id === product.id);
            if (!productInCart) {
                state.products.push(product);
                state.totalValue += product.price; // Update the total value
            }
        },

        // Remove a product from the cart
        removeFromCart: (state, action) => {
            const productId = action.payload.id; // Get the product ID from the action payload
            const productIndex = state.products.findIndex(p => p.id === productId);

            if (productIndex !== -1) {
                // Subtract the product price from the total value
                state.totalValue -= state.products[productIndex].price;

                // Remove the product from the cart
                state.products.splice(productIndex, 1);
            }
        },
    },
});

// Export the reducer
export const cartReducer = cartSlice.reducer;

// Export actions to use them in components
export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartSelector = (state) => state.cart;
