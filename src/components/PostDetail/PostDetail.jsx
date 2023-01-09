import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { HiEnvelope, HiOutlineShare } from "react-icons/hi2";
import { IoCalendar } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    getComments,
    likeComment,
    removeLikeComment,
    resetComments,
} from "../../features/comments/commentsSlice";
import {
    getPost,
    likePost,
    removeLikePost,
} from "../../features/posts/postsSlice";
import { getTimeElapsed } from "../../utils/getTimeElapsed";
import MenuPost from "../MenuPost/MenuPost";
import AddComment from "./AddComment/AddComment";
import MenuComment from "./MenuComment/MenuComment";
import "./PostDetail.scss";

const PostDetail = () => {
    const [showModalComment, setShowModalComment] = useState(false);
    const [showMenuPost, setShowMenuPost] = useState(false);
    const [showMenuComment, setShowMenuComment] = useState(false);
    const [reseted, setReseted] = useState(false);
    const [username, setUsername] = useState("");
    const [commentId, setCommentId] = useState("");
    const [content, setContent] = useState("");
    const { post } = useSelector((state) => state.posts);
    const { user, token } = useSelector((state) => state.auth);
    const { comments, pageComments, dateComments, commentsLengthOffset } =
        useSelector((state) => state.comments);
    const { _id } = useParams();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

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
        dispatch(resetComments());
        setReseted(true);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (reseted) {
            dispatch(getPost({ _id, date: dateComments }));
            dispatch(
                getComments({ _id, date: dateComments, page: pageComments })
            );
            if (location.state && location.state.showAddComment) {
                setShowModalComment(location.state.showAddComment);
                navigate(location.pathname, {});
            }
        }
        // eslint-disable-next-line
    }, [reseted]);

    const postLiked = (post) => {
        if (!user) return false;
        return post.likes.includes(user._id);
    };

    const commentLiked = (comment) => {
        if (!user) return false;
        return comment.likes.includes(user._id);
    };

    const commentsList = comments.map((comment, idx) => {
        return (
            <div
                key={idx}
                className="w-full p-2 rounded-lg bg-gray-300 dark:bg-gray-600 flex flex-col gap-1"
            >
                <div className="w-full flex gap-3 items-center">
                    <img
                        className="w-9 h-9 rounded-full hover:opacity-80 cursor-pointer"
                        src={
                            process.env.REACT_APP_API_URL +
                            "/" +
                            comment.userId.user_img
                        }
                        alt="Profile pic"
                        onClick={(e) => {
                            navigate(`/profile/${comment.userId.username}`);
                        }}
                    />
                    <div className="flex flex-col justify-center text-sm">
                        <span
                            className=" text-gray-900 dark:text-white font-bold hover:underline hover:underline-offset-2 cursor-pointer"
                            onClick={(e) => {
                                navigate(`/profile/${comment.userId.username}`);
                            }}
                        >
                            {comment.userId.firstName +
                                " " +
                                comment.userId.lastName}
                        </span>
                        <span
                            className=" text-gray-900 dark:text-gray-400 hover:underline hover:underline-offset-2 cursor-pointer"
                            onClick={(e) => {
                                navigate(`/profile/${comment.userId.username}`);
                            }}
                        >
                            @{comment.userId.username}
                        </span>
                    </div>
                    <div className="flex flex-row-reverse items-center flex-1 gap-4">
                        <span
                            className=" text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-200 h-full flex items-center p-2 rounded-md cursor-pointer"
                            onClick={() => {
                                setUsername(comment.userId.username);
                                setCommentId(comment._id);
                                setContent(comment.content);
                                setShowMenuComment(true);
                            }}
                        >
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
                        <span>
                            {getTimeElapsed(comment.date)}
                            {comment.date !== comment.dateCreated
                                ? " (edited)"
                                : null}
                        </span>
                    </div>
                    {commentLiked(comment) ? (
                        <div className="flex gap-2 items-center">
                            <FaHeart
                                className="cursor-pointer text-red-600"
                                onClick={() =>
                                    dispatch(removeLikeComment(comment._id))
                                }
                            />
                            <span className="hover:underline cursor-pointer">
                                {comment.likes.length}{" "}
                                {comment.likes.length === 1 ? "like" : "likes"}
                            </span>
                        </div>
                    ) : (
                        <div className="flex gap-2 items-center">
                            <FaRegHeart
                                className="cursor-pointer hover:text-red-600"
                                onClick={() => {
                                    if (token)
                                        dispatch(likeComment(comment._id));
                                    else navigate("/login");
                                }}
                            />
                            <span className="hover:underline cursor-pointer">
                                {comment.likes.length}{" "}
                                {comment.likes.length === 1 ? "like" : "likes"}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        );
    });

    const getDateDetail = (date) => {
        const dateDetail = new Date(date);
        const hours =
            dateDetail.getHours() > 10
                ? `${dateDetail.getHours()}`
                : `0${dateDetail.getHours()}`;
        const minutes =
            dateDetail.getMinutes() > 10
                ? `${dateDetail.getMinutes()}`
                : `0${dateDetail.getMinutes()}`;
        return `${dateDetail.getDate()} ${dateDetail
            .toLocaleString("en-US", { month: "short" })
            .toLowerCase()}. ${dateDetail.getFullYear()} - ${hours}:${minutes}`;
    };

    if (!post) return null;

    return (
        <>
            <AddComment
                showModalComment={showModalComment}
                setShowModalComment={setShowModalComment}
            />
            <MenuPost
                username={post?.userId.username}
                postId={post?._id}
                content={post?.content}
                urlImage={
                    post?.post_img && post?.post_img !== ""
                        ? process.env.REACT_APP_API_URL + "/" + post?.post_img
                        : ""
                }
                showMenuPost={showMenuPost}
                setShowMenuPost={setShowMenuPost}
            />
            <MenuComment
                username={username}
                commentId={commentId}
                content={content}
                showMenuComment={showMenuComment}
                setShowMenuComment={setShowMenuComment}
            />
            {!post ? null : (
                <div className="flex-1 flex justify-center items-center">
                    <div className="flex w-8/12 dark:bg-gray-700 bg-gray-300 rounded-lg dark:text-white p-4 gap-2 container-post-detail">
                        <div className="flex-2 flex flex-col">
                            <div className="w-full flex flex-col justify-center items-center gap-2 h-full">
                                <div className="w-full max-h-full flex flex-col gap-2 p-4 rounded-lg dark:bg-gray-800 bg-gray-200">
                                    <div className="w-full flex gap-3 items-center">
                                        <img
                                            className="w-16 h-16 rounded-full hover:opacity-80 cursor-pointer"
                                            src={
                                                process.env.REACT_APP_API_URL +
                                                "/" +
                                                post.userId.user_img
                                            }
                                            alt="Profile pic"
                                            onClick={(e) => {
                                                navigate(
                                                    `/profile/${post.userId.username}`
                                                );
                                            }}
                                        />
                                        <div className="flex flex-col justify-center">
                                            <span
                                                className=" text-gray-900 dark:text-white font-bold hover:underline hover:underline-offset-2 cursor-pointer"
                                                onClick={(e) => {
                                                    navigate(
                                                        `/profile/${post.userId.username}`
                                                    );
                                                }}
                                            >
                                                {post.userId.firstName +
                                                    " " +
                                                    post.userId.lastName}
                                            </span>
                                            <span
                                                className=" text-gray-900 dark:text-gray-400 hover:underline hover:underline-offset-2 cursor-pointer"
                                                onClick={(e) => {
                                                    navigate(
                                                        `/profile/${post.userId.username}`
                                                    );
                                                }}
                                            >
                                                @{post.userId.username}
                                            </span>
                                        </div>
                                        <div className="flex flex-row-reverse items-center flex-1 gap-4">
                                            <span
                                                className=" text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-200 h-full flex items-center p-2 rounded-md cursor-pointer"
                                                onClick={() => {
                                                    setShowMenuPost(true);
                                                }}
                                            >
                                                <FaEllipsisH />
                                            </span>
                                            <span className="text-gray-900 dark:text-gray-400">
                                                {getDateDetail(post.date)}
                                                {post.date !== post.dateCreated
                                                    ? " (edited)"
                                                    : null}
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
                                                        process.env
                                                            .REACT_APP_API_URL +
                                                        "/" +
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
                                        <div
                                            className="flex gap-2 items-center cursor-pointer hover:text-blue-500"
                                            onClick={() => {
                                                if (token)
                                                    setShowModalComment(true);
                                                else navigate("/login");
                                            }}
                                        >
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
                        <div className="comments-container flex flex-col items-center rounded-lg dark:bg-gray-800 bg-gray-200">
                            <div className="dark:bg-gray-900 w-full rounded-t-lg flex justify-center p-3 bg-gray-400">
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
                                <div className="p-4 flex-1 dark:text-slate-300 text-gray-900">
                                    <span>No comments yet...</span>
                                </div>
                            )}
                            <div className="dark:bg-gray-900 w-full rounded-b-lg flex justify-center p-3 bg-gray-400">
                                <button
                                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
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
            )}
        </>
    );
};

export default PostDetail;
