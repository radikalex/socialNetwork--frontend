import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
    posts: [],
    commentsPost: [],
    date: new Date().toISOString(),
    page: 1,
    post: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: "",
    showModalAddPost: false,
};

// const wait = (ms) =>
//     new Promise((resolve) => {
//         setTimeout(() => resolve(), ms);
//     });

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        closeModalAddPost: (state) => {
            state.showModalAddPost = false;
        },
        openModalAddPost: (state) => {
            state.showModalAddPost = true;
        },
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessage = "";
            state.posts = [];
            state.page = 1;
            state.post = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPost.fulfilled, (state, action) => {
                state.isLoading = false;
                state.post = action.payload.post;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = [...state.posts, ...action.payload.posts];
                state.page = state.page + 1;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = [...state.posts, ...action.payload.posts];
                state.page = state.page + 1;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts = [action.payload.post, ...state.posts];
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.post.commentIds = [
                    action.payload.comment,
                    ...state.post.commentIds,
                ];
            })
            .addCase(likePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => {
                    if (post._id === action.payload.post._id) {
                        post = action.payload.post;
                    }
                    return post;
                });
                state.post = action.payload.post;
            })
            .addCase(removeLikePost.fulfilled, (state, action) => {
                state.posts = state.posts.map((post) => {
                    if (post._id === action.payload.post._id) {
                        post = action.payload.post;
                    }
                    return post;
                });
                state.post = action.payload.post;
            });
    },
});

export const createComment = createAsyncThunk(
    "posts/createComment",
    async (data) => {
        try {
            return await postsService.createComment(data);
        } catch (error) {
            console.error(error);
        }
    }
);

export const createPost = createAsyncThunk("posts/createPost", async (data) => {
    try {
        return await postsService.createPost(data);
    } catch (error) {
        console.error(error);
    }
});

export const likePost = createAsyncThunk("posts/likePost", async (_id) => {
    try {
        return await postsService.likePost(_id);
    } catch (error) {
        console.error(error);
    }
});

export const removeLikePost = createAsyncThunk(
    "posts/removeLikePost",
    async (_id) => {
        try {
            return await postsService.removeLikePost(_id);
        } catch (error) {
            console.error(error);
        }
    }
);

export const getPost = createAsyncThunk("posts/getPost", async (data) => {
    try {
        return await postsService.getPost(data);
    } catch (error) {
        console.error(error);
    }
});

export const getPosts = createAsyncThunk("posts/getPosts", async (data) => {
    try {
        return await postsService.getPosts(data);
    } catch (error) {
        console.error(error);
    }
});

export const getAllPosts = createAsyncThunk(
    "posts/getAllPosts",
    async (data) => {
        try {
            return await postsService.getAllPosts(data);
        } catch (error) {
            console.error(error);
        }
    }
);

export const { reset, closeModalAddPost, openModalAddPost } =
    postsSlice.actions;

export default postsSlice.reducer;
