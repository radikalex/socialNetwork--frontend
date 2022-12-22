import axios from "axios";

const API_URL = "http://localhost:8080";

const register = async (userData) => {
    const res = await axios.post(API_URL + "/users/", userData);
    return res.data;
};

const login = async (userData) => {
    const res = await axios.post(API_URL + "/users/login", userData);
    if (res.data.token) {
        localStorage.setItem("token", JSON.stringify(res.data.token));
    }
    return res.data;
};

const logout = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    const res = await axios.post(
        API_URL + "/users/logout",
        {},
        {
            headers: { authorization: token },
        }
    );
    if (res.data) {
        localStorage.removeItem("user");
    }
    return res.data;
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
