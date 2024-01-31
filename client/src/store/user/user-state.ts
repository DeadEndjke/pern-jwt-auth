import {IUser} from "../../model/IUser";

export interface UserState{
    user: IUser ,
    isAuth: boolean,
    isLoading: boolean
}