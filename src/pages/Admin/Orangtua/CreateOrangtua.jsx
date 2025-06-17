import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import Api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import toast from "react-hot-toast";

const CreateOrangtua = () => {
  const navigate = useNavigate();
  const { getToken } = useToken();
  const [confirm, setConfirm] = useState();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    telp: "",
    address: "",
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleConfirm = (e) => {
    setConfirm(e.target.value);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const create = async () => {
    setLoading(true);
    await Api.post("/admin/users", formData, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(() => {
        toast.success("Sukses Menambahkan Orang Tua");
        navigate("/admin/orangtua");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== confirm) {
      alert("Password dan Konfirmasi Password tidak cocok!");
      return;
    }

    create();
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h2 className="text-black text-xl font-bold mb-6 mt-6">
            Tambah Akun Orang Tua
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm"
          >
            <InputField
              label="Nama Orangtua"
              id="name"
              required
              onChange={handleChange}
              value={formData.nama}
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              required
              onChange={handleChange}
              value={formData.email}
            />

            <InputField
              label="Password"
              id="password"
              type="password"
              required
              onChange={handleChange}
              value={formData.password}
            />
            <InputField
              label="Konfirmasi Password"
              id="confirmPassword"
              type="password"
              required
              onChange={handleConfirm}
              value={confirm}
            />

            <InputField
              label="No. Telepon"
              id="telp"
              type="tel"
              required
              onChange={handleChange}
              value={formData.telp}
            />

            <div className="md:col-span-2">
              <InputField
                label="Alamat"
                id="address"
                required
                onChange={handleChange}
                value={formData.address}
                isTextarea={true}
              />
            </div>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="bg-primary cursor-pointer text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Buat Akun
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/orangtua")}
              className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Batal
            </button>
          </div>

          {showCreateModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-2">
                  Konfirmasi Tambah
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                  Apakah data akun orangtua yang Anda masukkan sudah benar?
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-4 py-2 bg-primary text-white rounded-md w-full sm:w-auto"
                  >
                    {loading ? "Menyimpan..." : "Ya, Simpan"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-md shadow-lg z-50 mx-4">
              {successMessage}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  id,
  required,
  type = "text",
  value,
  onChange,
  isTextarea = false,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    {isTextarea ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={3}
        className="rounded-md bg-[#E6EEFF] border border-gray-300 p-3 text-black placeholder-gray-600 focus:outline-primary text-sm resize-vertical"
        required={required}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black placeholder-gray-600 focus:outline-primary text-sm"
        required={required}
      />
    )}
  </div>
);

const SelectField = ({
  label,
  id,
  options = [],
  required,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm"
      required={required}
    >
      <option value="">-- Pilih --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default CreateOrangtua;
