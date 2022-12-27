import React from "react";
import { FaEllipsisH, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { HiEnvelope, HiOutlineShare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likePost, removeLikePost } from "../../../features/posts/postsSlice";

const Post = () => {
    const { posts } = useSelector((state) => state.posts);
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const postLiked = (post) => {
        if (!user || !posts) return false;
        return post.likes.includes(user._id);
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
                        <span className=" text-gray-900 dark:text-gray-300 flex flex-row-reverse items-center flex-1">
                            <FaEllipsisH />
                        </span>
                    </div>
                    <div>
                        <span className="text-gray-900 dark:text-white">
                            {post.content}
                        </span>
                    </div>
                    {post.post_img === "" ? null : (
                        <div className="w-full flex justify-center">
                            <img
                                className="w-full rounded"
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
