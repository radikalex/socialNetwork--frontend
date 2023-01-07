/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiEnvelope } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { resetComments } from "../../features/comments/commentsSlice";
import { reset } from "../../features/posts/postsSlice";
import { getUserProfile } from "../../features/users/usersSlice";
import "./Profile.scss";

const Profile = () => {
    const { username } = useParams();
    const [reseted, setReseted] = useState(false);
    const { userProfile } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resetComments());
        dispatch(reset());
        setReseted(true);
    }, []);

    useEffect(() => {
        if (reseted) {
            dispatch(getUserProfile(username));
        }
    }, [reseted]);

    if (!userProfile) return null;

    return (
        <div className="flex-1 flex flex-col items-center dark:text-white">
            <div className="w-3/5 bg-gray-800 flex p-4 rounded-b-lg">
                <div className="flex justify-center items-center p-10">
                    <img
                        className="w-36 h-36 rounded-full"
                        src={"http://localhost:8080/" + userProfile.user_img}
                        alt="Profile pic"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-4 pt-4">
                    <div className="flex items-center">
                        <div className="flex gap-2 text-xl font-bold">
                            <span>{userProfile.username}</span>
                        </div>
                        <div className="flex-1 flex flex-row-reverse gap-2">
                            <button
                                type="button"
                                class="text-gray-900 bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                                <HiEnvelope className="text-lg" />
                                Send message
                            </button>
                            <button
                                type="button"
                                class="text-gray-900 bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            >
                                <BsFillPersonPlusFill className="text-lg" />
                                Follow
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-around">
                        <span className="hover:underline cursor-pointer hover:underline-offset-2">
                            {userProfile.postIds.length}{" "}
                            {userProfile.postIds.length === 1
                                ? "post"
                                : "posts"}
                        </span>
                        <span className="hover:underline cursor-pointer hover:underline-offset-2">
                            {userProfile.followers.length}{" "}
                            {userProfile.followers.length === 1
                                ? "follower"
                                : "followers"}
                        </span>
                        <span className="hover:underline cursor-pointer hover:underline-offset-2">
                            {userProfile.following.length} {"following"}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="font-bold">
                            {userProfile.firstName + " " + userProfile.lastName}
                        </span>
                        <span className="text-gray-900 dark:text-white whitespace-pre-wrap text-sm">
                            {userProfile.bio}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
