import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
    },
    reducers: {
        setCurrent: (state, action) => {
            state.current = { ...action.payload }
            // payload : dữ liệu gửi vào

        },




    },


})
export const { setCurrent } = userSlice.actions;
export default userSlice.reducer