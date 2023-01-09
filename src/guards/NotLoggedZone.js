import { Navigate } from "react-router-dom";

const NotLoggedZone = ({ children }) => {
    const token = localStorage.getItem("token");
    return !token ? children : <Navigate to="/" />;
};

export default NotLoggedZone;
