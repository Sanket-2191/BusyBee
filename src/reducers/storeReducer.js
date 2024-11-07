import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Initial_State = { products: [], filteredProducts: null, isLoading: false, error: null };

// Correctly handle the async logic in the thunk
export const getProducts = createAsyncThunk('store/getProducts', async (_, thunkAPI) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        // console.log("received data from API: ", data);

        // Add `addedToCart` to each product initially set to false
        return data.map(product => ({ ...product, addedToCart: false }));
        // return data; // Return the fetched products as the resolved value
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message); // Use rejectWithValue to pass errors
    }
});

const storeSlice = createSlice({
    name: 'store',
    initialState: Initial_State,
    reducers: {
        addProduct: (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.products = [...state.products, { ...action.payload, id: state.products.length }];
        },
        removeProduct: (state, action) => {
            state.products = state.products.filter((_, index) => index !== action.payload);
        },
        setIsLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        filterProducts: (state, action) => {

            if (action.payload.toLowerCase().trim()) {
                state.filteredProducts = state.products.filter(p =>
                    p.title.toLowerCase().includes(action.payload.toLowerCase())
                );
            } else {
                // console.log("filteredProducts set to null");

                state.filteredProducts = null

            }

            // console.log("in storeReducer Search field : ", action.payload.toLowerCase());
            // console.log("in storeReducer filteredProducts: ", state.filteredProducts);

        },
    },
    extraReducers: (builder) => {
        // Handle the async thunk action states (pending, fulfilled, rejected)
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload; // Populate the products with fetched data
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload; // Show the error if the request fails
            })
            .addCase('cart/addToCart', (state, action) => {
                // Find product by ID and set `addedToCart` to true
                const product = state.products.find(p => p.id === action.payload.id);
                if (product) {
                    product.addedToCart = true;
                    // console.log({ addedTOcart: product.addedToCart });

                }
            })
            .addCase('cart/removeFromCart', (state, action) => {
                const product = state.products.find(p => p.id === action.payload.productId);
                if (product) {
                    product.addedToCart = false;
                }

            })
            .addCase('cart/emptyCart', (state, action) => {
                state.products.map(product => (product.addedToCart = false));
            })
    },
});

export const storeReducer = storeSlice.reducer;

export const { removeProduct, addProduct, setIsLoading, filterProducts } = storeSlice.actions;

export const storeSelector = (state) => state.store;
