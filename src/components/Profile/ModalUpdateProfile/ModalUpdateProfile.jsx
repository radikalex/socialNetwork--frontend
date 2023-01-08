/* eslint-disable react-hooks/exhaustive-deps */
import { Label, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
    resetUsersFlags,
    updateLoggedUser,
} from "../../../features/users/usersSlice";

const ModalUpdateProfile = ({
    setShowModalUpdateProfile,
    showModalUpdateProfile,
}) => {
    const { userProfile, isLoading, isSuccess, isError, errorMessage } =
        useSelector((state) => state.users);
    const dispatch = useDispatch();
    const [file, setFile] = useState();
    const [data, setData] = useState({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        username: userProfile.username,
        bio: userProfile.bio,
    });
    const { firstName, lastName, username, bio } = data;
    const onChange = (e) => {
        if (isError) {
            dispatch(resetUsersFlags());
        }
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetUsersFlags());
            handleClose();
        }
    }, [isSuccess]);

    const handleUpdateProfile = () => {
        dispatch(updateLoggedUser({ ...data, image: file }));
    };

    const handleClose = () => {
        setShowModalUpdateProfile(false);
        setFile(undefined);
        setData({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            username: userProfile.username,
            bio: userProfile.bio,
        });
    };

    if (!showModalUpdateProfile) return null;

    return (
        <>
            <div
                id="modal-overlay"
                className="fixed w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center"
                onMouseDown={handleClose}
            >
                <div
                    id="modal-container"
                    className="relative bg-white rounded-lg dark:bg-gray-900 max-w-4xl w-9/12 overflow-y-auto shadow dark:shadow-white dark:text-white"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div
                        id="modal-header"
                        className="p-4 relative flex justify-center"
                    >
                        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                            Edit my profile
                        </span>
                        <IoClose
                            onMouseDown={handleClose}
                            className="absolute cursor-pointer right-0 top-0 m-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        />
                    </div>
                    <div
                        id="modal-content"
                        className="p-4 divContentAddPost overflow-auto scrollbar-hide"
                    >
                        <div className="px-10 flex flex-col gap-4">
                            <div className="flex justify-center items-center gap-6">
                                <div className="flex flex-col justify-center gap-4 items-center">
                                    <img
                                        className="w-32 h-32 rounded-full"
                                        src={
                                            file
                                                ? URL.createObjectURL(file)
                                                : "http://localhost:8080/" +
                                                  userProfile.user_img
                                        }
                                        alt="Profile pic"
                                    />
                                    <label
                                        htmlFor="user-file"
                                        className="cursor-pointer"
                                    >
                                        <span
                                            type="file"
                                            className="text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                        >
                                            Change
                                        </span>

                                        <input
                                            type="file"
                                            id="user-file"
                                            accept="image/png, image/jpg, image/jpeg"
                                            className="hidden"
                                            onChange={(e) => {
                                                dispatch(resetUsersFlags());
                                                setFile(e.target.files[0]);
                                            }}
                                        />
                                    </label>
                                </div>
                                <div className="flex-1">
                                    <form className="flex flex-1 flex-col gap-4 w-full justify-center">
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <div className="mb-2 block">
                                                    <Label
                                                        htmlFor="firstname"
                                                        className="required"
                                                        value="First name"
                                                    />
                                                </div>
                                                <input
                                                    id="firstname"
                                                    autoComplete="off"
                                                    type="text"
                                                    name="firstName"
                                                    value={firstName}
                                                    onChange={onChange}
                                                    placeholder="Introduce your first name..."
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <div className="mb-2 block">
                                                    <Label
                                                        htmlFor="lastname"
                                                        value="Last name"
                                                    />
                                                </div>
                                                <input
                                                    id="lastname"
                                                    autoComplete="off"
                                                    type="text"
                                                    name="lastName"
                                                    value={lastName}
                                                    onChange={onChange}
                                                    placeholder="Introduce your last name..."
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <div className="mb-2 block">
                                                    <Label
                                                        htmlFor="username"
                                                        className="required"
                                                        value="Username"
                                                    />
                                                </div>
                                                <input
                                                    id="username"
                                                    autoComplete="off"
                                                    type="text"
                                                    name="username"
                                                    value={username}
                                                    onChange={onChange}
                                                    placeholder="Introduce your username..."
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="message"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Bio:
                                </label>
                                <textarea
                                    id="message"
                                    value={bio}
                                    name="bio"
                                    onChange={onChange}
                                    rows="8"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Introduce a bio..."
                                ></textarea>
                            </div>
                            {isError ? (
                                <div className="flex justify-center">
                                    <span className="text-red-600 dark:text-red-500 flex justify-center gap-2 items-center">
                                        <svg
                                            aria-hidden="true"
                                            className="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800"
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
                                        {errorMessage}
                                    </span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="p-4 flex flex-row-reverse">
                        <button
                            type="button"
                            className="text-white disabled:opacity-75 bg-gradient-to-r flex items-center justify-center gap-2 from-green-500 via-green-600 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                            onClick={handleUpdateProfile}
                            disabled={isLoading ? true : false}
                        >
                            {isLoading ? (
                                <Spinner aria-label="Spinner button example" />
                            ) : null}
                            Save
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalUpdateProfile;
