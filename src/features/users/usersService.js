import axios from "axios";

const API_URL = "http://localhost:8080";

const getUserProfile = async (username) => {
    const res = await axios.get(
        API_URL + `/users/getUserByUsername/${username}`
    );

    return res.data;
};

const usersService = {
    getUserProfile,
};

export default usersService;
