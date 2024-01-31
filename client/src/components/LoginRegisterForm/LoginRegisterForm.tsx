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

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = () => {
        dispatch(loginUser(user))
    }
    const handleRegister = () => {
        dispatch(registerUser(user))
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