import React from "react";

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Tambahkan logika login di sini, misalnya:
    // const email = e.target.email.value;
    // const password = e.target.password.value;
    console.log("Login form submitted");
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        {/* Form Login */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <h1 className="font-bold text-black text-lg mb-1">Masuk</h1>
            <p className="text-xs text-gray-600 mb-6">Isi identitas dengan benar</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 focus:outline-none focus:ring-1 focus:ring-black"
              />
              <button
                type="submit"
                className="w-full bg-black text-white text-xs font-semibold rounded-md py-2 mt-3"
              >
                Masuk
              </button>
            </form>
          </div>
          <p className="text-[9px] text-gray-400 text-center mt-10">@farfaza fc</p>
        </div>

        {/* Gambar hanya muncul di layar besar */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://storage.googleapis.com/a1aa/image/72036249-1df3-4624-496c-e586cfb15b3b.jpg"
            alt="Ilustrasi anak bermain bola"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
