import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface User {
    id: string;
    username: string;
    full_name: string;
    age_group: string,
    email: string,
    language: string
}

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        _setLogin: (state, action: PayloadAction<{ token: string; user: User }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        _setLogout: (state) => {
            state.token = null;
            state.user = null;
        },
        _setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        _setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

export const {_setLogin, _setLogout, _setToken, _setUser} = authSlice.actions;
export default authSlice.reducer;
