/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getPostsQuery, reset } from "../../features/posts/postsSlice";
import { getUsersQuery } from "../../features/users/usersSlice";
import ExplorePosts from "./ExplorePosts/ExplorePosts";
import ExploreUsers from "./ExploreUsers/ExploreUsers";

const Explore = () => {
    const { date } = useSelector((state) => state.posts);
    const [search, setSearch] = useState("");
    const [searchType, setSearchType] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if (search !== "") {
            if (searchType === 0) dispatch(getPostsQuery({ search, date }));
            if (searchType === 1) dispatch(getUsersQuery(search));
        } else {
            dispatch(reset());
        }
    }, [search]);

    return (
        <div className="flex-1 flex flex-col gap-4 items-center dark:text-white">
            <div className="w-3/5 dark:bg-gray-800 bg-gray-200 flex flex-col gap-4 p-4 rounded-b-lg">
                <span className="text-center mt-2 text-3xl">Explore</span>
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="shadow-sm pr-14 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Search something..."
                        required
                    />
                    <IoSearchSharp className="absolute text-2xl right-0 m-4" />
                </div>
            </div>
            <div className="w-3/5 dark:bg-gray-800 bg-gray-200 flex rounded-lg">
                <div
                    className={
                        searchType === 0
                            ? "flex-1 p-4 rounded-l-lg cursor-pointer flex justify-center items-center dark:bg-slate-600 bg-gray-300"
                            : "flex-1 p-4 rounded-l-lg cursor-pointer flex justify-center items-center"
                    }
                    onClick={() => {
                        setSearchType(0);
                        setSearch("");
                    }}
                >
                    Search post
                </div>
                <div
                    className={
                        searchType === 1
                            ? "flex-1 p-4 rounded-r-lg flex justify-center items-center cursor-pointer dark:bg-slate-600 bg-gray-300"
                            : "flex-1 p-4 rounded-r-lg flex justify-center items-center cursor-pointer"
                    }
                    onClick={() => {
                        setSearchType(1);
                        setSearch("");
                    }}
                >
                    Search user
                </div>
            </div>

            <div className="w-3/5 flex flex-col items-center">
                {search !== "" ? (
                    searchType === 0 ? (
                        <>
                            <ExplorePosts />
                        </>
                    ) : (
                        <>
                            <ExploreUsers />
                        </>
                    )
                ) : (
                    <span className="text-xl">
                        Type something to start the search
                    </span>
                )}
            </div>
        </div>
    );
};

export default Explore;
