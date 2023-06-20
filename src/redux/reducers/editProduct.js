import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: ""
};

const editProduct = createSlice({
    name: "editProduct",
    initialState,
    reducers: {
        setEditProduct: (state, action) =>{
            state.data = action.payload;
        }
    }
});

export const {setEditProduct} = editProduct.actions;
export default editProduct.reducer;