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
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessage = "";
            state.users = [];
            state.userProfile = null;
        },
        resetUsersFlags: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.errorMessage = "";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.userProfile = action.payload.user;
            })
            .addCase(updateLoggedUser.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.isError = false;
                state.isLoading = false;
                state.userProfile = action.payload.user;
            })
            .addCase(updateLoggedUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateLoggedUser.rejected, (state, action) => {
                state.isError = true;
                state.isLoading = false;
                state.errorMessage = action.payload.errors[0].msg;
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
                if (action.payload.newFollower._id === state.userProfile._id) {
                    state.userProfile.following = [
                        action.payload.followedUser,
                        ...state.userProfile.following,
                    ];
                }
            })
            .addCase(followFollowing.fulfilled, (state, action) => {
                state.userProfile.following = state.userProfile.following.map(
                    (followingUser) => {
                        if (
                            followingUser._id ===
                            action.payload.followedUser._id
                        ) {
                            followingUser.followers = [
                                action.payload.newFollower._id,
                                ...followingUser.following,
                            ];
                        }
                        return followingUser;
                    }
                );
            })
            .addCase(unfollow.fulfilled, (state, action) => {
                state.userProfile.followers =
                    state.userProfile.followers.filter(
                        (follower) =>
                            follower._id !== action.payload.oldFollower._id
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
                if (action.payload.oldFollower._id === state.userProfile._id) {
                    state.userProfile.following =
                        state.userProfile.following.filter(
                            (following) =>
                                following._id !==
                                action.payload.unfollowedUser._id
                        );
                }
            })
            .addCase(unfollowFollowing.fulfilled, (state, action) => {
                state.userProfile.following = state.userProfile.following.map(
                    (followingUser) => {
                        if (
                            followingUser._id ===
                            action.payload.unfollowedUser._id
                        ) {
                            followingUser.followers =
                                followingUser.followers.filter(
                                    (_id) =>
                                        _id !== action.payload.oldFollower._id
                                );
                        }
                        return followingUser;
                    }
                );
                if (action.payload.oldFollower._id === state.userProfile._id) {
                    state.userProfile.following =
                        state.userProfile.following.filter(
                            (following) =>
                                following._id !==
                                action.payload.unfollowedUser._id
                        );
                }
            });
    },
});

export const updateLoggedUser = createAsyncThunk(
    "users/updateLoggedUser",
    async (data, thunkAPI) => {
        try {
            return await usersService.updateLoggedUser(data);
        } catch (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

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

export const followFollowing = createAsyncThunk(
    "users/followFolloweing",
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

export const unfollowFollowing = createAsyncThunk(
    "users/unfollowFollowing",
    async (_id) => {
        try {
            return await usersService.unfollow(_id);
        } catch (error) {
            console.error(error);
        }
    }
);

export const { resetUsers, resetUsersFlags } = usersSlice.actions;

export default usersSlice.reducer;
