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

const commentsService = {
    createComment,
    getComments,
};

export default commentsService;
