/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import { IoStatsChart, IoTrash } from "react-icons/io5";
import { MdReport } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../../features/comments/commentsSlice";

const MenuComment = ({
    username,
    showMenuComment,
    setShowMenuComment,
    commentId,
    content,
}) => {
    const { user } = useSelector((state) => state.auth);
    const { comments } = useSelector((state) => state.posts);
    const [deleteCommentFlag, setDeleteCommentFlag] = useState(false);
    const [updateCommentFlag, setUpdateCommentFlag] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setShowMenuComment(false);
        setDeleteCommentFlag(false);
        setUpdateCommentFlag(false);
    }, [comments]);

    if (!showMenuComment) return null;

    const handleClose = () => {
        setShowMenuComment(false);
        setDeleteCommentFlag(false);
        setUpdateCommentFlag(false);
    };

    return (
        <div
            className="absolute w-screen h-screen left-0 top-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
            onMouseDown={handleClose}
        >
            {!deleteCommentFlag && !updateCommentFlag ? (
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
                                Report this comment
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
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-b-lg"
                                onClick={() => setShowMenuComment(false)}
                            >
                                Cancel
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-t-lg text-red-500"
                                onClick={() => setDeleteCommentFlag(true)}
                            >
                                <IoTrash /> Delete my comment
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer text-green-500"
                                onClick={() => setUpdateCommentFlag(true)}
                            >
                                <FaPencilAlt />
                                Edit my comment
                            </div>
                            <div className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer">
                                <IoStatsChart />
                                Show statistics of this comment
                            </div>
                            <div
                                className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-b-lg"
                                onClick={() => setShowMenuComment(false)}
                            >
                                Cancel
                            </div>
                        </>
                    )}
                </div>
            ) : deleteCommentFlag ? (
                <div
                    className="dark:bg-gray-900 flex flex-col gap-4 w-1/4 p-6 dark:text-white rounded-lg shadow dark:shadow-white"
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
                        Are you sure you want to delete this comment?
                    </div>
                    <div className="dark:text-gray-400 flex justify-center">
                        This action is irreversible
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <button
                            className="focus:outline-none w-3/5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            onClick={() => {
                                dispatch(deleteComment(commentId));
                                handleClose();
                            }}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <span>Delete</span>
                            </span>
                        </button>
                        <button
                            className="py-2.5 px-5 text-sm w-3/5 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            onClick={() => setDeleteCommentFlag(false)}
                        >
                            Decline
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default MenuComment;
