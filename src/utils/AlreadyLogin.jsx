import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { Navigate,Outlet } from "react-router";

const AlreadyLogin = () => {
    const [cookies] = useCookies([import.meta.env.VITE_COOKIES_NAME]);

    return cookies.session?  <Navigate to="/admin/dashboard" replace={true} /> : <Outlet/>;
};

export default AlreadyLogin;
