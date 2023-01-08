import axios from "axios";

const API_URL = "http://localhost:8080";

const getUserProfile = async (username) => {
    const res = await axios.get(
        API_URL + `/users/getUserByUsername/${username}`
    );

    return res.data;
};

const follow = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.put(
        API_URL + `/users/follow/${_id}`,
        {},
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const updateLoggedUser = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("firstName", data.firstName);
    if (data.image) formData.append("user_img", data.image);
    if (data.lastName !== "") formData.append("lastName", data.lastName);

    const res = await axios.put(API_URL + `/users/updateLoggedUser`, formData, {
        headers: { authorization: token },
    });

    return res.data;
};

const unfollow = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.put(
        API_URL + `/users/unfollow/${_id}`,
        {},
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const usersService = {
    getUserProfile,
    follow,
    unfollow,
    updateLoggedUser,
};

export default usersService;
