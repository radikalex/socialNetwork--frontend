import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { HiOutlineLink } from "react-icons/hi2";
import { IoClose, IoImage } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAddPost, createPost } from "../../features/posts/postsSlice";

const AddPost = () => {
    const { showModalAddPost } = useSelector((state) => state.posts);
    const [content, setContent] = useState("");
    const dispatch = useDispatch();

    const handleClose = () => {
        setContent("");
        dispatch(closeModalAddPost());
    };

    const handlePublishPost = () => {
        if (content === "") {
        } else {
            dispatch(createPost({ content, image: null }));
            setContent("");
            dispatch(closeModalAddPost());
        }
    };

    if (!showModalAddPost) {
        return null;
    }

    return (
        <div
            id="modal-overlay"
            className="fixed w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center"
            onClick={handleClose}
        >
            <div
                id="modal-container"
                className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-3xl w-2/3"
                onClick={(e) => e.stopPropagation()}
            >
                <form>
                    <div
                        id="modal-header"
                        className="p-4 relative flex justify-center"
                    >
                        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Add a new post
                        </span>
                        <IoClose
                            onClick={handleClose}
                            className="absolute cursor-pointer right-0 top-0 m-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        />
                    </div>
                    <div id="modal-content" className="p-4">
                        <div className="w-full border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x dark:divide-gray-600">
                                    <div className="flex items-center space-x-1 sm:pr-4">
                                        <button
                                            type="button"
                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                        >
                                            <HiOutlineLink />
                                        </button>
                                        <button
                                            type="button"
                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                        >
                                            <IoImage />
                                        </button>
                                        <button
                                            type="button"
                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                        >
                                            <BsEmojiSmileFill />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                <textarea
                                    id="editor"
                                    rows="8"
                                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 whitespace-pre-wrap"
                                    placeholder="Write a post..."
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div
                        id="modal-footer"
                        className="p-4 flex flex-row-reverse"
                    >
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                            onClick={handlePublishPost}
                        >
                            Publish post
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={handleClose}
                        >
                            Decline
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPost;
