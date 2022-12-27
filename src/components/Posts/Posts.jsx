/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getPosts, reset } from "../../features/posts/postsSlice";
import Post from "./Post/Post";

const Posts = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(reset());
    });
    useEffect(() => {
        if (token) {
            dispatch(getPosts(page));
        } else {
            dispatch(getAllPosts(page));
        }
    }, [token]);
    return (
        <div className="flex-1 flex justify-center">
            <div className="w-3/5 flex flex-col items-center">
                <h1 className="text-gray-900 dark:text-white mt-4 text-3xl">
                    Home
                </h1>
                <div className="w-full">
                    <Post setPage={setPage} />
                </div>
            </div>
        </div>
    );
};

export default Posts;
