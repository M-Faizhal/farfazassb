import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const EditPenilaian = () => {
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    tinggiBadan: "",
    beratBadan: "",
    bmi: "",
    kategoriBMI: "NORMAL",
    tinggiDuduk: "",
    panjangTungkai: "",
    rentangLengan: "",
    denyutNadiIstirahat: "",
    saturasiOksigen: "",
    standingBoardJump: "",
    kecepatan: "",
    dayaTahan: "",
    controllingKanan: "",
    controllingKiri: "",
    dribbling: "",
    longpassKanan: "",
    longpassKiri: "",
    shortpassKanan: "",
    shortpassKiri: "",
    shootingKanan: "",
    shootingKiri: "",
    disiplin: "",
    komitmen: "",
    percayaDiri: "",
    injuryDetail: "",
    comment: "",
    studentId: id,
  });
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const nama = query.get("nama");
  const tanggal = query.get("tanggal");
  const test = query.get("test");
  const grade = query.get("grade");
  const { getToken } = useToken();
  const {
    id: _removedId,
    coachId: _removedCoachId,
    testId: _removeTestId,
    ...payload
  } = formData;

  const updateGrade = async () => {
    setLoadingSubmit(true);
    try {
      await Api.put(
        "/admin/grades/" + grade,
        {
          ...payload,
          date: tanggal,
        },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      );
      toast.success("Sukses Menilai Siswa!");
      navigate(-1);
    } catch (error) {
      toast.error("Gagal memperbarui penilaian.");
    } finally {
      setLoadingSubmit(false);
    }
  };

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGrade();
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
            Edit Penilaian
          </h2>

          {loadingData ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-md border border-gray-200 shadow-sm max-w-6xl"
              >
                <div className="flex flex-col">
                  <label className="text-sm text-black mb-1">Nama Siswa</label>
                  <p className="font-semibold text-2xl">{nama}</p>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-black mb-1">Tanggal Tes</label>
                  <p className="font-semibold text-2xl">{tanggal}</p>
                </div>
                <Section title="Antropometri">
                  <div className="flex flex-col">
                    <label className="text-sm text-black mb-1">
                      Kategori BMI
                    </label>
                    <select
                      defaultValue={"NORMAL"}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kategoriBMI: e.target.value,
                        })
                      }
                      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm"
                    >
                      {Array.from(["NORMAL", "UNDERWEIGHT", "OVERWEIGHT"]).map(
                        (bmi, index) => {
                          return (
                            <option key={index} value={bmi}>
                              {bmi}
                            </option>
                          );
                        }
                      )}
                    </select>
                  </div>
                  {[
                    ["bmi", "Body Mass Index (kg/m²)"],
                    ["tinggiBadan", "Tinggi Badan (cm)"],
                    ["beratBadan", "Berat Badan (kg)"],
                    ["tinggiDuduk", "Tinggi Duduk (cm)"],
                    ["panjangTungkai", "Panjang Tungkai (cm)"],
                    ["rentangLengan", "Rentang Lengan (cm)"],
                  ].map(([id, label]) => (
                    <InputField
                      key={id}
                      id={id}
                      label={label}
                      value={formData[id] || ""}
                      onChange={handleChange}
                    />
                  ))}
                </Section>

                <Section title="Fisiologi">
                  <InputField
                    id="denyutNadiIstirahat"
                    label="Denyut Nadi Istirahat (bpm)"
                    value={formData.denyutNadiIstirahat || ""}
                    onChange={handleChange}
                  />
                  <InputField
                    id="saturasiOksigen"
                    label="Saturasi Oksigen (%)"
                    value={formData.saturasiOksigen || ""}
                    onChange={handleChange}
                  />
                </Section>

                <Section title="Komponen Biomotor">
                  {[
                    ["standingBoardJump", "Tes Standing Board Jump (cm)"],
                    ["kecepatan", "Tes Kecepatan (detik)"],
                    ["dayaTahan", "Tes Daya Tahan (menit)"],
                  ].map(([id, label]) => (
                    <InputField
                      key={id}
                      id={id}
                      label={label}
                      value={formData[id] || ""}
                      onChange={handleChange}
                    />
                  ))}
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
                    <SelectField
                      key={id}
                      id={id}
                      label={id.replace(/([A-Z])/g, " $1")}
                      options={kategoriSkala}
                      value={formData[id] || ""}
                      onChange={handleChange}
                    />
                  ))}
                </Section>

                <Section title="Psikologi">
                  {["disiplin", "komitmen", "percayaDiri"].map((id) => (
                    <SelectField
                      key={id}
                      id={id}
                      label={id.charAt(0).toUpperCase() + id.slice(1)}
                      options={kategoriSkala}
                      value={formData[id] || ""}
                      onChange={handleChange}
                    />
                  ))}
                </Section>

                {/* Cedera dan Komentar berdampingan dan tinggi sama */}
                <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextAreaField
                    label="Detail Cedera"
                    id="injuryDetail"
                    value={formData.injuryDetail || ""}
                    onChange={handleChange}
                    placeholder="Masukkan detail cedera jika ada"
                    className="h-full"
                  />
                  <TextAreaField
                    label="Komentar"
                    id="comment"
                    value={formData.comment || ""}
                    onChange={handleChange}
                    placeholder="Masukkan komentar tambahan di sini..."
                    className="h-full"
                  />
                </div>
              </form>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleSubmit}
                  disabled={loadingSubmit}
                  className="bg-primary text-white font-semibold px-4 py-2 rounded-md disabled:opacity-50"
                >
                  {loadingSubmit ? "Menyimpan..." : "Update"}
                </button>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
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
  type = "text",
  required,
  value,
  onChange,
}) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm"
    />
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
      {label} {required && <span className="text-red-600">*</span>}
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
        <option key={opt} value={kategoriSkala.indexOf(opt) + 1}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({
  label,
  id,
  value,
  onChange,
  rows = 4,
  placeholder,
  className = "",
}) => (
  <div className={`flex flex-col w-full ${className}`}>
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
    </label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full h-full rounded-md bg-[#E6EEFF] border border-gray-300 px-3 py-2 text-black placeholder-gray-600 focus:outline-primary text-sm resize-none"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div className="col-span-2">
    <h3 className="text-base font-semibold mb-2 mt-4 text-[#1F3C86]">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

export default EditPenilaian;
