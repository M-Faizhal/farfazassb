import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import { jwtDecode } from "jwt-decode";
import { useToken } from "../../../utils/Cookies";
import Api from "../../../utils/Api";
import { formatdate } from "../../../utils/formatDate";
import toast from "react-hot-toast";

const EditSiswa = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useToken();

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    tempatLahir: "",
    tanggalLahir: "",
    age: "",
    level: "",
    kategoriBMI: "",
    coachId: jwtDecode(getToken()).userId,
    parentId: ""
  });

  const [parent, setParent] = useState([]);
  const [files, setFiles] = useState({
    foto: null,
    kk: null,
    koperasi: null,
    akta: null,
    bpjs: null,
  });

  const [previews, setPreviews] = useState({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleGender = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value === "Laki-Laki" ? "L" : "P",
    });
  };

  const getSiswaByid = async () => {
    setIsLoading(true);
    await Api.get("/admin/students/" + id, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setFormData(res.data);
      setPreviews({
        foto: res.data.photoUrl,
        kk: res.data.kk,
        koperasi: res.data.koperasi,
        akta: res.data.akta,
        bpjs: res.data.bpjs,
      });
    }).finally(() => {
      setIsLoading(false);
    });
  };

  const getAllParent = async () => {
    await Api.get("/admin/users", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setParent(res.data);
    });
  };

  useEffect(() => {
    getSiswaByid();
    getAllParent();
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files: fileList } = e.target;
    const file = fileList[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [id]: file }));
      setPreviews((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
    }
  };

  const editSiswa = async () => {
    setIsUpdating(true);
    const data = new FormData();
    data.append("coachId", formData.coachId);
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("gender", formData.gender);
    data.append("level", formData.level);
    data.append("tanggalLahir", formData.tanggalLahir);
    data.append("tempatLahir", formData.tempatLahir);
    data.append("kategoriBMI", formData.kategoriBMI);
    if (formData.parentId) data.append("parentId", formData.parentId);
    if (files.foto) data.append("photo", files.foto);
    if (files.kk) data.append("kk", files.kk);
    if (files.koperasi) data.append("koperasi", files.koperasi);
    if (files.bpjs) data.append("bpjs", files.bpjs);
    if (files.akta) data.append("akta", files.akta);

    await Api.put("/admin/students/" + id, data, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(() => {
        toast.success("Berhasil mengedit siswa");
        navigate("/admin/siswa");
      })
      .catch(() => {
        toast.error("Gagal mengedit siswa");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleSave = (e) => {
    e.preventDefault();
    editSiswa();
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />
          <h2 className="text-black text-xl font-bold mb-6 mt-6">Edit Data Siswa</h2>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm">
                <FileUpload label="Foto Siswa" id="foto" onChange={handleFileChange} preview={previews.foto} />
                <InputField label="Nama" id="name" required onChange={handleChange} value={formData.name} />
                <SelectField label="Jenis Kelamin" id="gender" required onChange={handleGender} value={formData.gender === "L" ? "Laki-Laki" : "Perempuan"} options={["Laki-Laki", "Perempuan"]} />
                <InputField label="Tempat Lahir" id="tempatLahir" required onChange={handleChange} value={formData.tempatLahir} />
                <InputField label="Tanggal Lahir" id="tanggalLahir" type="date" required onChange={handleChange} value={formatdate(formData.tanggalLahir)} />
                <InputField label="Usia" id="age" onChange={handleChange} value={formData.age} />
                <SelectField label="Level" id="level" onChange={handleChange} value={formData.level} options={["U-8", "U-9", "U-10", "U-11", "U-12", "U-13", "U-14", "U-15", "U-16", "U-17", "U-18"]} />
                <SelectField label="Kategori BMI" id="kategoriBMI" required onChange={handleChange} value={formData.kategoriBMI} options={["NORMAL", "UNDERWEIGHT", "OVERWEIGHT"]} />
                <div className="flex flex-col">
                  <label className="text-sm text-black mb-1">Orang Tua</label>
                  <select value={formData.parentId} onChange={(e) => setFormData({ ...formData, parentId: e.target.value })} className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm">
                    <option value="">-- Pilih Orang Tua --</option>
                    {parent.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>
                <FileUpload label="Kartu Keluarga" id="kk" onChange={handleFileChange} preview={previews.kk} />
                <FileUpload label="Kartu Koperasi" id="koperasi" onChange={handleFileChange} preview={previews.koperasi} />
                <FileUpload label="Akta Kelahiran" id="akta" onChange={handleFileChange} preview={previews.akta} />
                <FileUpload label="Kartu BPJS" id="bpjs" onChange={handleFileChange} preview={previews.bpjs} />
              </form>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => setShowSaveModal(true)} className="cursor-pointer bg-primary text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto">Simpan</button>
                <button type="button" onClick={() => navigate("/admin/siswa")} className="cursor-pointer bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto">Batal</button>
              </div>
            </>
          )}

          {showSaveModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-2">Konfirmasi Simpan</h2>
                <p className="text-sm text-gray-700 mb-4">Apakah Anda yakin ingin menyimpan perubahan?</p>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button onClick={() => setShowSaveModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md w-full sm:w-auto">Tinjau Ulang</button>
                  <button onClick={handleSave} disabled={isUpdating} className="px-4 py-2 bg-primary text-white rounded-md w-full sm:w-auto">
                    {isUpdating ? "Menyimpan..." : "Ya, Simpan"}
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

const InputField = ({ label, id, required, type = "text", value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black placeholder-gray-600 focus:outline-primary text-sm"
      required={required}
    />
  </div>
);

const SelectField = ({ label, id, options = [], required, value, onChange }) => (
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

const FileUpload = ({ label, id, onChange, preview }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
    </label>
    {!preview ? (
      <>
        <label htmlFor={id} className="cursor-pointer rounded-md bg-white border border-gray-300 h-12 flex items-center justify-center text-sm text-gray-600">
          Drag & Drop atau <span className="text-primary font-semibold ml-1">Cari</span>
        </label>
        <input id={id} type="file" onChange={onChange} className="hidden" />
      </>
    ) : (
      <div className="mt-3 border rounded overflow-hidden">
        <img src={preview} alt={`Preview ${id}`} className="w-full max-h-32 md:max-h-64 object-contain" />
      </div>
    )}
  </div>
);

export default EditSiswa;
