import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: ''
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveEmail: (state, action) =>{
      state.email = action.payload;
    }
  }
});

export const {saveEmail} = auth.actions;
export default auth.reducer;