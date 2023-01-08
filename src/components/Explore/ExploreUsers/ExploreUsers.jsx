import React from "react";
import { BsFillPersonDashFill, BsFillPersonPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    followExplore,
    unfollowExplore,
} from "../../../features/users/usersSlice";

const ExploreUsers = () => {
    const { users } = useSelector((state) => state.users);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const alreadyFollowing = (userFollower, userFollowing) => {
        if (!userFollower || !userFollowing) return false;
        const followersIds = userFollowing.followers.map(
            (follower) => follower._id
        );
        return followersIds.includes(userFollower._id);
    };

    const userList = users.map((userItem, i) => {
        return (
            <div
                key={i}
                className="flex gap-4 rounded-lg dark:bg-gray-800 px-4 py-2 w-3/4 mt-4"
            >
                <div className="flex flex-col items-center justify-center">
                    <img
                        className="w-14 h-14 rounded-full hover:opacity-80 cursor-pointer"
                        src={"http://localhost:8080/" + userItem.user_img}
                        alt="Profile pic"
                        onClick={(e) => {
                            navigate(`/profile/${userItem.username}`);
                        }}
                    />
                </div>
                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex gap-3 items-center">
                        <span
                            className=" text-gray-900 dark:text-white font-bold hover:underline hover:underline-offset-2 cursor-pointer"
                            onClick={(e) => {
                                navigate(`/profile/${userItem.username}`);
                            }}
                        >
                            {userItem.firstName + " " + userItem.lastName}
                        </span>
                        <span
                            className=" text-gray-900 dark:text-gray-400 hover:underline hover:underline-offset-2 cursor-pointer"
                            onClick={(e) => {
                                navigate(`/profile/${userItem.username}`);
                            }}
                        >
                            @{userItem.username}
                        </span>
                        <div className="flex flex-row-reverse items-center flex-1 gap-4 relative">
                            {user &&
                            userItem &&
                            userItem.username !== user.username ? (
                                alreadyFollowing(user, userItem) ? (
                                    <button
                                        type="button"
                                        className="text-gray-900 text-xs bg-white border flex items-center justify-center gap-2 border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        onClick={() =>
                                            dispatch(
                                                unfollowExplore(userItem._id)
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
                                                followExplore(userItem._id)
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
                    <div>{userItem.bio}</div>
                </div>
            </div>
        );
    });

    return <>{userList}</>;
};

export default ExploreUsers;
