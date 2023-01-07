import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { HiOutlineLink } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../../features/comments/commentsSlice";

const AddComment = ({ showModalComment, setShowModalComment }) => {
    const { post } = useSelector((state) => state.posts);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [content, setContent] = useState("");
    const [validationError, setValidationError] = useState("");
    const dispatch = useDispatch();

    const handleClose = () => {
        setShowModalComment(false);
    };

    const handlePublishComment = (e) => {
        e.preventDefault();
        if (content === "") {
            setValidationError("Comment cant be empty. Write something");
        } else {
            dispatch(createComment({ content, post }));
            setContent("");
            setShowModalComment(false);
        }
    };

    const addEmoji = (emojiObject) => {
        setContent(content + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    if (!showModalComment) {
        return null;
    }

    return (
        <div
            id="modalComment-overlay"
            className="fixed w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center"
            onMouseDown={handleClose}
        >
            <div
                id="modalComment-container"
                className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-3xl w-1/2"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
                onClick={() => setShowEmojiPicker(false)}
            >
                <div
                    id="modalComment-header"
                    className="p-4 relative flex justify-center"
                >
                    <IoClose
                        onClick={handleClose}
                        className="absolute cursor-pointer right-0 top-0 m-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    />
                </div>
                <div id="modalComment-content" className="p-4">
                    <form onSubmit={handlePublishComment}>
                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                <label htmlFor="comment" className="sr-only">
                                    Your comment
                                </label>
                                <textarea
                                    id="comment"
                                    rows="6"
                                    value={content}
                                    onClick={() => setShowEmojiPicker(false)}
                                    onChange={(e) => {
                                        setValidationError("");
                                        setContent(e.target.value);
                                    }}
                                    className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 focus:outline-none"
                                    placeholder="Write a comment..."
                                ></textarea>
                                {showEmojiPicker && (
                                    <EmojiPicker
                                        onEmojiClick={addEmoji}
                                        theme="dark"
                                        height="400px"
                                        emojiStyle="native"
                                    />
                                )}
                            </div>
                            {validationError !== "" ? (
                                <div className="flex justify-center p-2">
                                    <span className="text-red-600 dark:text-red-500 flex justify-center gap-2 items-center">
                                        <svg
                                            aria-hidden="true"
                                            className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-600"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        {validationError}
                                    </span>
                                </div>
                            ) : null}
                            <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                <div
                                    className="flex pl-0 space-x-1 sm:pl-2"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        type="button"
                                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                    >
                                        <HiOutlineLink />
                                    </button>
                                    <button
                                        type="button"
                                        className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                        onClick={() =>
                                            setShowEmojiPicker(!showEmojiPicker)
                                        }
                                    >
                                        <BsEmojiSmileFill />
                                    </button>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                    >
                                        Post comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddComment;
