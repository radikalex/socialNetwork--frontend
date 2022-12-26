import axios from "axios";

const API_URL = "http://localhost:8080";

const getPosts = async (page) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.get(
        API_URL + `/posts/getPosts?page=${page}&limit=5`,
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const getAllPosts = async (page) => {
    const res = await axios.get(
        API_URL + `/posts/getAllPosts?page=${page}&limit=5`
    );

    return res.data;
};

const postsService = {
    getPosts,
    getAllPosts,
};

export default postsService;
