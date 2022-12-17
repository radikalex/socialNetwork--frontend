import React from "react";
import FormRegister from "./FormRegister/FormRegister";

const Register = () => {
    return (
        <div className="flex justify-center items-center w-full">
            <div className="flex justify-center w-4/5 border-2 border-indigo-900 dark:border-gray-600 shadow-2xl">
                <div className="container-image flex shadow-2xl">
                    <img src={require("../../assets/bg1.jpg")} alt="" />
                </div>
                <div className="container-form flex shadow-2xl">
                    <FormRegister />
                </div>
            </div>
        </div>
    );
};

export default Register;
