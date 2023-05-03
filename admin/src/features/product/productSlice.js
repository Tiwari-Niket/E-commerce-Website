import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

export const getProducts = createAsyncThunk("product/get-products", async (thunkAPI) => {
    try {
        return await productService.getProducts();
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const getAProduct = createAsyncThunk("product/get-product", async (id, thunkAPI) => {
    try {
        return await productService.getProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const createProducts = createAsyncThunk("product/create-products", async (productData, thunkAPI) => {
    try {
        return await productService.createProducts(productData);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const updateAProduct = createAsyncThunk("product/update-product", async (product, thunkAPI) => {
    try {
        return await productService.updateProduct(product);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const deleteAProduct = createAsyncThunk("product/delete-product", async (id, thunkAPI) => {
    try {
        return await productService.deleteProduct(id);
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
});

export const resetState = createAction("Reset_all");

const initialState = {
    products: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(createProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.createdProduct = action.payload;
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(deleteAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.deletedProduct = action.payload;
            })
            .addCase(deleteAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(getAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.prodName = action.payload.title;
                state.prodDesc = action.payload.description;
                state.prodCategory = action.payload.category;
                state.prodColor = action.payload.color;
                state.prodImages = action.payload.images;
                state.prodBrand = action.payload.brand;
                state.prodTags = action.payload.tags;
                state.prodPrice = action.payload.price;
                state.prodQuantity = action.payload.quantity;
            })
            .addCase(getAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(updateAProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.updatedProduct = action.payload;
            })
            .addCase(updateAProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
            .addCase(resetState, ()=> initialState)
    },
});

export default productSlice.reducer;
