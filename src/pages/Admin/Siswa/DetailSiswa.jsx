import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import Api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { useEffect, useState } from "react";

const DetailSiswa = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useToken();
  const [siswa, setSiswa] = useState();

  const getSiswaById = async () => {
    try {
      const res = await Api.get("/admin/students/" + id, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      setSiswa(res.data);
    } catch (err) {
      console.error("Gagal mengambil data siswa:", err);
    }
  };

  useEffect(() => {
    getSiswaById();
  }, [id]);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h2 className="text-black text-xl font-bold mb-6 mt-6">
            Preview Data Siswa
          </h2>

          {siswa && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm">
              <FilePreview label="Foto Siswa" src={siswa.photoUrl} />
              <TextPreview label="Nama" value={siswa.name} />
              <TextPreview
                label="Jenis Kelamin"
                value={siswa.gender === "L" ? "Laki-Laki" : "Perempuan"}
              />
              <TextPreview label="Tempat Lahir" value={siswa.tempatLahir} />
              <TextPreview
                label="Tanggal Lahir"
                value={
                  siswa.tanggalLahir
                    ? new Date(siswa.tanggalLahir).toLocaleDateString("id-ID")
                    : "-"
                }
              />
              <TextPreview label="Usia" value={siswa.age} />
              <TextPreview label="Level" value={siswa.level} />
              <TextPreview label="Kategori BMI" value={siswa.kategoriBMI} />
              <FilePreview label="Kartu Keluarga" src={siswa.kk} />
              <FilePreview label="Kartu Koperasi" src={siswa.koperasi} />
              <FilePreview label="Akta Kelahiran" src={siswa.akta} />
              <FilePreview label="Kartu BPJS" src={siswa.bpjs} />
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3 ">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto "
            >
              Kembali
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const TextPreview = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-sm text-black mb-1 font-medium">{label}</label>
    <p className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 flex items-center text-black text-sm">
      {value || "-"}
    </p>
  </div>
);

const FilePreview = ({ label, src }) => (
  <div className="flex flex-col">
    <label className="text-sm text-black mb-1 font-medium">{label}</label>
    {src ? (
      <div className="mt-1 border rounded overflow-hidden">
        <img
          src={src}
          alt={`Preview ${label}`}
          className="w-full max-h-32 md:max-h-64 object-contain"
        />
      </div>
    ) : (
      <p className="text-sm italic text-gray-500">Belum diunggah</p>
    )}
  </div>
);

export default DetailSiswa;
