import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const Initial_State = { products: [], isLoading: false, error: null };

// Correctly handle the async logic in the thunk
export const getProducts = createAsyncThunk('store/getProducts', async (_, thunkAPI) => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data; // Return the fetched products as the resolved value
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
            });
    },
});

export const storeReducer = storeSlice.reducer;

export const { removeProduct, addProduct, setIsLoading } = storeSlice.actions;

export const storeSelector = (state) => state.store;
