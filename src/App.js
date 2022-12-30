import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddPost from "./components/AddPost/AddPost";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Posts from "./components/Posts/Posts";
import Register from "./components/Register/Register";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Posts />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                    <AddPost />
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
