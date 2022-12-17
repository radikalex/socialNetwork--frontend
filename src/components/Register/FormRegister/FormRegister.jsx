import { Button, Label } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const FormRegister = () => {
    return (
        <div className="flex w-full bg-white dark:bg-slate-800">
            <form className="flex flex-1 flex-col gap-4 p-11 shadow-2xl w-full justify-center">
                <div className="flex justify-center">
                    <span className="text-3xl font-bold dark:text-white">
                        Register
                    </span>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="firstname" value="First name:" />
                        </div>
                        <input
                            id="firstname"
                            autoComplete="off"
                            type="text"
                            name="firstname"
                            placeholder="Introduce your first name..."
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                        />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="lastname" value="Last name:" />
                        </div>
                        <input
                            id="lastname"
                            autoComplete="off"
                            type="text"
                            name="lastname"
                            placeholder="Introduce your last name..."
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                        />
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="Username:" />
                        </div>
                        <input
                            id="username"
                            autoComplete="off"
                            type="text"
                            name="username"
                            placeholder="Introduce your username..."
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                        />
                    </div>
                    <div className="flex-1">
                        <div className="mb-2 block">
                            <Label htmlFor="email1" value="Email:" />
                        </div>
                        <input
                            id="email1"
                            autoComplete="off"
                            type="email"
                            name="email"
                            placeholder="Introduce your email..."
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password1" value="Password:" />
                    </div>
                    <div className="relative flex items-center">
                        <input
                            id="password1"
                            type={"password"}
                            placeholder="Introduce your password..."
                            name="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label
                            htmlFor="password2"
                            value="Repeat the password:"
                        />
                    </div>
                    <div className="relative flex items-center">
                        <input
                            id="password2"
                            type={"password"}
                            placeholder="Repeat the password..."
                            name="password2"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required={true}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="dark:text-white">
                        Already have an account?{" "}
                        <Link
                            className="text-blue-700 dark:text-blue-500"
                            to="/login"
                        >
                            Log in here.{" "}
                        </Link>
                    </span>
                    <Button className="w-1/4" type="submit">
                        <span className="flex items-center justify-center gap-2">
                            <span>Create my account</span>
                        </span>
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormRegister;
