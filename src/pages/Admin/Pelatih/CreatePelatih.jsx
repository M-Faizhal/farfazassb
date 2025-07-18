import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import Api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import toast from "react-hot-toast";

const CreatePelatih = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nama: "",
    gender: "",
    password: "",
    email: "",
    telp: "",
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { getToken } = useToken();

  const addPelatih = async () => {
    setLoading(true);

    const form = new FormData();
    form.append("name", formData.nama);
    form.append("email", formData.email);
    form.append("telp", formData.telp);
    form.append("gender", formData.gender);
    if (formData.password) form.append("password", formData.password);
    if (foto) form.append("photo", foto);

    await Api.post("/admin/coaches", form, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(() => {
        toast.success("Berhasil membuat pelatih!");
        navigate("/admin/pelatih");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foto) {
      alert("Foto pelatih wajib diunggah.");
      return;
    }

    addPelatih();
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h2 className="text-black text-xl font-bold mb-6 mt-6">
            Tambah Data Pelatih
          </h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm"
          >
            <FileUpload
              label="Foto Pelatih"
              id="foto"
              required
              onChange={handleFileChange}
              preview={preview}
            />

            <InputField
              label="Nama"
              id="nama"
              required
              value={formData.nama}
              onChange={handleChange}
            />

            <InputField
              label="Email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              label="No. Telepon"
              id="telp"
              required
              value={formData.telp}
              onChange={handleChange}
            />

            <PasswordField
              label="Password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              show={showPassword}
              toggleShow={() => setShowPassword((prev) => !prev)}
            />

            <SelectField
              label="Jenis Kelamin"
              id="gender"
              required
              value={formData.gender}
              onChange={handleChange}
              options={["Laki-Laki", "Perempuan"]}
            />
          </form>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="bg-primary cursor-pointer text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Buat
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/pelatih")}
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
                <div className="text-sm text-gray-800 space-y-1 mb-4">
                  <p>
                    <strong>Nama:</strong> {formData.nama}
                  </p>
                  <p>
                    <strong>Jenis Kelamin:</strong> {formData.gender}
                  </p>
                  <p>
                    <strong>Password:</strong>{" "}
                    {formData.password.replace(/./g, "*")}
                  </p>
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="mt-2 w-full max-h-32 md:max-h-48 object-contain rounded-md border"
                    />
                  )}
                </div>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md w-full sm:w-auto"
                  >
                    Tinjau Ulang
                  </button>
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
        </main>
      </div>
    </div>
  );
};

const InputField = ({ label, id, required, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black placeholder-gray-600 focus:outline-primary text-sm"
    />
  </div>
);

const SelectField = ({ label, id, required, value, onChange, options }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm"
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

const PasswordField = ({
  label,
  id,
  value,
  onChange,
  required,
  show,
  toggleShow,
}) => (
  <div className="flex flex-col relative">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      type={show ? "text" : "password"}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 pr-10 text-black placeholder-gray-600 focus:outline-primary text-sm"
    />
    <div
      className="absolute right-3 top-9 cursor-pointer text-gray-600"
      onClick={toggleShow}
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </div>
  </div>
);

const FileUpload = ({ label, id, required, onChange, preview }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    {!preview ? (
      <>
        <label
          htmlFor={id}
          className="cursor-pointer rounded-md bg-white border border-gray-300 h-12 flex items-center justify-center text-sm text-gray-600"
        >
          Drag & Drop atau{" "}
          <span className="text-primary font-semibold ml-1">Cari</span>
        </label>
        <input id={id} type="file" onChange={onChange} className="hidden" />
      </>
    ) : (
      <div className="mt-3 border rounded overflow-hidden">
        <img
          src={preview}
          alt={`Preview ${id}`}
          className="w-full max-h-32 md:max-h-64 object-contain"
        />
      </div>
    )}
  </div>
);

export default CreatePelatih;
