import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddPost from "./components/AddPost/AddPost";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import PostDetail from "./components/PostDetail/PostDetail";
import Posts from "./components/Posts/Posts";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import { getAllPosts, getPosts } from "./features/posts/postsSlice";

function App() {
    const { page, date } = useSelector((state) => state.posts);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleScroll = (e) => {
        const bottom =
            Math.abs(
                e.target.scrollHeight -
                    e.target.clientHeight -
                    e.target.scrollTop
            ) < 1;
        if (bottom) {
            if (token) {
                dispatch(getPosts({ page, date }));
            } else {
                dispatch(getAllPosts({ page, date }));
            }
        }
    };

    return (
        <div
            className="App max-h-screen overflow-y-auto"
            onScroll={handleScroll}
        >
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Posts />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/post/:_id" element={<PostDetail />} />
                        <Route
                            path="/profile/:username"
                            element={<Profile />}
                        />
                    </Routes>
                    <AddPost />
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
