import { useState } from "react";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (
    <div className="flex flex-row items-center w-screen justify-between h-screen overflow-hidden">
        <div className="flex flex-col ms-[10%] w-100">
          <div>
            <h1 className="font-bold text-3xl text-start">Masuk</h1>
            <p className="text-md text-start text-md">Isi identitas dengan benar!</p>
          </div>
          <div className="flex flex-col gap-2 mt-5 mb-5">
            <input type="email" onChange={e=>setEmail(e.target.value)} placeholder="Email" className="text-md outline-none border-1 rounded-md py-3 w-full px-5"  />
            <input type="password" onChange={e=>setPassword(e.target.value)} placeholder="Password" className="text-md outline-none border-1 rounded-md py-3 w-full px-5"  />
          </div>
          <button className="font-bold w-full h-13 bg-black text-white rounded-md">
            Masuk
          </button>
        </div>
        <img src="/assets/login-image.svg" className="w-[40%]" alt="main bola" />
      </div>
  );
}

export default Login;
