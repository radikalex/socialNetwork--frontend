import React from "react";
import { FaEllipsisH, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { HiEnvelope, HiOutlineShare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likePost, removeLikePost } from "../../../features/posts/postsSlice";
import "./Post.scss";

const Post = () => {
    const { posts } = useSelector((state) => state.posts);
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postLiked = (post) => {
        if (!user || !posts) return false;
        return post.likes.includes(user._id);
    };

    const getPostAge = (date) => {
        const actualDate = new Date();
        const postDate = new Date(date);
        const timeElapsed = (actualDate.getTime() - postDate.getTime()) / 1000;

        switch (true) {
            case timeElapsed < 1:
                return `A moment ago`;
            case timeElapsed < 60: // Seconds
                return `${Math.floor(timeElapsed)} ${
                    Math.floor(timeElapsed) === 1 ? "second" : "seconds"
                } ago`;
            case timeElapsed < 3600: // Minutes
                return `${Math.floor(timeElapsed / 60)} ${
                    Math.floor(timeElapsed / 60) === 1 ? "minute" : "minutes"
                } ago`;
            case timeElapsed < 86400: // Hours
                return `${Math.floor(timeElapsed / 3600)} ${
                    Math.floor(timeElapsed / 3600) === 1 ? "hour" : "hours"
                } ago`;
            case timeElapsed < 604800: // Days
                return `${Math.floor(timeElapsed / 86400)} ${
                    Math.floor(timeElapsed / 86400) === 1 ? "day" : "days"
                } ago`;
            case timeElapsed < 1814400: // Week
                return `${Math.floor(timeElapsed / 604800)} ${
                    Math.floor(timeElapsed / 604800) === 1 ? "week" : "weeks"
                } ago`;
            case timeElapsed < 31536000: // Months
                return `${postDate.getDate()} ${postDate
                    .toLocaleString("en-US", { month: "short" })
                    .toLowerCase()}.`;
            case timeElapsed >= 31536000: // Years
                return `${postDate.getDate()} ${postDate
                    .toLocaleString("en-US", { month: "short" })
                    .toLowerCase()}. ${postDate.getFullYear()}`;
            default:
                break;
        }

        return "";
    };

    const postsList = posts?.map((post, idx) => {
        return (
            <div
                className="flex gap-2 bg-gray-50 rounded-lg dark:bg-gray-800 w-full mt-4 p-4"
                key={idx}
            >
                <div className="flex flex-col items-center">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={"http://localhost:8080/" + post.userId.user_img}
                        alt="Profile pic"
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex gap-3">
                        <span className=" text-gray-900 dark:text-white font-bold">
                            {post.userId.firstName + " " + post.userId.lastName}
                        </span>
                        <span className=" text-gray-900 dark:text-gray-400">
                            @{post.userId.username}
                        </span>
                        <div className="flex flex-row-reverse items-center flex-1 gap-4">
                            <span className=" text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-200 h-full flex items-center pl-4 rounded-md cursor-pointer">
                                <FaEllipsisH />
                            </span>
                            <span className=" text-gray-900 dark:text-gray-400">
                                {getPostAge(post.date)}
                            </span>
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-900 dark:text-white whitespace-pre-wrap">
                            {post.content}
                        </span>
                    </div>
                    {!post.post_img || post.post_img === "" ? null : (
                        <div className="w-full flex justify-center">
                            <img
                                className="w-auto h-auto rounded max-w-full max-h img-post"
                                src={"http://localhost:8080/" + post.post_img}
                                alt="Post_img"
                            />
                        </div>
                    )}
                    <div className="flex justify-around text-gray-900 dark:text-gray-400">
                        <div className="flex items-center cursor-pointer hover:text-indigo-500">
                            <HiEnvelope />
                        </div>
                        <div className="flex items-center cursor-pointer hover:text-green-500">
                            <HiOutlineShare />
                        </div>
                        <div className="flex gap-2 items-center cursor-pointer hover:text-blue-500">
                            <FaRegComment />
                            <span>{post.commentIds.length}</span>
                        </div>
                        {postLiked(post) ? (
                            <div
                                className="flex gap-2 items-center cursor-pointer text-red-600 text-sm"
                                onClick={() =>
                                    dispatch(removeLikePost(post._id))
                                }
                            >
                                <FaHeart />
                                <span>{post.likes.length}</span>
                            </div>
                        ) : (
                            <div
                                className="flex gap-2 items-center cursor-pointer hover:text-red-600"
                                onClick={() => {
                                    if (token) dispatch(likePost(post._id));
                                    else navigate("/login");
                                }}
                            >
                                <FaRegHeart />
                                <span>{post.likes.length}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    });

    return <div className="flex flex-col gap-4">{postsList}</div>;
};

export default Post;
