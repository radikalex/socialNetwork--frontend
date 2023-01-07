import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import usersService from "./usersService";

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
            state.userProfile = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessage = "";
            state.users = [];
            state.userProfile = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.userProfile = action.payload.user;
        });
    },
});

export const getUserProfile = createAsyncThunk(
    "users/getUserProfile",
    async (data) => {
        try {
            return await usersService.getUserProfile(data);
        } catch (error) {
            console.error(error);
        }
    }
);

export const { resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
