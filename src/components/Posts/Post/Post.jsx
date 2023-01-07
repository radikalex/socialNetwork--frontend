import React, { useState } from "react";
import { FaEllipsisH, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { HiEnvelope, HiOutlineShare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likePost, removeLikePost } from "../../../features/posts/postsSlice";
import { getTimeElapsed } from "../../../utils/getTimeElapsed";
import MenuPost from "../../MenuPost/MenuPost";
import "./Post.scss";

const Post = () => {
    const { posts } = useSelector((state) => state.posts);
    const { user, token } = useSelector((state) => state.auth);
    const [showMenuPost, setShowMenuPost] = useState(false);
    const [username, setUsername] = useState("");
    const [postId, setPostId] = useState("");
    const [urlImage, SetUrlImage] = useState("");
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postLiked = (post) => {
        if (!user || !posts) return false;
        return post.likes.includes(user._id);
    };

    const postsList = posts?.map((post, idx) => {
        return (
            <div
                className="flex gap-2 bg-gray-50 rounded-lg dark:bg-gray-800 w-full mt-4 p-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-780"
                onClick={() => navigate(`/post/${post._id}`)}
                key={idx}
            >
                <div className="flex flex-col items-center">
                    <img
                        className="w-12 h-12 rounded-full hover:opacity-80"
                        src={"http://localhost:8080/" + post.userId.user_img}
                        alt="Profile pic"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${post.userId.username}`);
                        }}
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex gap-3">
                        <span
                            className=" text-gray-900 dark:text-white font-bold hover:underline hover:underline-offset-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/profile/${post.userId.username}`);
                            }}
                        >
                            {post.userId.firstName + " " + post.userId.lastName}
                        </span>
                        <span
                            className=" text-gray-900 dark:text-gray-400 hover:underline hover:underline-offset-2"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/profile/${post.userId.username}`);
                            }}
                        >
                            @{post.userId.username}
                        </span>
                        <div className="flex flex-row-reverse items-center flex-1 gap-4 relative">
                            <span
                                className="text-gray-900 dark:text-gray-300 dark:hover:bg-gray-600 hover:bg-gray-200 h-full flex items-center px-2 rounded-md cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setUsername(post.userId.username);
                                    setPostId(post._id);
                                    setContent(post.content);
                                    SetUrlImage(
                                        post.post_img && post.post_img !== ""
                                            ? "http://localhost:8080/" +
                                                  post.post_img
                                            : ""
                                    );
                                    setShowMenuPost(true);
                                }}
                            >
                                <FaEllipsisH />
                            </span>
                            <span className="text-gray-900 dark:text-gray-400">
                                {getTimeElapsed(post.date)}
                                {post.date !== post.dateCreated
                                    ? " (edited)"
                                    : null}
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
                                loading="lazy"
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
                        <div
                            className="flex gap-2 items-center cursor-pointer hover:text-blue-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/post/${post._id}`, {
                                    state: { showAddComment: true },
                                });
                            }}
                        >
                            <FaRegComment />
                            <span>{post.commentIds.length}</span>
                        </div>
                        {postLiked(post) ? (
                            <div
                                className="flex gap-2 items-center cursor-pointer text-red-600 text-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(removeLikePost(post._id));
                                }}
                            >
                                <FaHeart />
                                <span>{post.likes.length}</span>
                            </div>
                        ) : (
                            <div
                                className="flex gap-2 items-center cursor-pointer hover:text-red-600"
                                onClick={(e) => {
                                    e.stopPropagation();
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

    return (
        <>
            <MenuPost
                username={username}
                postId={postId}
                content={content}
                urlImage={urlImage}
                showMenuPost={showMenuPost}
                setShowMenuPost={setShowMenuPost}
            />
            <div className="flex flex-col gap-4">{postsList}</div>
        </>
    );
};

export default Post;
