/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import { reset } from "../../../features/posts/postsSlice";

const ModalLogout = ({ showModalLogout, setShowModalLogout }) => {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClose = () => {
        setShowModalLogout(false);
    };

    useEffect(() => {
        if (!token) {
            dispatch(reset());
            setShowModalLogout(false);
            navigate("/login");
        }
    }, [token]);

    if (!showModalLogout) {
        return null;
    }

    return (
        <div
            id="modalLogout-overlay"
            className="fixed w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center"
            onClick={handleClose}
        >
            <div
                id="modalLogout-container"
                className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-3xl w-1/2"
                onClick={(e) => e.stopPropagation()}
            >
                <form>
                    <div
                        id="modalLogout-header"
                        className="p-4 relative flex justify-center"
                    >
                        <IoClose
                            onClick={handleClose}
                            className="absolute cursor-pointer right-0 top-0 m-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        />
                    </div>
                    <div id="modalLogout-content" className="p-4">
                        <svg
                            aria-hidden="true"
                            className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
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
                        <div className="flex justify-center">
                            <span className="text-2xl font-normal text-gray-500 dark:text-gray-400">
                                Are you sure you want to log out?
                            </span>
                        </div>
                    </div>
                    <div
                        id="modalLogout-footer"
                        className="p-4 flex justify-center"
                    >
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80"
                            onClick={() => dispatch(logout())}
                        >
                            Yes, I'm sure
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-slate-400 via-slate-500 to-slate-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={handleClose}
                        >
                            No, cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalLogout;
