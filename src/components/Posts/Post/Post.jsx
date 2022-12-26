import React from "react";
import { useSelector } from "react-redux";

const Post = () => {
    const { posts } = useSelector((state) => state.posts);

    const postsList = posts?.map((post, idx) => {
        return (
            <div className="flex flex-col bg-red-400 w-full" key={idx}>
                <div>
                    <span className="text-gray-900 dark:text-white">
                        {post.content}
                    </span>
                </div>
                <div>Opciones</div>
            </div>
        );
    });

    return <div className="flex flex-col gap-4">{postsList}</div>;
};

export default Post;
