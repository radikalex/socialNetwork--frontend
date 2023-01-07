import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/authSlice";
import comments from "../features/comments/commentsSlice";
import posts from "../features/posts/postsSlice";
import users from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        auth,
        posts,
        comments,
        users,
    },
});
