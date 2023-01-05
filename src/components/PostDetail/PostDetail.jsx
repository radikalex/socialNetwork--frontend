import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { HiEnvelope, HiOutlineShare } from "react-icons/hi2";
import { IoCalendar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getComments, reset } from "../../features/comments/commentsSlice";
import {
    getPost,
    likePost,
    removeLikePost,
} from "../../features/posts/postsSlice";
import AddComment from "./AddComment/AddComment";
import "./PostDetail.scss";

const PostDetail = () => {
    const [showModalComment, setShowModalComment] = useState(false);
    const [reseted, setReseted] = useState(false);
    const { post } = useSelector((state) => state.posts);
    const { user, token } = useSelector((state) => state.auth);
    const { comments, pageComments, dateComments, commentsLengthOffset } =
        useSelector((state) => state.comments);
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const handleScroll = (e) => {
        const bottom =
            Math.abs(
                e.target.scrollHeight -
                    e.target.clientHeight -
                    e.target.scrollTop
            ) < 1;
        if (bottom) {
            dispatch(
                getComments({ _id, date: dateComments, page: pageComments })
            );
        }
    };

    useEffect(() => {
        dispatch(reset());
        setReseted(true);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (reseted) {
            dispatch(getPost({ _id, date: dateComments }));
            dispatch(
                getComments({ _id, date: dateComments, page: pageComments })
            );
        }
        // eslint-disable-next-line
    }, [reseted]);

    const postLiked = (post) => {
        if (!user) return false;
        return post.likes.includes(user._id);
    };

    if (!post) return null;

    const commentsList = comments.map((comment, idx) => {
        return (
            <div
                key={idx}
                className="w-full p-2 rounded-lg dark:bg-gray-600 flex flex-col gap-1"
            >
                <div className="w-full flex gap-3 items-center">
                    <img
                        className="w-9 h-9 rounded-full"
                        src={"http://localhost:8080/" + comment.userId.user_img}
                        alt="Profile pic"
                    />
                    <div className="flex flex-col justify-center text-sm">
                        <span className=" text-gray-900 dark:text-white font-bold">
                            {comment.userId.firstName +
                                " " +
                                comment.userId.lastName}
                        </span>
                        <span className=" text-gray-900 dark:text-gray-400">
                            @{comment.userId.username}
                        </span>
                    </div>
                    <div className="flex flex-row-reverse items-center flex-1 gap-4">
                        <span className=" text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-200 h-full flex items-center p-2 rounded-md cursor-pointer">
                            <FaEllipsisH />
                        </span>
                    </div>
                </div>
                <div className="text-sm w-full whitespace-pre-wrap">
                    {comment.content}
                </div>
                <div className="w-full flex justify-around text-sm dark:text-gray-300">
                    <div className="flex gap-1 items-center">
                        <IoCalendar />
                        <span>{getPostAge(comment.date)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <FaRegHeart className="cursor-pointer" />
                        <span>
                            {comment.likes.length}{" "}
                            {comment.likes.length === 1 ? "like" : "likes"}
                        </span>
                    </div>
                </div>
            </div>
        );
    });

    return (
        <>
            <AddComment
                showModalComment={showModalComment}
                setShowModalComment={setShowModalComment}
            />
            <div className="flex-1 flex justify-center items-center">
                <div className="flex w-3/5 dark:bg-gray-700 rounded-lg dark:text-white p-4 gap-2 container-post-detail">
                    <div className="flex-2 flex flex-col">
                        <div className="w-full flex flex-col justify-center items-center gap-2 h-full">
                            <div className="w-full max-h-full flex flex-col gap-2 p-4 rounded-lg dark:bg-gray-800">
                                <div className="w-full flex gap-3 items-center">
                                    <img
                                        className="w-16 h-16 rounded-full"
                                        src={
                                            "http://localhost:8080/" +
                                            post.userId.user_img
                                        }
                                        alt="Profile pic"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <span className=" text-gray-900 dark:text-white font-bold">
                                            {post.userId.firstName +
                                                " " +
                                                post.userId.lastName}
                                        </span>
                                        <span className=" text-gray-900 dark:text-gray-400">
                                            @{post.userId.username}
                                        </span>
                                    </div>
                                    <div className="flex flex-row-reverse items-center flex-1 gap-4">
                                        <span className=" text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-200 h-full flex items-center p-2 rounded-md cursor-pointer">
                                            <FaEllipsisH />
                                        </span>
                                    </div>
                                </div>
                                <div className="overflow-auto scrollbar-hide w-full">
                                    <div className="w-full whitespace-pre-wrap mb-1">
                                        {post.content}
                                    </div>
                                    {!post.post_img ||
                                    post.post_img === "" ? null : (
                                        <div className="w-full flex justify-center">
                                            <img
                                                className="w-auto h-auto rounded max-w-full max-h img-post-detail"
                                                src={
                                                    "http://localhost:8080/" +
                                                    post.post_img
                                                }
                                                alt="Post_img"
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-around text-gray-900 dark:text-gray-400 w-full">
                                    <div className="flex items-center cursor-pointer hover:text-indigo-500">
                                        <HiEnvelope />
                                    </div>
                                    <div className="flex items-center cursor-pointer hover:text-green-500">
                                        <HiOutlineShare />
                                    </div>
                                    <div className="flex gap-2 items-center cursor-pointer hover:text-blue-500">
                                        <FaRegComment />
                                        <span>
                                            {post.commentIds.length +
                                                commentsLengthOffset}
                                        </span>
                                    </div>
                                    {postLiked(post) ? (
                                        <div
                                            className="flex gap-2 items-center cursor-pointer text-red-600 text-sm"
                                            onClick={() =>
                                                dispatch(
                                                    removeLikePost(post._id)
                                                )
                                            }
                                        >
                                            <FaHeart />
                                            <span>{post.likes.length}</span>
                                        </div>
                                    ) : (
                                        <div
                                            className="flex gap-2 items-center cursor-pointer hover:text-red-600"
                                            onClick={() => {
                                                if (token)
                                                    dispatch(
                                                        likePost(post._id)
                                                    );
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
                    </div>
                    <div className="flex-1 flex flex-col items-center rounded-lg dark:bg-gray-800">
                        <div className="dark:bg-gray-900 w-full rounded-t-lg flex justify-center p-3">
                            <span className="text-xl">Comments</span>
                        </div>
                        {comments.length ? (
                            <div
                                className="flex flex-col w-full flex-1 items-center overflow-auto scrollbar-hide gap-2 p-4"
                                onScroll={handleScroll}
                            >
                                {commentsList}
                            </div>
                        ) : (
                            <div className="p-4 flex-1 text-slate-300">
                                <span>No comments yet...</span>
                            </div>
                        )}
                        <div className="dark:bg-gray-900 w-full rounded-b-lg flex justify-center p-3">
                            <button
                                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => {
                                    if (token) setShowModalComment(true);
                                    else navigate("/login");
                                }}
                            >
                                Add a comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
