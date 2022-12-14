/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from "react";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { HiBell, HiTable } from "react-icons/hi";
import { HiEnvelope, HiUser } from "react-icons/hi2";
import {
    IoAddCircleOutline,
    IoHomeSharp,
    IoMenu,
    IoSearchSharp,
    IoSettingsSharp,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../features/auth/authSlice";
import { openModalAddPost } from "../../features/posts/postsSlice";
import "./Header.scss";
import ModalLogout from "./ModalLogout/ModalLogout";

const Header = () => {
    const { token, user } = useSelector((state) => state.auth);
    const [open, setOpen] = useState(true);
    const [showModalLogout, setShowModalLogout] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sidebar = useRef();

    const collapseSidebarHandler = () => {
        setOpen(!open);
        if (open) {
            sidebar.current.classList.add("closed");
        } else {
            sidebar.current.classList.remove("closed");
        }
    };

    const closeSidebar = () => {
        setOpen(false);
        sidebar.current.classList.add("closed");
    };

    useEffect(() => {
        if (token) dispatch(getLoggedUser());
    }, [token]);

    return (
        <>
            <ModalLogout
                showModalLogout={showModalLogout}
                setShowModalLogout={setShowModalLogout}
            />
            <aside
                className="fixed z-10 sidebar"
                aria-label="Sidebar"
                ref={sidebar}
            >
                <div
                    className={
                        "overflow-y-auto overflow-x-hidden py-4 px-3 h-screen bg-gray-300 rounded dark:bg-gray-800 flex flex-col"
                    }
                >
                    <div
                        className={
                            open
                                ? "flex justify-end mt-2 px-4"
                                : "flex justify-center mt-2"
                        }
                    >
                        <span
                            className="cursor-pointer text-gray-900 dark:text-white flex items-center justify-center rounded-lg p-2 dark:hover:bg-gray-700 hover:bg-gray-200"
                            onClick={collapseSidebarHandler}
                        >
                            <IoMenu />
                        </span>
                    </div>
                    <a
                        href=""
                        className="flex items-center mb-5 mt-10 justify-center gap-3"
                    >
                        <img
                            src={require("../../assets/logo.png")}
                            className={open ? "h-12" : "h-7"}
                            alt="Nyrma Logo"
                        />
                        {open ? (
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                Nyrma
                            </span>
                        ) : null}
                    </a>
                    <ul className="flex flex-col gap-4 justify-center mt-10">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <IoHomeSharp />
                                {open ? (
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Home
                                    </span>
                                ) : null}
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/explore"
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                                <IoSearchSharp />
                                {open ? (
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Explore
                                    </span>
                                ) : null}
                            </Link>
                        </li>
                        {token ? (
                            <li>
                                <Link className="flex items-center p-2 relative text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <HiBell />
                                    {open ? (
                                        <>
                                            <span className="flex-1 ml-3 whitespace-nowrap">
                                                Notifications
                                            </span>
                                            <span className="inline-flex justify-center items-center p-3 ml-3 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                                3
                                            </span>
                                        </>
                                    ) : (
                                        <span className="inline-flex absolute top-0 right-1 justify-center items-center p-2 w-3 h-3 text-sm font-medium text-blue-600 bg-blue-200 rounded-full dark:bg-blue-900 dark:text-blue-200">
                                            3
                                        </span>
                                    )}
                                </Link>
                            </li>
                        ) : null}
                        {token ? (
                            <li>
                                <Link className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                                    <HiEnvelope />
                                    {open ? (
                                        <span className="flex-1 ml-3 whitespace-nowrap">
                                            Messages
                                        </span>
                                    ) : null}
                                </Link>
                            </li>
                        ) : null}
                        {token ? (
                            <li>
                                <span
                                    onClick={() =>
                                        navigate(`/profile/${user.username}`)
                                    }
                                    className="flex items-center cursor-pointer p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <HiUser />
                                    {open ? (
                                        <span className="flex-1 ml-3 whitespace-nowrap">
                                            Profile {}
                                        </span>
                                    ) : null}
                                </span>
                            </li>
                        ) : null}
                        {token ? (
                            <li>
                                <span
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => dispatch(openModalAddPost())}
                                >
                                    <IoAddCircleOutline />
                                    {open ? (
                                        <span className="flex-1 ml-3 whitespace-nowrap">
                                            Add a new post
                                        </span>
                                    ) : null}
                                </span>
                            </li>
                        ) : null}
                        {token ? (
                            <li>
                                <span
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => {
                                        setShowModalLogout(true);
                                    }}
                                >
                                    <BiLogOutCircle />
                                    {open ? (
                                        <span className="flex-1 ml-3 whitespace-nowrap">
                                            Log out
                                        </span>
                                    ) : null}
                                </span>
                            </li>
                        ) : null}
                        {!token ? (
                            <li>
                                <Link
                                    to="/login"
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                                    onClick={closeSidebar}
                                >
                                    <BiLogInCircle />
                                    {open ? (
                                        <span className="flex-1 ml-3 whitespace-nowrap">
                                            Log in
                                        </span>
                                    ) : null}
                                </Link>
                            </li>
                        ) : null}
                        {!token ? (
                            <li>
                                <Link
                                    to="/register"
                                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                                    onClick={closeSidebar}
                                >
                                    <HiTable />
                                    {open ? (
                                        <span className="flex-1 ml-3 whitespace-nowrap">
                                            Register
                                        </span>
                                    ) : null}
                                </Link>
                            </li>
                        ) : null}
                        <li>
                            <Link className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                                <IoSettingsSharp />
                                {open ? (
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Settings
                                    </span>
                                ) : null}
                            </Link>
                        </li>
                    </ul>
                    {user ? (
                        <div className="flex flex-col-reverse items-center flex-1 overflow-x-hidden">
                            <div className="flex gap-2 py-5">
                                <div className="flex flex-col justify-center">
                                    <img
                                        className={
                                            open
                                                ? "w-10 h-10 rounded-full"
                                                : "w-6 h-6 rounded-full"
                                        }
                                        src={
                                            process.env.REACT_APP_API_URL +
                                            "/" +
                                            user.user_img
                                        }
                                        alt="Profile pic"
                                    />
                                </div>
                                {open ? (
                                    <div className="flex flex-col whitespace-nowrap overflow-hidden">
                                        <span className=" text-gray-900 dark:text-white font-bold ">
                                            {user.firstName +
                                                " " +
                                                user.lastName}
                                        </span>
                                        <span className=" text-gray-900 dark:text-gray-400">
                                            @{user.username}
                                        </span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            </aside>
        </>
    );
};

export default Header;
