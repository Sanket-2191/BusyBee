import { createSlice } from "@reduxjs/toolkit";

const initialState = { products: [], totalValue: 0 };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add a product to the cart
        addToCart: (state, action) => {
            const product = action.payload; // Get the product from the action payload
            console.log("tring to add to cart....");

            // Check if the product is already in the cart
            const productInCart = state.products.find(p => p.id === product.id) || null;
            // console.log("Product received to add or increase quantity", product);

            if (!productInCart) {
                state.products.push({ ...product, quantity: 1 });
                state.totalValue += product.price; // Update the total value
            } else {
                productInCart.quantity += 1;
                state.totalValue += productInCart.price;
            }
            // const cartProd = state.products.map(p => p)
            console.log("cart State after adding product : ", JSON.parse(JSON.stringify(state.products)));

            // return product;
        },

        // Remove a product from the cart
        removeFromCart: (state, action) => {
            const { productId, remove } = action.payload; // Get the product ID from the action payload
            const productIndex = state.products.findIndex(p => p.id === productId);

            // console.log("tring to decrease quamtity of productid:", productId, " from cart....");
            if (productIndex !== -1) {
                // Subtract the product price from the total value
                if (remove || state.products[productIndex].quantity <= 1) {
                    state.totalValue -= state.products[productIndex].price * state.products[productIndex].quantity;
                    // Remove the product from the cart
                    state.products.splice(productIndex, 1);
                } else {
                    state.totalValue -= state.products[productIndex].price;

                    // decrease quntity of the product from the cart
                    state.products[productIndex].quantity -= 1;
                }

            }

            // return productId;
        },
        emptyCart: (state) => {
            state.products = [];
            state.totalValue = 0;
        }



    },

    extraReducers: (builder) => {
        builder.
            addCase('cart/emptyCart', (state, action) => {

            })
    }
});

// Export the reducer
export const cartReducer = cartSlice.reducer;

// Export actions to use them in components
export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;

export const cartSelector = (state) => state.cart;
