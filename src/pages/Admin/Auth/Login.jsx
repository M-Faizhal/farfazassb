import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

function AdminLogin() {
  const env = import.meta.env;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie] = useCookies([env.VITE_COOKIES_NAME]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email dan Password tidak boleh kosong!");
      return;
    }

    axios
      .post(env.VITE_API_URL + "/auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setCookie(env.VITE_COOKIES_NAME, res.data.token);
        toast.success("Login berhasil!");
        // Redirect if needed, e.g., window.location.href = "/dashboard";
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Login gagal");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 font-[Poppins]">
      <div className="max-w-md w-full bg-white shadow-2xl rounded-2xl p-8">
        <div className="flex items-center justify-center mb-6">
          <img
            src="https://storage.googleapis.com/a1aa/image/355b2e78-c762-4f2e-00d1-4e3fcfc447b3.jpg"
            alt="FARFAZA FC logo"
            className="w-14 h-14 object-contain rounded-full shadow"
          />
          <span className="ml-3 font-extrabold text-lg text-blue-600">FARFAZA FC</span>
        </div>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg shadow-md text-sm"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">@farfaza fc</p>
      </div>
    </div>
  );
}

export default AdminLogin;
