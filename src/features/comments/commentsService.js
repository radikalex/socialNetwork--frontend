import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

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

const updateComment = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const body = {
        content: data.content,
        date: new Date(),
    };

    const res = await axios.put(API_URL + `/comments/${data._id}`, body, {
        headers: { authorization: token },
    });

    return res.data;
};

const deleteComment = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.delete(API_URL + `/comments/${_id}`, {
        headers: { authorization: token },
    });

    return res.data;
};

const getComments = async (data) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.get(
        API_URL +
            `/comments/${data._id}?page=${data.page}&limit=5&date=${data.date}`,
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const likeComment = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.put(
        API_URL + `/comments/giveLike/${_id}`,
        {},
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const removeLikeComment = async (_id) => {
    const token = JSON.parse(localStorage.getItem("token"));

    const res = await axios.put(
        API_URL + `/comments/removeLike/${_id}`,
        {},
        {
            headers: { authorization: token },
        }
    );

    return res.data;
};

const commentsService = {
    createComment,
    updateComment,
    deleteComment,
    getComments,
    likeComment,
    removeLikeComment,
};

export default commentsService;
