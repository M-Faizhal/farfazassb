import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { Navigate,Outlet } from "react-router";

const ProtectAdmin = () => {
    const [cookies] = useCookies([import.meta.env.VITE_COOKIES_NAME]);
    const isAdmin = cookies.session? jwtDecode(cookies.session)?.role === 'SUPER_ADMIN' || 'COACH' : false;

  return isAdmin? <Outlet/> : <Navigate to="/admin/login" replace={true} />
};

export default ProtectAdmin;
