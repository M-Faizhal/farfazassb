import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import { Trophy, Users, User } from "lucide-react";
import Api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const EditPrestasi = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [kategori, setKategori] = useState();
  const [formData, setFormData] = useState({
    title: "",
    studentId: "",
    date: "",
    level: "",
    place: "",
    desc: "",
    event: "",
  });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [student, setStudent] = useState([]);
  const { getToken } = useToken();

  const getPrestasiById = async () => {
    await Api.get("/admin/achievements/" + id, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setFormData(res.data);
      setKategori(res.data.studentId ? "Individu" : "Tim");
    });
  };

  const getAllStudent = async () => {
    await Api.get("/admin/students/coach/" + jwtDecode(getToken()).userId, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setStudent(res.data);
    });
  };

  const updatePrestasi = async () => {
    await Api.put("/admin/achievements/" + id, formData, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then(() => {
      toast.success("Sukses Mengupdate Prestasi");
      navigate(-1);
    });
  };

  useEffect(() => {
    getPrestasiById();
    getAllStudent();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleKategori = (e) => {
    setKategori(e.target.value);
    if (e.target.value === "Tim") {
      setFormData((prev) => ({ ...prev, studentId: null }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    updatePrestasi();
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex items-center gap-3 mb-6 mt-6">
            <Trophy className="text-primary" size={24} />
            <h2 className="text-black text-xl font-bold">
              Edit Data Prestasi
            </h2>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm"
          >
            <InputField
              label="Judul Prestasi"
              id="title"
              required
              onChange={handleChange}
              value={formData.title}
              placeholder="Contoh: Juara 1 Liga Junior Surabaya 2024"
            />

            <SelectField
              label="Kategori Prestasi"
              required
              onChange={handleKategori}
              value={kategori}
              options={["Tim", "Individu"]}
              icon={
                kategori === "Tim" ? (
                  <Users size={16} />
                ) : kategori === "Individu" ? (
                  <User size={16} />
                ) : null
              }
            />

            <InputField
              label="Nama Event/Tournament"
              id="event"
              required
              onChange={handleChange}
              value={formData.event}
              placeholder="Contoh: Liga Junior Surabaya 2024"
            />

            <InputField
              label="Tanggal Event"
              id="date"
              type="date"
              required
              onChange={handleChange}
              value={formData.date?.split("T")[0] || ""}
            />

            <SelectField
              label="Tingkat Kompetisi"
              id="level"
              required
              onChange={handleChange}
              value={formData.level}
              options={["Lokal", "Regional", "Nasional", "Internasional"]}
            />

            <SelectField
              label="Peringkat"
              id="place"
              required
              onChange={handleChange}
              value={formData.place}
              options={["1", "2", "3", "4", "5"]}
            />

            {kategori === "Individu" && (
              <div className="flex flex-col">
                <label className="text-sm text-black mb-1">Nama Siswa</label>
                <select
                  value={formData.studentId || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, studentId: e.target.value })
                  }
                  className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm"
                  required
                >
                  <option value="">-- Pilih Siswa --</option>
                  {student.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {kategori === "Tim" && (
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md border border-blue-200">
                <Users className="text-blue-600 mr-2" size={20} />
                <span className="text-blue-800 font-medium">Prestasi Tim</span>
              </div>
            )}

            <div className="md:col-span-2">
              <InputField
                label="Deskripsi Prestasi"
                id="desc"
                required
                onChange={handleChange}
                value={formData.desc}
                isTextarea={true}
                placeholder="Deskripsikan detail prestasi yang diraih..."
              />
            </div>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="bg-primary cursor-pointer text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto inline-flex items-center justify-center"
            >
              <Trophy className="mr-2" size={16} />
              Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/prestasi")}
              className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Batal
            </button>
          </div>

          {showSaveModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="text-primary" size={20} />
                  <h2 className="text-lg font-semibold">
                    Konfirmasi Edit Prestasi
                  </h2>
                </div>
                <div className="mb-4 space-y-2 text-sm">
                  <p>
                    <span className="font-medium">Judul:</span> {formData.title}
                  </p>
                  <p>
                    <span className="font-medium">Kategori:</span> {kategori}
                  </p>
                  <p>
                    <span className="font-medium">Peringkat:</span> Juara {formData.place}
                  </p>
                  <p>
                    <span className="font-medium">Tingkat:</span> {formData.level}
                  </p>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Apakah Anda yakin ingin menyimpan perubahan data prestasi ini?
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md w-full sm:w-auto"
                  >
                    Tinjau Ulang
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded-md w-full sm:w-auto"
                  >
                    Ya, Simpan
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

const InputField = ({
  label,
  id,
  required,
  type = "text",
  value,
  onChange,
  isTextarea = false,
  placeholder,
  icon,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1 flex items-center gap-2">
      {icon}
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    {isTextarea ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={4}
        placeholder={placeholder}
        className="rounded-md bg-[#E6EEFF] border border-gray-300 p-3 text-black placeholder-gray-600 focus:outline-primary text-sm resize-vertical"
        required={required}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
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
  icon,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1 flex items-center gap-2">
      {icon}
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
      <option value="">-- Pilih {label} --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default EditPrestasi;
