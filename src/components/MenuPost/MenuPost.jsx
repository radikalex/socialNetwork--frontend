/* eslint-disable react-hooks/exhaustive-deps */
import { Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { BsFilePost, BsFillPersonPlusFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { HiOutlineLink } from "react-icons/hi2";
import { ImBlocked } from "react-icons/im";
import { IoStatsChart, IoTrash } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deletePost } from "../../features/posts/postsSlice";
import UpdatePost from "./UpdatePost/UpdatePost";

const MenuPost = ({
    username,
    showMenuPost,
    setShowMenuPost,
    postId,
    content,
    urlImage,
}) => {
    const { user } = useSelector((state) => state.auth);
    const { posts, isLoading } = useSelector((state) => state.posts);
    const [deletePostFlag, setDeletePostFlag] = useState(false);
    const [updatePostFlag, setUpdatePostFlag] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (deletePostFlag && location.pathname === `/post/${postId}`)
            navigate("/");
        setShowMenuPost(false);
        setDeletePostFlag(false);
        setUpdatePostFlag(false);
    }, [posts]);

    if (!showMenuPost) return null;

    const handleClose = () => {
        setShowMenuPost(false);
        setDeletePostFlag(false);
        setUpdatePostFlag(false);
    };

    return (
        <div
            className="absolute w-screen h-screen left-0 top-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
            onMouseDown={handleClose}
        >
            {!deletePostFlag && !updatePostFlag ? (
                <div
                    className="dark:bg-gray-900 flex flex-col w-1/4 dark:text-white rounded-lg shadow dark:shadow-white"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {!user || user.username !== username ? (
                        <>
                            <div className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-t-lg text-yellow-400">
                                <MdReport className="text-2xl" />
                                Report this post
                            </div>
                            <div className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer">
                                <BsFillPersonPlusFill className="text-xl" />
                                Follow @{username}
                            </div>
                            <div className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer">
                                <ImBlocked />
                                Block @{username}
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        `http://localhost:3000/post/${postId}`
                                    )
                                }
                            >
                                <HiOutlineLink />
                                Copy link
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer"
                                onClick={() => navigate(`/post/${postId}`)}
                            >
                                <BsFilePost />
                                Go to post
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-b-lg"
                                onClick={() => setShowMenuPost(false)}
                            >
                                Cancel
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-t-lg text-red-500"
                                onClick={() => setDeletePostFlag(true)}
                            >
                                <IoTrash /> Delete my post
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer text-green-500"
                                onClick={() => setUpdatePostFlag(true)}
                            >
                                <FaPencilAlt />
                                Edit my post
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer"
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        `http://localhost:3000/post/${postId}`
                                    )
                                }
                            >
                                <HiOutlineLink />
                                Copy link
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer"
                                onClick={() => navigate(`/post/${postId}`)}
                            >
                                <BsFilePost />
                                Go to post
                            </div>
                            <div className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer">
                                <IoStatsChart />
                                Show statistics of this post
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-b-lg"
                                onClick={() => setShowMenuPost(false)}
                            >
                                Cancel
                            </div>
                        </>
                    )}
                </div>
            ) : deletePostFlag ? (
                <div
                    className="dark:bg-gray-900 flex flex-col gap-2 w-1/4 p-6 dark:text-white rounded-lg shadow dark:shadow-white"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div>
                        <svg
                            aria-hidden="true"
                            className="mx-auto text-red-600 w-14 h-14 dark:text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>
                    <div className="text-2xl text-center font-bold">
                        Are you sure you want to delete this post?
                    </div>
                    <div className="dark:text-gray-400">
                        This action is irreversible, the post will disappear
                        from your timeline and the timeline of your followers
                        and it will be deleted forever
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <button
                            className="focus:outline-none w-3/5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => {
                                dispatch(deletePost(postId));
                            }}
                        >
                            <span className="flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <Spinner aria-label="Spinner button example" />
                                ) : null}
                                <span>Delete</span>
                            </span>
                        </button>
                        <button
                            className="py-2.5 px-5 text-sm w-3/5 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => setDeletePostFlag(false)}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            ) : (
                <UpdatePost
                    setUpdatePostFlag={setUpdatePostFlag}
                    postId={postId}
                    oldContent={content}
                    src={urlImage}
                />
            )}
        </div>
    );
};

export default MenuPost;
