/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { HiBell } from "react-icons/hi";
import { HiEnvelope, HiUser } from "react-icons/hi2";
import { IoHomeSharp, IoSearchSharp, IoSettingsSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import "./Header.scss";

const Header = () => {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(true);
    const sidebar = useRef();

    const collapseSidebarHandler = () => {
        setOpen(!open);
        if (open) {
            sidebar.current.classList.add("closed");
        } else {
            sidebar.current.classList.remove("closed");
        }
    };

    if (pathname === "/login" || pathname === "/register") return;
    return (
        <aside
            className="fixed z-10 sidebar"
            aria-label="Sidebar"
            ref={sidebar}
        >
            <div
                className={
                    "overflow-y-auto py-4 px-3 h-screen bg-gray-50 rounded dark:bg-gray-800"
                }
            >
                <a
                    href="https://flowbite.com/"
                    className="flex items-center mb-5 mt-10 justify-center gap-3"
                >
                    <img
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-6 sm:h-7"
                        alt="Flowbite Logo"
                    />
                    {open ? (
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                            Flowbite
                        </span>
                    ) : null}
                </a>
                <ul className="flex flex-col gap-4 justify-center">
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <IoHomeSharp />
                            {open ? (
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Home
                                </span>
                            ) : null}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <IoSearchSharp />
                            {open ? (
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Explore
                                </span>
                            ) : null}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
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
                            ) : null}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <HiEnvelope />
                            {open ? (
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Messages
                                </span>
                            ) : null}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <HiUser />
                            {open ? (
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Profile
                                </span>
                            ) : null}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <BiLogOutCircle />
                            {open ? (
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Log out
                                </span>
                            ) : null}
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <IoSettingsSharp />
                            {open ? (
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Settings
                                </span>
                            ) : null}
                        </a>
                    </li>
                    <li className="flex justify-center">
                        <button
                            className="bg-white p-2 rounded-lg"
                            onClick={collapseSidebarHandler}
                        >
                            Hide
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Header;
