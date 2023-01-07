import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    userProfile: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: "",
};

// const wait = (ms) =>
//     new Promise((resolve) => {
//         setTimeout(() => resolve(), ms);
//     });

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        resetUsers: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessage = "";
            state.users = [];
            state.userProfile = null;
        },
    },
    extraReducers: (builder) => {},
});

export const { resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
