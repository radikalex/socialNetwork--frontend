/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
    followFollower,
    followFollowing,
    getUserProfile,
    unfollowFollower,
    unfollowFollowing,
} from "../../../features/users/usersSlice";

const ModalFollow = () => {
    const { userProfile } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const alreadyFollowing = (userFollower, userFollowing) => {
        if (!userFollower || !userFollowing) return false;
        return userFollowing.followers.includes(userFollower._id);
    };

    useEffect(() => {
        dispatch(getUserProfile(username));
    }, [username]);

    const handleClose = () => {
        navigate(`/profile/${userProfile.username}`);
    };

    if (!userProfile) return null;

    const followersList = userProfile?.followers.map((follower, i) => {
        return (
            <div
                key={i}
                className="flex gap-4 rounded-lg dark:bg-gray-800 px-4 py-2"
            >
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-14 h-14 rounded-full hover:opacity-80 cursor-pointer"
                        src={process.env.REACT_APP_API_URL + follower.user_img}
                        alt="Profile pic"
                        onClick={(e) => {
                            navigate(`/profile/${follower.username}`);
                        }}
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex gap-3 items-center">
                        <span
                            className=" text-gray-900 dark:text-white font-bold hover:underline hover:underline-offset-2 cursor-pointer"
                            onClick={(e) => {
                                navigate(`/profile/${follower.username}`);
                            }}
                        >
                            {follower.firstName + " " + follower.lastName}
                        </span>
                        <span
                            className=" text-gray-900 dark:text-gray-400 hover:underline hover:underline-offset-2 cursor-pointer"
                            onClick={(e) => {
                                navigate(`/profile/${follower.username}`);
                            }}
                        >
                            @{follower.username}
                        </span>
                        <div className="flex flex-row-reverse items-center flex-1 gap-4 relative">
                            {user &&
                            follower &&
                            follower.username !== user.username ? (
                                alreadyFollowing(user, follower) ? (
                                    <button
                                        type="button"
                                        className="text-gray-900 text-xs bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        onClick={() =>
                                            dispatch(
                                                unfollowFollower(follower._id)
                                            )
                                        }
                                    >
                                        <BsFillPersonDashFill className="text-base" />
                                        Stop following
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="text-gray-900 text-xs bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        onClick={() =>
                                            dispatch(
                                                followFollower(follower._id)
                                            )
                                        }
                                    >
                                        <BsFillPersonPlusFill className="text-base" />
                                        Follow
                                    </button>
                                )
                            ) : null}
                        </div>
                    </div>
                    <div>{follower.bio}</div>
                </div>
            </div>
        );
    });

    const followingList = userProfile?.following.map((following, i) => {
        return (
            <div
                key={i}
                className="flex gap-4 rounded-lg dark:bg-gray-800 px-4 py-2"
            >
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-14 h-14 rounded-full hover:opacity-80 cursor-pointer"
                        src={process.env.REACT_APP_API_URL + following.user_img}
                        alt="Profile pic"
                        onClick={(e) => {
                            navigate(`/profile/${following.username}`);
                        }}
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex gap-3 items-center">
                        <span
                            className=" text-gray-900 dark:text-white font-bold hover:underline hover:underline-offset-2 cursor-pointer"
                            onClick={(e) => {
                                navigate(`/profile/${following.username}`);
                            }}
                        >
                            {following.firstName + " " + following.lastName}
                        </span>
                        <span
                            className=" text-gray-900 dark:text-gray-400 hover:underline hover:underline-offset-2 cursor-pointer"
                            onClick={(e) => {
                                navigate(`/profile/${following.username}`);
                            }}
                        >
                            @{following.username}
                        </span>
                        <div className="flex flex-row-reverse items-center flex-1 gap-4 relative">
                            {user &&
                            following &&
                            following.username !== user.username ? (
                                alreadyFollowing(user, following) ? (
                                    <button
                                        type="button"
                                        className="text-gray-900 text-xs bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        onClick={() =>
                                            dispatch(
                                                unfollowFollowing(following._id)
                                            )
                                        }
                                    >
                                        <BsFillPersonDashFill className="text-base" />
                                        Stop following
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="text-gray-900 text-xs bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        onClick={() =>
                                            dispatch(
                                                followFollowing(following._id)
                                            )
                                        }
                                    >
                                        <BsFillPersonPlusFill className="text-base" />
                                        Follow
                                    </button>
                                )
                            ) : null}
                        </div>
                    </div>
                    <div>{following.bio}</div>
                </div>
            </div>
        );
    });

    return (
        <>
            <div
                id="modal-overlay"
                className="fixed w-full h-full bg-black bg-opacity-50 z-20 flex justify-center items-center"
                onMouseDown={handleClose}
            >
                <div
                    id="modal-container"
                    className="relative bg-white rounded-lg dark:bg-gray-900 max-w-3xl w-2/3 overflow-y-auto shadow dark:shadow-white dark:text-white"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div
                        id="modal-header"
                        className="p-4 relative flex justify-center"
                    >
                        <span className="text-2xl font-semibold text-gray-900 dark:text-white">
                            {/followers/.test(location.pathname)
                                ? `Users that follow ${userProfile.username}`
                                : `Users that ${userProfile.username} follows`}
                        </span>
                        <IoClose
                            onMouseDown={handleClose}
                            className="absolute cursor-pointer right-0 top-0 m-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-2xl ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        />
                    </div>
                    <div
                        id="modal-content"
                        className="p-4 divContentAddPost overflow-auto scrollbar-hide"
                    >
                        <div className="flex flex-col gap-2 justify-center p-4">
                            {/followers/.test(location.pathname) ? (
                                <>
                                    {userProfile.followers.length ? (
                                        <>{followersList}</>
                                    ) : (
                                        <span className="text-center">
                                            {userProfile.username} no have
                                            followers
                                        </span>
                                    )}
                                </>
                            ) : (
                                <>
                                    {userProfile.following.length ? (
                                        <>{followingList}</>
                                    ) : (
                                        <span className="text-center">
                                            {userProfile.username} no follows
                                            any user
                                        </span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalFollow;
