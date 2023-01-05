import axios from "axios";

const API_URL = "http://localhost:8080";

const createComment = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const body = {
        content: data.content,
        date: new Date(),
    };

    const res = await axios.post(API_URL + `/comments/${data.post._id}`, body, {
        headers: { authorization: token },
    });

    return res.data;
};

const createPost = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const formData = new FormData();
    formData.append("content", data.content);
    formData.append("date", new Date());
    if (data.image) formData.append("post_img", data.image);

    const res = await axios.post(API_URL + `/posts/`, formData, {
        headers: { authorization: token },
    });

    return res.data;
};

const getComments = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.get(
        API_URL +
            `/comments/${data.post._id}?page=${data.page}&limit=5&date=${data.date}`,
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const getPosts = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.get(
        API_URL + `/posts/getPosts?page=${data.page}&limit=5&date=${data.date}`,
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const getPost = async (data) => {
    const res = await axios.get(API_URL + `/posts/getPostById/${data._id}`);
    return res.data;
};

const getAllPosts = async (data) => {
    const res = await axios.get(
        API_URL +
            `/posts/getAllPosts?page=${data.page}&limit=5&date=${data.date}`
    );

    return res.data;
};

const likePost = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.put(
        API_URL + `/posts/giveLike/${_id}`,
        {},
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const removeLikePost = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.put(
        API_URL + `/posts/removeLike/${_id}`,
        {},
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const postsService = {
    createComment,
    getPosts,
    getComments,
    getAllPosts,
    likePost,
    removeLikePost,
    createPost,
    getPost,
};

export default postsService;
