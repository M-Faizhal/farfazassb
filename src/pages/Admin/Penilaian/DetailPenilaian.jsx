import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import Api from "../../../utils/Api";
import toast from "react-hot-toast";
import { useToken } from "../../../utils/Cookies";

const kategoriSkala = ["Kurang", "Cukup", "Baik", "Sangat Baik"];

const allowedFields = [
  "tinggiBadan",
  "beratBadan",
  "bmi",
  "kategoriBMI",
  "tinggiDuduk",
  "panjangTungkai",
  "rentangLengan",
  "denyutNadiIstirahat",
  "saturasiOksigen",
  "standingBoardJump",
  "kecepatan",
  "dayaTahan",
  "controllingKanan",
  "controllingKiri",
  "dribbling",
  "longpassKanan",
  "longpassKiri",
  "shortpassKanan",
  "shortpassKiri",
  "shootingKanan",
  "shootingKiri",
  "disiplin",
  "komitmen",
  "percayaDiri",
  "injuryDetail",
  "comment",
  "studentId",
];

const DetailPenilaian = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState({});
  const { id } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const nama = query.get("nama");
  const tanggal = query.get("tanggal");
  const test = query.get("test");
  const { getToken } = useToken();

  const getGrades = async () => {
    setLoadingData(true);
    try {
      const res = await Api.get(`/admin/students/${id}/grades`, {
        headers: { Authorization: "Bearer " + getToken() },
      });

      const gradeData = res.data.find((grade) => grade.testId == test);
      if (!gradeData) {
        toast.error("Data penilaian tidak ditemukan.");
        return;
      }

      const filteredData = allowedFields.reduce((obj, key) => {
        if (gradeData.hasOwnProperty(key)) {
          obj[key] = gradeData[key];
        }
        return obj;
      }, {});

      setFormData(filteredData);
    } catch (err) {
      console.error("Gagal mengambil data penilaian", err);
      toast.error("Gagal mengambil data penilaian.");
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    getGrades();
  }, [id]);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />
          <h2 className="text-black text-xl font-bold mb-6 mt-6">
            Detail Penilaian
          </h2>

          {loadingData ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-md border border-gray-200 shadow-sm max-w-6xl">
              <DisplayField label="Nama Siswa" value={nama} />
              <DisplayField label="Tanggal Tes" value={tanggal} />

              <Section title="Antropometri">
                <DisplayField label="Kategori BMI" value={formData.kategoriBMI} />
                <DisplayField label="Body Mass Index (kg/m²)" value={formData.bmi} />
                <DisplayField label="Tinggi Badan (cm)" value={formData.tinggiBadan} />
                <DisplayField label="Berat Badan (kg)" value={formData.beratBadan} />
                <DisplayField label="Tinggi Duduk (cm)" value={formData.tinggiDuduk} />
                <DisplayField label="Panjang Tungkai (cm)" value={formData.panjangTungkai} />
                <DisplayField label="Rentang Lengan (cm)" value={formData.rentangLengan} />
              </Section>

              <Section title="Fisiologi">
                <DisplayField label="Denyut Nadi Istirahat (bpm)" value={formData.denyutNadiIstirahat} />
                <DisplayField label="Saturasi Oksigen (%)" value={formData.saturasiOksigen} />
              </Section>

              <Section title="Komponen Biomotor">
                <DisplayField label="Tes Standing Board Jump (cm)" value={formData.standingBoardJump} />
                <DisplayField label="Tes Kecepatan (detik)" value={formData.kecepatan} />
                <DisplayField label="Tes Daya Tahan (menit)" value={formData.dayaTahan} />
              </Section>

              <Section title="Keterampilan">
                {[
                  "controllingKanan",
                  "controllingKiri",
                  "dribbling",
                  "longpassKanan",
                  "longpassKiri",
                  "shortpassKanan",
                  "shortpassKiri",
                  "shootingKanan",
                  "shootingKiri",
                ].map((id) => (
                  <DisplayField
                    key={id}
                    label={id.replace(/([A-Z])/g, " $1")}
                    value={kategoriSkala[(formData[id] || 0) - 1] || "-"}
                  />
                ))}
              </Section>

              <Section title="Psikologi">
                {["disiplin", "komitmen", "percayaDiri"].map((id) => (
                  <DisplayField
                    key={id}
                    label={id.charAt(0).toUpperCase() + id.slice(1)}
                    value={kategoriSkala[(formData[id] || 0) - 1] || "-"}
                  />
                ))}
              </Section>

              <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <DisplayTextArea label="Detail Cedera" value={formData.injuryDetail} />
                <DisplayTextArea label="Komentar" value={formData.comment} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const DisplayField = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-sm text-black mb-1">{label}</label>
    <p className="bg-[#E6EEFF] border border-gray-300 h-10 px-3 flex items-center rounded-md text-black">
      {value || "-"}
    </p>
  </div>
);

const DisplayTextArea = ({ label, value }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm text-black mb-1">{label}</label>
    <div className="w-full h-full min-h-[100px] bg-[#E6EEFF] border border-gray-300 px-3 py-2 rounded-md text-black whitespace-pre-wrap">
      {value || "-"}
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="col-span-2">
    <h3 className="text-base font-semibold mb-2 mt-4 text-[#1F3C86]">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

export default DetailPenilaian;
