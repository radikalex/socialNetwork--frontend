import { Button, Label, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register, reset } from "../../../features/auth/authSlice";
import "./FormRegister.scss";

const FormRegister = () => {
    const navigate = useNavigate();
    const { isError, errorMessage, isSuccess, isLoading } = useSelector(
        (state) => state.auth
    );
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const { firstName, lastName, username, email, password, password2 } = data;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(reset());
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [isSuccess]);
    const onChange = (e) => {
        if (isError) {
            dispatch(reset());
        }
        setData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(register(data));
    };

    return (
        <div className="flex w-full bg-white dark:bg-slate-800">
            <form
                className="flex flex-1 flex-col gap-4 p-11 shadow-2xl w-full justify-center"
                onSubmit={onSubmit}
            >
                <div className="flex justify-center">
                    <span className="text-3xl font-bold dark:text-white">
                        Register
                    </span>
                </div>
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
                            <Label htmlFor="lastname" value="Last name" />
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
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                className="required"
                                value="Email"
                            />
                        </div>
                        <input
                            id="email1"
                            autoComplete="off"
                            type="text"
                            name="email"
                            value={email}
                            onChange={onChange}
                            placeholder="Introduce your email..."
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password1"
                            className="required"
                            value="Password"
                        />
                    </div>
                    <div className="relative flex items-center">
                        <input
                            id="password1"
                            type={"password"}
                            placeholder="Introduce your password..."
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password2"
                            className="required"
                            value="Repeat the password"
                        />
                    </div>
                    <div className="relative flex items-center">
                        <input
                            id="password2"
                            type={"password"}
                            placeholder="Repeat the password..."
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
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

                <div className="flex items-center justify-center">
                    <Button
                        className="w-1/2"
                        type="submit"
                        disabled={isLoading ? true : false}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {isLoading ? (
                                <Spinner aria-label="Spinner button example" />
                            ) : null}
                            <span>Create my account</span>
                        </span>
                    </Button>
                </div>
                <div className="flex justify-center">
                    <span className="dark:text-white">
                        Already have an account?{" "}
                        <Link
                            className="text-blue-700 dark:text-blue-500"
                            to="/login"
                        >
                            Log in here.{" "}
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default FormRegister;
