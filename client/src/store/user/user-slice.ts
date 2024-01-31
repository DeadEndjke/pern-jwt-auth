import {createSlice} from "@reduxjs/toolkit";
import {loginUser, logoutUser, registerUser, checkAuth} from "./user-actions";
import {UserState} from "./user-state";
import {IUser} from "../../model/IUser";

const initialState = {
    user: {
        email: '',
        id: ''
    } as IUser,
    isAuth: false,
    isLoading: false
} as UserState

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuth = true
                state.user.email = action.payload?.email
                state.user.id = action.payload?.id
                state.isLoading = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuth = true
                state.user.email = action.payload?.email
                state.user.id = action.payload?.id
                state.isLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isAuth = false
                state.user.email = undefined
                state.user.id = undefined
                state.isLoading = false;

            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuth = true
                state.user.email = action.payload?.email
                state.user.id = action.payload?.id
                state.isLoading = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
    }
})

export default userSlice.reducer