import { jwtDecode } from "jwt-decode";
import { useCookies } from "react-cookie";
import { Navigate, Outlet } from "react-router";

const ProtectAdmin = () => {
  const [cookies] = useCookies([import.meta.env.VITE_COOKIES_NAME]);

  const isAdmin = (() => {
    if (!cookies.session || cookies.session === "undefined") return false;

    try {
      const decoded = jwtDecode(cookies.session);
      return ['SUPER_ADMIN', 'COACH'].includes(decoded?.role);
    } catch (error) {
      return false;
    }
  })();

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectAdmin;