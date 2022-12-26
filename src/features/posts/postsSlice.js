import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
    posts: [],
    post: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: "",
};

// const wait = (ms) =>
//     new Promise((resolve) => {
//         setTimeout(() => resolve(), ms);
//     });

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessage = "";
            state.posts = [];
            state.post = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = [...state.posts, ...action.payload.posts];
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = [...state.posts, ...action.payload.posts];
            });
    },
});

export const getPosts = createAsyncThunk("posts/getPosts", async (page) => {
    try {
        return await postsService.getPosts(page);
    } catch (error) {
        console.error(error);
    }
});

export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async (page) => {
        try {
            return await postsService.getAllPosts(page);
        } catch (error) {
            console.error(error);
        }
    }
);

export const { reset } = postsSlice.actions;

export default postsSlice.reducer;
