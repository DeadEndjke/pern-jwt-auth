import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store";
import {loginUser, registerUser} from "../../store/user/user-actions";

interface User{
    email: string,
    password: string
}

const LoginRegisterForm = () => {
    const [user, setUser] = useState<User>({email: '', password: ''})
    const dispatch = useDispatch<AppDispatch>()

    //мне впадлу было валидировать поля
    const isEmailAndPasswordNotEmpty = () => {
        return user.email !== '' && user.password !== ''
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = () => {
        if(isEmailAndPasswordNotEmpty()){
            dispatch(loginUser(user))
        }
    }
    const handleRegister = () => {
        if(isEmailAndPasswordNotEmpty()) {
            dispatch(registerUser(user))
        }
    }

    return (
        <div>
            <input
                placeholder='email'
                name = 'email'
                value = {user.email}
                onChange={handleChange}
            />
            <input
                placeholder='password'
                name = 'password'
                value = {user.password}
                onChange={handleChange}
            />
            <button onClick={handleLogin}>login</button>
            <button onClick={handleRegister}>registration</button>

        </div>
    );
};

export default LoginRegisterForm;