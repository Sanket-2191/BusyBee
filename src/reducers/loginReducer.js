import { createSlice } from "@reduxjs/toolkit";
import { toast, ToastContainer } from "react-toastify";

const initialState = { loggedIn: false, users: [{ name: "sanket", email: "acb@123.com", userName: "sanky", password: "123456" }], currentUser: null }

const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        signin: (state, action) => {
            const date_Time = new Date().toLocaleDateString();
            const date = date_Time.split(',')[0];
            const time = date_Time.split(',').slice(1).join(',');

            const user = {
                name: action.payload.name,
                email: action.payload.email,
                userName: action.payload.userName,
                password: action.payload.password,
                date,
                time
            }
            console.log("new user:", user);


            state.users.push(user);
        },
        login: (state, action) => {
            // console.log("payload in login from loginreducer :", action.payload);
            // console.log("users in loginreducer :", state.users);
            const pUserName = action.payload.userName;
            const pPassword = action.payload.password;

            const user = state.users.find(u => (u.userName === pUserName || u.email === pUserName) && u.password === pPassword)


            if (user) {
                state.currentUser = { ...user };
                state.loggedIn = true;

                // console.log("loggedIn");
                // ToastContainer("")
            }
        },
        logout: (state) => {
            state.currentUser = null;
            state.loggedIn = false;

            // console.log("LoggedOut");
            toast.success("LoggedOut ", {
                autoClose: 2000, // Automatically closes after 2 seconds
            });
        }
    },

    extraReducers: (builder) => {
        builder.addCase('signin/signin', (state, action) => {

        })
    }
})

export const signinReducer = signinSlice.reducer;

export const signinSelector = (state) => state.signin;

export const { signin, login, logout } = signinSlice.actions;