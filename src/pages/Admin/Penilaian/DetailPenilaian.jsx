import { useEffect, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Printer, TrendingUp, Activity, Brain, Target } from "lucide-react";
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
  const printRef = useRef();

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

  const getScoreValue = (category) => {
    const scores = {
      1: 25,
      2: 50,
      3: 75,
      4: 100
    };
    return scores[category] || 0;
  };

  const getScoreColor = (category) => {
    const colors = {
      1: "bg-red-500",
      2: "bg-yellow-500", 
      3: "bg-orange-500",
      4: "bg-green-500"
    };
    return colors[category] || "bg-gray-400";
  };

  const formatKeterampilan = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^\w/, (c) => c.toUpperCase())
      .trim();
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    // Generate skill bars HTML for print
    const skillFields = [
      "controllingKanan", "controllingKiri", "dribbling", "longpassKanan",
      "longpassKiri", "shortpassKanan", "shortpassKiri", "shootingKanan", "shootingKiri"
    ];
    
    const skillBarsHTML = skillFields.map((key) => {
      const value = formData[key] || 0;
      const score = getScoreValue(value);
      const label = formatKeterampilan(key);
      const kategori = kategoriSkala[value - 1] || "-";
      return `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-size: 14px; font-weight: 500;">${label}</span>
            <span style="font-size: 14px; font-weight: bold;">${kategori}</span>
          </div>
          <div style="width: 100%; height: 12px; background-color: #e0f2fe; border-radius: 6px;">
            <div style="height: 12px; width: ${score}%; background-color: ${value === 1 ? '#ef4444' : value === 2 ? '#eab308' : value === 3 ? '#f59e0b' : '#10b981'}; border-radius: 6px;"></div>
          </div>
        </div>
      `;
    }).join('');

    // Generate psychology bars HTML for print
    const psychologyFields = ["disiplin", "komitmen", "percayaDiri"];
    const psychologyBarsHTML = psychologyFields.map((key) => {
      const value = formData[key] || 0;
      const score = getScoreValue(value);
      const kategori = kategoriSkala[value - 1] || "-";
      return `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-size: 14px; font-weight: 500;">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <span style="font-size: 14px; font-weight: bold;">${kategori}</span>
          </div>
          <div style="width: 100%; height: 12px; background-color: #e0f2fe; border-radius: 6px;">
            <div style="height: 12px; width: ${score}%; background-color: ${value === 1 ? '#ef4444' : value === 2 ? '#eab308' : value === 3 ? '#f59e0b' : '#10b981'}; border-radius: 6px;"></div>
          </div>
        </div>
      `;
    }).join('');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Detail Penilaian - ${nama}</title>
          <style>
            * { box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 0; 
              padding: 20px;
              color: #1e3a8a;
              background: white;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 3px solid #3b82f6;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #1e40af;
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .header h2 {
              color: #2563eb;
              margin: 0;
              font-size: 18px;
              font-weight: normal;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
              background-color: #eff6ff;
              padding: 20px;
              border-radius: 8px;
            }
            .info-item {
              font-size: 14px;
            }
            .info-label {
              font-weight: 600;
              color: #1e40af;
            }
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            .section-title {
              color: #1e40af;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 2px solid #93c5fd;
            }
            .data-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 15px;
            }
            .data-item {
              display: flex;
              justify-content: space-between;
              padding: 8px 0;
              border-bottom: 1px solid #93c5fd;
              font-size: 14px;
            }
            .data-value {
              font-weight: 600;
            }
            .notes {
              background-color: #eff6ff;
              padding: 15px;
              border-radius: 8px;
              margin-top: 10px;
            }
            .notes p {
              margin: 8px 0;
              font-size: 14px;
              line-height: 1.5;
            }
            @media print {
              body { margin: 0; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Detail Penilaian Siswa</h1>
            <h2>Tes ID: ${test} - ${tanggal}</h2>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nama Siswa:</span> ${nama}
            </div>
            <div class="info-item">
              <span class="info-label">Tanggal Tes:</span> ${tanggal}
            </div>
            <div class="info-item">
              <span class="info-label">ID Siswa:</span> ${id}
            </div>
            <div class="info-item">
              <span class="info-label">ID Tes:</span> ${test}
            </div>
          </div>

          <div class="section">
            <div class="section-title">📏 Antropometri</div>
            <div class="data-grid">
              <div class="data-item">
                <span>Tinggi Badan:</span>
                <span class="data-value">${formData.tinggiBadan || '-'} cm</span>
              </div>
              <div class="data-item">
                <span>Berat Badan:</span>
                <span class="data-value">${formData.beratBadan || '-'} kg</span>
              </div>
              <div class="data-item">
                <span>BMI:</span>
                <span class="data-value">${formData.bmi || '-'} (${formData.kategoriBMI || '-'})</span>
              </div>
              <div class="data-item">
                <span>Tinggi Duduk:</span>
                <span class="data-value">${formData.tinggiDuduk || '-'} cm</span>
              </div>
              <div class="data-item">
                <span>Panjang Tungkai:</span>
                <span class="data-value">${formData.panjangTungkai || '-'} cm</span>
              </div>
              <div class="data-item">
                <span>Rentang Lengan:</span>
                <span class="data-value">${formData.rentangLengan || '-'} cm</span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">❤️ Fisiologi</div>
            <div class="data-grid">
              <div class="data-item">
                <span>Denyut Nadi Istirahat:</span>
                <span class="data-value">${formData.denyutNadiIstirahat || '-'} bpm</span>
              </div>
              <div class="data-item">
                <span>Saturasi Oksigen:</span>
                <span class="data-value">${formData.saturasiOksigen || '-'}%</span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">💪 Komponen Biomotor</div>
            <div class="data-grid">
              <div class="data-item">
                <span>Standing Board Jump:</span>
                <span class="data-value">${formData.standingBoardJump || '-'} cm</span>
              </div>
              <div class="data-item">
                <span>Tes Kecepatan:</span>
                <span class="data-value">${formData.kecepatan || '-'} detik</span>
              </div>
              <div class="data-item">
                <span>Tes Daya Tahan:</span>
                <span class="data-value">${formData.dayaTahan || '-'} menit</span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">⚽ Keterampilan</div>
            ${skillBarsHTML}
          </div>

          <div class="section">
            <div class="section-title">🧠 Psikologi</div>
            ${psychologyBarsHTML}
          </div>

          <div class="section">
            <div class="section-title">📝 Catatan Lain</div>
            <div class="notes">
              <p><strong>Detail Cedera:</strong> ${formData.injuryDetail || '-'}</p>
              <p><strong>Komentar:</strong> ${formData.comment || '-'}</p>
            </div>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const ScoreBar = ({ label, category, showLabel = true }) => {
    const score = getScoreValue(category);
    const colorClass = getScoreColor(category);
    
    return (
      <div className="mb-4">
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-blue-800">{label}</span>
            <span className="text-sm font-bold text-blue-900">{kategoriSkala[category - 1] || "-"}</span>
          </div>
        )}
        <div className="w-full bg-blue-100 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${colorClass} transition-all duration-500 ease-out`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />
          <div className="mb-8">
            <h2 className="text-blue-800 text-2xl md:text-3xl font-bold mb-2 mt-6">
              Detail Penilaian
            </h2>
            <p className="text-blue-700 text-sm md:text-base">
              Analisis komprehensif hasil penilaian siswa
            </p>
          </div>

          {loadingData ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                ref={printRef}
                className="bg-white rounded-lg shadow border border-blue-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 md:px-8 py-6 text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-1">
                        Tes ID: {test}
                      </h3>
                      <p className="text-blue-100 text-sm md:text-base">
                        {tanggal}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-blue-100 text-sm">Siswa</p>
                      <p className="font-semibold text-sm md:text-base">{nama}</p>
                      <p className="text-blue-200 text-sm">ID: {id}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                    {/* Antropometri */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="text-blue-600" size={18} />
                        </div>
                        <h4 className="text-lg md:text-xl font-semibold text-blue-800">Antropometri</h4>
                      </div>
                      <div className="space-y-3">
                        <DisplayField label="Kategori BMI" value={formData.kategoriBMI} />
                        <DisplayField label="Body Mass Index (kg/m²)" value={formData.bmi} />
                        <DisplayField label="Tinggi Badan (cm)" value={formData.tinggiBadan} />
                        <DisplayField label="Berat Badan (kg)" value={formData.beratBadan} />
                        <DisplayField label="Tinggi Duduk (cm)" value={formData.tinggiDuduk} />
                        <DisplayField label="Panjang Tungkai (cm)" value={formData.panjangTungkai} />
                        <DisplayField label="Rentang Lengan (cm)" value={formData.rentangLengan} />
                      </div>
                    </section>

                    {/* Fisiologi */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Activity className="text-red-600" size={18} />
                        </div>
                        <h4 className="text-lg md:text-xl font-semibold text-blue-800">Fisiologi</h4>
                      </div>
                      <div className="space-y-3">
                        <DisplayField label="Denyut Nadi Istirahat (bpm)" value={formData.denyutNadiIstirahat} />
                        <DisplayField label="Saturasi Oksigen (%)" value={formData.saturasiOksigen} />
                      </div>
                    </section>

                    {/* Komponen Biomotor */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Target className="text-green-600" size={18} />
                        </div>
                        <h4 className="text-lg md:text-xl font-semibold text-blue-800">Komponen Biomotor</h4>
                      </div>
                      <div className="space-y-3">
                        <DisplayField label="Tes Standing Board Jump (cm)" value={formData.standingBoardJump} />
                        <DisplayField label="Tes Kecepatan (detik)" value={formData.kecepatan} />
                        <DisplayField label="Tes Daya Tahan (menit)" value={formData.dayaTahan} />
                      </div>
                    </section>

                    {/* Psikologi dengan Grafik */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Brain className="text-purple-600" size={18} />
                        </div>
                        <h4 className="text-lg md:text-xl font-semibold text-blue-800">Psikologi</h4>
                      </div>
                      <div className="space-y-4">
                        {["disiplin", "komitmen", "percayaDiri"].map((id) => (
                          <ScoreBar 
                            key={id}
                            label={id.charAt(0).toUpperCase() + id.slice(1)}
                            category={formData[id] || 0}
                          />
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Keterampilan dengan Grafik - Full Width */}
                  <section className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Target className="text-orange-600" size={18} />
                      </div>
                      <h4 className="text-lg md:text-xl font-semibold text-blue-800">Analisis Keterampilan</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
                        <ScoreBar 
                          key={id}
                          label={formatKeterampilan(id)}
                          category={formData[id] || 0}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Catatan */}
                  <section className="mt-8 p-4 md:p-6 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-800 mb-4">Catatan Tambahan</h4>
                    <div className="space-y-3">
                      <DisplayTextArea label="Detail Cedera" value={formData.injuryDetail} />
                      <DisplayTextArea label="Komentar" value={formData.comment} />
                    </div>
                  </section>
                </div>
              </div>

              {/* Print Button */}
              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 md:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow text-sm md:text-base"
                >
                  <Printer size={18} />
                  Cetak Detail Penilaian
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const DisplayField = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-blue-200">
    <span className="text-blue-700 text-sm md:text-base">{label}:</span>
    <span className="font-semibold text-blue-900 text-sm md:text-base">
      {value || "-"}
    </span>
  </div>
);

const DisplayTextArea = ({ label, value }) => (
  <div className="flex flex-col w-full">
    <label className="text-sm text-blue-800 mb-1 font-medium">{label}</label>
    <div className="w-full min-h-[60px] bg-white border border-blue-300 px-3 py-2 rounded-md text-blue-900 whitespace-pre-wrap">
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