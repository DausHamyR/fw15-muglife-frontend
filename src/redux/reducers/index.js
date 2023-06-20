import { combineReducers } from "@reduxjs/toolkit";

import auth from "./auth";
import profile from "./profile";
import editProduct from "./editProduct";

const reducer = combineReducers({
    auth,
    profile,
    editProduct
});

export default reducer;