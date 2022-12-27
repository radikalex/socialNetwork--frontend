import React from "react";
import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
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
                className="flex flex-col bg-gray-50 rounded-lg dark:bg-gray-800 w-full mt-4 p-3"
                key={idx}
            >
                <div className="flex gap-3">
                    <span className=" text-gray-900 dark:text-white">
                        {post.userId.firstName + " " + post.userId.lastName}
                    </span>
                    <span className=" text-gray-900 dark:text-gray-400">
                        @{post.userId.username}
                    </span>
                </div>
                <div>
                    <span className="text-gray-900 dark:text-white">
                        {post.content}
                    </span>
                </div>
                <div className="flex justify-around text-gray-900 dark:text-gray-400">
                    <div className="flex gap-2 items-center cursor-pointer text-sm">
                        <FaRegComment />
                        <span>{post.commentIds.length}</span>
                    </div>
                    {postLiked(post) ? (
                        <div
                            className="flex gap-2 items-center cursor-pointer text-red-600 text-sm"
                            onClick={() => dispatch(removeLikePost(post._id))}
                        >
                            <FaHeart />
                            <span>{post.likes.length}</span>
                        </div>
                    ) : (
                        <div
                            className="flex gap-2 items-center cursor-pointer text-sm hover:text-red-600"
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
        );
    });

    return <div className="flex flex-col gap-4">{postsList}</div>;
};

export default Post;
