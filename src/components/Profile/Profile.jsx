/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import { FaPencilAlt } from "react-icons/fa";
import { HiEnvelope } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { resetComments } from "../../features/comments/commentsSlice";
import { reset } from "../../features/posts/postsSlice";
import {
    follow,
    getUserProfile,
    unfollow,
} from "../../features/users/usersSlice";
import ModalUpdateProfile from "./ModalUpdateProfile/ModalUpdateProfile";
import "./Profile.scss";
import ProfileContainers from "./ProfileContainers/ProfileContainers";

const Profile = () => {
    const { username } = useParams();
    const [reseted, setReseted] = useState(false);
    const [showModalUpdateProfile, setShowModalUpdateProfile] = useState(false);
    const { userProfile } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);
    const [containers, SetContainers] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(resetComments());
        dispatch(reset());
        setReseted(true);
    }, []);

    const alreadyFollowing = (userFollower, userFollowing) => {
        if (!userFollower || !userFollowing) return false;
        const followersIds = userFollowing.followers.map(
            (follower) => follower._id
        );
        return followersIds.includes(userFollower._id);
    };

    useEffect(() => {
        if (reseted) {
            dispatch(getUserProfile(username));
        }
    }, [reseted]);

    useEffect(() => {
        dispatch(getUserProfile(username));
    }, [username]);

    if (!userProfile) return null;

    return (
        <>
            <ModalUpdateProfile
                showModalUpdateProfile={showModalUpdateProfile}
                setShowModalUpdateProfile={setShowModalUpdateProfile}
            />
            <div className="flex-1 flex flex-col gap-4 items-center dark:text-white">
                <div className="w-3/5 bg-gray-800 flex p-4 rounded-b-lg">
                    <div className="flex justify-center items-center p-10">
                        <img
                            className="w-36 h-36 rounded-full"
                            src={
                                "http://localhost:8080/" + userProfile.user_img
                            }
                            alt="Profile pic"
                        />
                    </div>
                    <div className="flex-1 flex flex-col gap-4 pt-4">
                        <div className="flex items-center">
                            <div className="flex gap-2 text-xl font-bold">
                                <span>{userProfile.username}</span>
                            </div>
                            <div className="flex-1 flex flex-row-reverse gap-2 pr-4">
                                {user &&
                                userProfile &&
                                user.username !== userProfile.username ? (
                                    <>
                                        <button
                                            type="button"
                                            className="text-gray-900 bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        >
                                            <HiEnvelope className="text-lg" />
                                            Send message
                                        </button>
                                        {alreadyFollowing(user, userProfile) ? (
                                            <button
                                                type="button"
                                                className="text-gray-900 bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                onClick={() =>
                                                    dispatch(
                                                        unfollow(
                                                            userProfile._id
                                                        )
                                                    )
                                                }
                                            >
                                                <BsFillPersonDashFill className="text-lg" />
                                                Stop following
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="text-gray-900 bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                onClick={() =>
                                                    dispatch(
                                                        follow(userProfile._id)
                                                    )
                                                }
                                            >
                                                <BsFillPersonPlusFill className="text-lg" />
                                                Follow
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            className="text-gray-900 bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            onClick={() =>
                                                setShowModalUpdateProfile(true)
                                            }
                                        >
                                            <FaPencilAlt />
                                            Edit my profile
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-around">
                            <span className="hover:underline cursor-pointer hover:underline-offset-2">
                                {userProfile.postIds.length}{" "}
                                {userProfile.postIds.length === 1
                                    ? "post"
                                    : "posts"}
                            </span>
                            <span
                                className="hover:underline cursor-pointer hover:underline-offset-2"
                                onClick={() => {
                                    navigate(
                                        `/profile/${userProfile.username}/followers`
                                    );
                                }}
                            >
                                {userProfile.followers.length}{" "}
                                {userProfile.followers.length === 1
                                    ? "follower"
                                    : "followers"}
                            </span>
                            <span
                                className="hover:underline cursor-pointer hover:underline-offset-2"
                                onClick={() => {
                                    navigate(
                                        `/profile/${userProfile.username}/following`
                                    );
                                }}
                            >
                                {userProfile.following.length} {"following"}
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-bold">
                                {userProfile.firstName +
                                    " " +
                                    userProfile.lastName}
                            </span>
                            <span className="text-gray-900 dark:text-white whitespace-pre-wrap text-sm">
                                {userProfile.bio}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-3/5 bg-gray-800 flex rounded-lg">
                    <div
                        className={
                            containers === 0
                                ? "flex-1 p-4 rounded-l-lg cursor-pointer flex justify-center items-center bg-slate-600"
                                : "flex-1 p-4 rounded-l-lg cursor-pointer flex justify-center items-center"
                        }
                        onClick={() => SetContainers(0)}
                    >
                        Posts
                    </div>
                    <div
                        className={
                            containers === 1
                                ? "flex-1 p-4 rounded-r-lg flex justify-center items-center cursor-pointer bg-slate-600"
                                : "flex-1 p-4 rounded-r-lg flex justify-center items-center cursor-pointer"
                        }
                        onClick={() => SetContainers(1)}
                    >
                        Likes
                    </div>
                </div>

                <ProfileContainers containers={containers} />
            </div>
            <Outlet />
        </>
    );
};

export default Profile;
