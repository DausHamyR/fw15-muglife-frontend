import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: ""
};

const product = createSlice({
    name: "product",
    initialState,
    reducers: {
        setproduct: (state, action) =>{
            state.data = action.payload;
        }
    }
});

export const {setproduct} = product.actions;
export default product.reducer;