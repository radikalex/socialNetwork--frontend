import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
    comments: [],
    pageComments: 1,
    commentsLengthOffset: 0,
    dateComments: new Date().toISOString(),
    isError: false,
    isSuccess: false,
    isLoading: false,
    errorMessage: "",
};

// const wait = (ms) =>
//     new Promise((resolve) => {
//         setTimeout(() => resolve(), ms);
//     });

export const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessage = "";
            state.dateComments = new Date().toISOString();
            state.comments = [];
            state.commentsLengthOffset = 0;
            state.pageComments = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getComments.fulfilled, (state, action) => {
                state.comments = [
                    ...state.comments,
                    ...action.payload.comments,
                ];
                state.pageComments = state.pageComments + 1;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments = [action.payload.comment, ...state.comments];
                state.commentsLengthOffset = state.commentsLengthOffset + 1;
            })
            .addCase(likeComment.fulfilled, (state, action) => {
                state.comments = state.comments.map((comment) => {
                    if (comment._id === action.payload.comment._id) {
                        comment = action.payload.comment;
                    }
                    return comment;
                });
            })
            .addCase(removeLikeComment.fulfilled, (state, action) => {
                state.comments = state.comments.map((comment) => {
                    if (comment._id === action.payload.comment._id) {
                        comment = action.payload.comment;
                    }
                    return comment;
                });
            });
    },
});

export const createComment = createAsyncThunk(
    "comments/createComment",
    async (data) => {
        try {
            return await commentsService.createComment(data);
        } catch (error) {
            console.error(error);
        }
    }
);

export const getComments = createAsyncThunk(
    "comments/getComments",
    async (data) => {
        try {
            return await commentsService.getComments(data);
        } catch (error) {
            console.error(error);
        }
    }
);

export const likeComment = createAsyncThunk(
    "comments/likeComment",
    async (_id) => {
        try {
            return await commentsService.likeComment(_id);
        } catch (error) {
            console.error(error);
        }
    }
);

export const removeLikeComment = createAsyncThunk(
    "comments/removeLikeComment",
    async (_id) => {
        try {
            return await commentsService.removeLikeComment(_id);
        } catch (error) {
            console.error(error);
        }
    }
);

export const { reset } = commentsSlice.actions;

export default commentsSlice.reducer;
