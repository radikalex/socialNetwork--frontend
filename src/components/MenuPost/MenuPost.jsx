import React from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IoStatsChart, IoTrash } from "react-icons/io5";
import { useSelector } from "react-redux";

const MenuPost = ({ username, showMenuPost, setShowMenuPost, postId }) => {
    const { user } = useSelector((state) => state.auth);

    if (!showMenuPost) return null;

    const handleClose = () => {
        setShowMenuPost(false);
    };

    return (
        <div
            className="absolute w-screen h-screen left-0 top-0 bg-black bg-opacity-50 z-20 flex justify-center items-center"
            onMouseDown={handleClose}
        >
            <div
                className="dark:bg-gray-900 flex flex-col w-1/4 dark:text-white rounded-lg shadow dark:shadow-white"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >
                {!user || user.username !== username ? (
                    <>
                        <div className="p-4 flex justify-center dark:hover:bg-gray-800 cursor-pointer rounded-t-lg">
                            Report this post
                        </div>
                        <div className="p-4 flex justify-center dark:hover:bg-gray-800 cursor-pointer rounded-b-lg">
                            Block @{username}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-t-lg text-red-500">
                            <IoTrash /> Delete my post
                        </div>
                        <div className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer text-green-500">
                            <FaPencilAlt />
                            Edit my post
                        </div>
                        <div className="p-4 flex justify-center items-center gap-2 dark:hover:bg-gray-800 cursor-pointer rounded-b-lg">
                            <IoStatsChart />
                            Show statistics of this post
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MenuPost;
