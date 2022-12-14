import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
    posts: [],
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
            state.date = new Date().toISOString();
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
            .addCase(getPostsCreatedByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.posts;
            })
            .addCase(getPostsLikedByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.posts;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = [...state.posts, ...action.payload.posts];
                state.page = state.page + 1;
            })
            .addCase(getPostsQuery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload.posts;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts = [action.payload.post, ...state.posts];
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
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload.post._id
                );
                state.posts = [action.payload.post, ...state.posts];
                state.post = action.payload.post;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload.post._id
                );
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(deletePost.pending, (state) => {
                state.isLoading = true;
                state.isSuccess = false;
            });
    },
});

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

export const getPostsLikedByUser = createAsyncThunk(
    "posts/getPostsLikedByUser",
    async (data) => {
        try {
            return await postsService.getPostsLikedByUser(data);
        } catch (error) {
            console.error(error);
        }
    }
);

export const getPostsQuery = createAsyncThunk(
    "posts/getPostsQuery",
    async (data) => {
        try {
            return await postsService.getPostsQuery(data);
        } catch (error) {
            console.error(error);
        }
    }
);

export const getPostsCreatedByUser = createAsyncThunk(
    "posts/getPostsCreatedByUser",
    async (data) => {
        try {
            return await postsService.getPostsCreatedByUser(data);
        } catch (error) {
            console.error(error);
        }
    }
);

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

export const updatePost = createAsyncThunk("posts/updatePost", async (data) => {
    try {
        return await postsService.updatePost(data);
    } catch (error) {
        console.error(error);
    }
});

export const deletePost = createAsyncThunk("posts/deletePost", async (_id) => {
    try {
        return await postsService.deletePost(_id);
    } catch (error) {
        console.error(error);
    }
});

export const { reset, closeModalAddPost, openModalAddPost } =
    postsSlice.actions;

export default postsSlice.reducer;
