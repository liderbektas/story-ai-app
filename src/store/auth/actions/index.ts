import { store } from "../../store";
import { _setLogin, _setLogout } from "../slice";

interface User {
    id: string;
    username: string;
    full_name: string;
}

export const setLogin = (data: { token: string; user: User }) => store.dispatch(_setLogin(data));
export const setLogout = () => store.dispatch(_setLogout())