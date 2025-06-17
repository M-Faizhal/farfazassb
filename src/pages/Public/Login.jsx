import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import Api from "../../utils/Api";
import { useNavigate } from "react-router";

function UserLogin() {

  const env = import.meta.env;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setCookie,] = useCookies([env.VITE_COOKIES_NAME]);
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email dan Password tidak boleh kosong!");
      return;
    }else{
      Api.post("/auth/login", {
        email: email,
        password: password
      }).then((res) => {
        setCookie(env.VITE_COOKIES_NAME, res.data.token)
        navigate("/user/dashboard")
      }).catch(err=>{
        toast.error(err.response.data.message)
      })
    }
  };

  return (
    <div className="flex flex-row items-center w-screen justify-between h-screen overflow-hidden">
        <div className="flex flex-col ms-[10%] w-100">
          <div>
            <h1 className="font-bold text-3xl text-start">Masuk</h1>
            <p className="text-md text-start text-md">Isi identitas dengan benar!</p>
          </div>
         <div className="flex flex-col gap-2 mt-5 mb-5">
          
  <input
    type="email"
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
    className="text-md outline-none border border-gray-300 rounded-full py-3 w-full px-5"
  />
  <input
    type="password"
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    className="text-md outline-none border border-gray-300 rounded-full py-3 w-full px-5"
  />

</div>
          <button onClick={handleSubmit} className="cursor-pointer font-bold w-full h-13 bg-black text-white rounded-full">
            Masuk
          </button>
        </div>
        <img src="/assets/login-image.svg" className="w-[40%]" alt="main bola" />
      </div>
  );
}

export default UserLogin;
