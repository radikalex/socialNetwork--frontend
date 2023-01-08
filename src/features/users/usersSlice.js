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
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload.user;
            })
            .addCase(follow.fulfilled, (state, action) => {
                state.userProfile.followers = [
                    action.payload.newFollower,
                    ...state.userProfile.followers,
                ];
            })
            .addCase(followFollower.fulfilled, (state, action) => {
                state.userProfile.followers = state.userProfile.followers.map(
                    (follower) => {
                        if (follower._id === action.payload.followedUser._id) {
                            follower.followers = [
                                action.payload.newFollower._id,
                                ...follower.followers,
                            ];
                        }
                        return follower;
                    }
                );
            })
            .addCase(unfollowFollower.fulfilled, (state, action) => {
                state.userProfile.followers = state.userProfile.followers.map(
                    (follower) => {
                        if (
                            follower._id === action.payload.unfollowedUser._id
                        ) {
                            follower.followers = follower.followers.filter(
                                (_id) => _id !== action.payload.oldFollower._id
                            );
                        }
                        return follower;
                    }
                );
            })
            .addCase(unfollow.fulfilled, (state, action) => {
                state.userProfile.followers =
                    state.userProfile.followers.filter(
                        (follower) =>
                            follower._id !== action.payload.oldFollower._id
                    );
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

export const follow = createAsyncThunk("users/follow", async (_id) => {
    try {
        return await usersService.follow(_id);
    } catch (error) {
        console.error(error);
    }
});

export const followFollower = createAsyncThunk(
    "users/followFollower",
    async (_id) => {
        try {
            return await usersService.follow(_id);
        } catch (error) {
            console.error(error);
        }
    }
);

export const unfollow = createAsyncThunk("users/unfollow", async (_id) => {
    try {
        return await usersService.unfollow(_id);
    } catch (error) {
        console.error(error);
    }
});

export const unfollowFollower = createAsyncThunk(
    "users/unfollowFollower",
    async (_id) => {
        try {
            return await usersService.unfollow(_id);
        } catch (error) {
            console.error(error);
        }
    }
);

export const { resetUsers } = usersSlice.actions;

export default usersSlice.reducer;
