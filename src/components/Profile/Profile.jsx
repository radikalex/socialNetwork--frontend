/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetComments } from "../../features/comments/commentsSlice";
import { reset } from "../../features/posts/postsSlice";

const Profile = () => {
    const { username } = useParams();
    const [reseted, setReseted] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetComments());
        dispatch(reset());
        setReseted(true);
    }, []);

    useEffect(() => {
        if (reseted) {
        }
    }, [reseted]);

    return <div></div>;
};

export default Profile;
