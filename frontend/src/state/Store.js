import { configureStore } from "@reduxjs/toolkit";

import CartReducer from "./CartSlice"
import UserReducer from "./UserSlice";


export default configureStore({
    reducer: {
        cart: CartReducer,
        user: UserReducer
    },
})