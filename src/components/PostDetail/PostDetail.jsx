import React, { useEffect } from "react";
import { FaEllipsisH, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { HiEnvelope, HiOutlineShare } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    getPost,
    likePost,
    removeLikePost,
} from "../../features/posts/postsSlice";
import "./PostDetail.scss";

const PostDetail = () => {
    const { post } = useSelector((state) => state.posts);
    const { user, token } = useSelector((state) => state.auth);
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPost(_id));
        // eslint-disable-next-line
    }, []);

    const postLiked = (post) => {
        if (!user) return false;
        return post.likes.includes(user._id);
    };

    if (!post) return null;

    return (
        <div className="flex-1 flex justify-center items-center">
            <div className="flex w-3/5 dark:bg-gray-700 rounded-lg dark:text-white p-4 h-4/5 gap-2 container-post-detail">
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
                                            if (token)
                                                dispatch(likePost(post._id));
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
                <div className="flex-1 flex flex-col justify-center items-center rounded-lg dark:bg-gray-800">
                    <h2>Comments</h2>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
