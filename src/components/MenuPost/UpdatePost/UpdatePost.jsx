import EmojiPicker from "emoji-picker-react";
import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { HiOutlineLink } from "react-icons/hi2";
import { IoClose, IoImage } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../features/posts/postsSlice";

const UpdatePost = ({ setUpdatePostFlag, postId, oldContent, src }) => {
    const [content, setContent] = useState(oldContent);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [file, setFile] = useState();
    const [validationError, setValidationError] = useState("");
    const [srcImage, setSrcImage] = useState(src);
    const dispatch = useDispatch();

    const addEmoji = (emojiObject) => {
        setContent(content + emojiObject.emoji);
        setValidationError("");
        setShowEmojiPicker(false);
    };

    const handleUpdatePost = () => {
        if (content === "" && !file) {
            setValidationError("Write something or add an image for your post");
        } else {
            const image =
                !file && srcImage === "" ? "" : file ? file : undefined;
            dispatch(updatePost({ _id: postId, content, image }));
            setFile(undefined);
            setContent("");
            setSrcImage("");
        }
    };

    return (
        <div
            className="relative bg-white rounded-lg shadow dark:bg-gray-900 max-w-3xl w-2/3 overflow-y-auto max-h-full dark:shadow-white"
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
            onClick={() => setShowEmojiPicker(false)}
        >
            <div className="p-4 relative flex justify-center">
                <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                    Update your post
                </span>
            </div>
            <div className="p-4 divContentAddPost overflow-auto scrollbar-hide">
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
                                            onChange={(e) => {
                                                setFile(e.target.files[0]);
                                                setValidationError("");
                                            }}
                                        />
                                    </div>
                                </label>
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
                        </div>
                    </div>
                    <div
                        className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <textarea
                            id="editor"
                            rows="8"
                            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 whitespace-pre-wrap focus:outline-none"
                            placeholder="Write a post..."
                            value={content}
                            onClick={() => setShowEmojiPicker(false)}
                            onChange={(e) => {
                                setContent(e.target.value);
                                setValidationError("");
                            }}
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
                        {(file || srcImage !== "") && (
                            <div className="relative divImgAddPost m-4">
                                <img
                                    src={
                                        file
                                            ? URL.createObjectURL(file)
                                            : srcImage
                                    }
                                    alt="Post img"
                                    className="imgAddPost"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFile(undefined);
                                        setSrcImage("");
                                    }}
                                    className="absolute top-0 right-0 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded text-sm px-2 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >
                                    <IoClose className="text-xl" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {validationError !== "" ? (
                    <div className="flex justify-center pt-3">
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
            </div>
            <div className="p-4 flex flex-row-reverse">
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                    onClick={handleUpdatePost}
                >
                    Update post
                </button>
                <button
                    type="button"
                    className="text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={() => setUpdatePostFlag(false)}
                >
                    Decline
                </button>
            </div>
        </div>
    );
};

export default UpdatePost;
