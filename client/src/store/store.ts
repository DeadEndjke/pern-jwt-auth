import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user-slice'
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer:{
        user: userReducer
    },
})
store.subscribe(() => {
    console.log(store.getState())
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;