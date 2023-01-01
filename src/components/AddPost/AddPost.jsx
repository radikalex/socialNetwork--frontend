import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { HiOutlineLink } from "react-icons/hi2";
import { IoClose, IoImage } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModalAddPost, createPost } from "../../features/posts/postsSlice";
import "./AddPost.scss";

const AddPost = () => {
    const { showModalAddPost } = useSelector((state) => state.posts);
    const [content, setContent] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [file, setFile] = useState();
    const dispatch = useDispatch();

    const handleClose = () => {
        setContent("");
        setShowEmojiPicker(false);
        dispatch(closeModalAddPost());
    };

    const addEmoji = (emojiObject) => {
        console.log(emojiObject);
        setContent(content + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    const handlePublishPost = () => {
        if (content === "") {
        } else {
            dispatch(createPost({ content, image: file }));
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
            onMouseDown={handleClose}
        >
            <div
                id="modal-container"
                className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-3xl w-2/3 overflow-y-auto max-h-full"
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
                onClick={() => setShowEmojiPicker(false)}
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
                                    <div
                                        className="flex items-center space-x-1 relative sm:pr-4"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            type="button"
                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                        >
                                            <HiOutlineLink />
                                        </button>
                                        <label
                                            htmlFor="post-file"
                                            className="cursor-pointer"
                                        >
                                            <div className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                <IoImage />

                                                <input
                                                    type="file"
                                                    id="post-file"
                                                    accept="image/png, image/jpg, image/jpeg"
                                                    className="hidden"
                                                    onChange={(e) =>
                                                        setFile(
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                            </div>
                                        </label>
                                        <button
                                            type="button"
                                            className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                                            onClick={() =>
                                                setShowEmojiPicker(
                                                    !showEmojiPicker
                                                )
                                            }
                                        >
                                            <BsEmojiSmileFill />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <textarea
                                    id="editor"
                                    rows="8"
                                    className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 whitespace-pre-wrap"
                                    placeholder="Write a post..."
                                    value={content}
                                    onClick={() => setShowEmojiPicker(false)}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
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
                            <div className="flex justify-center items-center">
                                {file && (
                                    <>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt="Post img"
                                            className="w-2/5 m-4"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFile(undefined)}
                                            className="focus:outline-none h-1/4 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                        >
                                            <IoClose className="text-xl" />
                                        </button>
                                    </>
                                )}
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
                            className="text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
