import './App.css';
import LoginRegisterForm from "./components/LoginRegisterForm/LoginRegisterForm";
import {useEffect} from "react";
import {checkAuth, logoutUser} from "./store/user/user-actions";
import {useAppDispatch, useAppSelector} from "./hooks/hook";



function App() {
    const isAuth = useAppSelector(state => state.user).isAuth
    const email = useAppSelector(state => state.user).user.email
    const isLoading = useAppSelector(state => state.user).isLoading
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        if (localStorage.getItem('token')){
            dispatch(checkAuth())
        }
    }, [])

    if(isLoading){
        return <>Loading...</>
    }

    if(!isAuth){
        return (
            <>
                <h1>{isAuth ? `user authorized ${email}` : 'authorize plz'}</h1>
                <LoginRegisterForm />
            </>

        )
    }

    return (
      <>
          <h1>{isAuth ? `user authorized ${email}` : 'authorize plz'}</h1>
          <button onClick={handleLogout}>logout</button>
      </>
  );
}

export default App;
