import { Button, Checkbox, Label, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, reset } from "../../../features/auth/authSlice";

const FormLogin = () => {
    const navigate = useNavigate();
    const { isError, errorMessage, isSuccess, isLoading } = useSelector(
        (state) => state.auth
    );
    const [showPass, setShowPass] = useState(false);
    const [remember, setRemember] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = data;
    const dispatch = useDispatch();
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
        dispatch(login(data));
    };

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            navigate("/");
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    useEffect(() => {
        dispatch(reset());
        // eslint-disable-next-line
    }, []);

    return (
        <div className="flex justify-center w-full bg-white dark:bg-slate-800">
            <form
                className="flex flex-col gap-4 p-11 justify-center flex-1"
                onSubmit={onSubmit}
            >
                <div className="flex justify-center">
                    <span className="text-3xl font-bold dark:text-white">
                        Log in
                    </span>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email1" value="Your email" />
                    </div>
                    <input
                        id="email1"
                        autoComplete="off"
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Introduce your email..."
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Your password" />
                    </div>
                    <div className="relative flex items-center">
                        <span
                            className="absolute z-10 h-full flex items-center right-0 px-3 cursor-pointer"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? (
                                <svg
                                    className="w-6 h-6 dark:text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6 dark:text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            )}
                        </span>
                        <input
                            id="password1"
                            type={showPass ? "text" : "password"}
                            placeholder="Introduce your password..."
                            name="password"
                            value={password}
                            onChange={onChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remember"
                        name="remember"
                        onChange={() => setRemember(!remember)}
                        checked={remember}
                    />
                    <Label htmlFor="remember">Remember me</Label>
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
                        className="w-1/3"
                        type="submit"
                        disabled={isLoading ? true : false}
                    >
                        <span className="flex items-center justify-center gap-2">
                            {isLoading ? (
                                <Spinner aria-label="Spinner button example" />
                            ) : null}

                            <span>Log in</span>
                        </span>
                    </Button>
                </div>
                <div className="flex justify-center">
                    <span className="dark:text-white">
                        You don't have an account?{" "}
                        <Link
                            className="text-blue-700 dark:text-blue-500"
                            to="/register"
                        >
                            Register here.{" "}
                        </Link>
                    </span>
                </div>
            </form>
        </div>
    );
};

export default FormLogin;
