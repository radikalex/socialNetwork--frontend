import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "./authService";

const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
    user: null,
    token: token ? token : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: "",
};

// const wait = (ms) =>
//     new Promise((resolve) => {
//         setTimeout(() => resolve(), ms);
//     });

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                state.isLoading = false;
                state.token = action.payload.token;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload.error;
            })
            .addCase(register.fulfilled, (state) => {
                state.isSuccess = true;
                state.isError = false;
                state.isLoading = false;
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload.errors[0].msg;
            })
            .addCase(getLoggedUser.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isSuccess = true;
                state.user = null;
                state.token = null;
            })
            .addCase(logout.pending, (state) => {
                state.isSuccess = false;
            });
    },
});

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
            return await authService.register(user);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
    try {
        // await wait(0);
        return await authService.login(user);
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const getLoggedUser = createAsyncThunk(
    "auth/getLoggedUser",
    async () => {
        try {
            return await authService.getLoggedUser();
        } catch (error) {
            console.error(error);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async (thunkAPI) => {
    try {
        return await authService.logout();
    } catch (error) {
        console.error(error);
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
