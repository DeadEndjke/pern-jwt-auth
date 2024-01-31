import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../service/auth-service";
import axios from "axios";
import {API_URL} from "../../http";
import {AuthResponse} from "../../model/response/auth-response";

interface User{
    email: string,
    password: string
}

export const loginUser = createAsyncThunk('user/loginUser',
    async (user:User) => {
        try{
            const response = await AuthService.login(user.email, user.password)
            localStorage.setItem('token', response.data.accessToken)
            return response.data.user
        }catch (err){
            console.log(err)
        }

    },
)

export const registerUser = createAsyncThunk('user/registerUser',
    async (user:User) => {
        try{
            const response = await AuthService.registration(user.email, user.password)
            localStorage.setItem('token', response.data.accessToken)
            return response.data.user
        }catch (err){
            console.log(err)
        }

    },
)

export const logoutUser = createAsyncThunk('user/logoutUser',
    async () => {
        try{
            const response = await AuthService.logout()
            localStorage.removeItem('token')
        }catch (err){
            console.log(err)
        }

    },
)

export const checkAuth = createAsyncThunk('user/checkAuth',
    async () => {

        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return response.data.user
        }catch (err){
            console.log(err)
        }
    },
)