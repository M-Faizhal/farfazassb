import UserSidebar from "../../components/Private/Sidebar";
import { useEffect, useState, useRef } from "react";
import { Printer, TrendingUp, Activity, Brain, Target } from "lucide-react";
import Api from "../../utils/Api";
import { useParams } from "react-router";
import { useToken } from "../../utils/Cookies";

const HasilTesSiswa = () => {
  const [test, setTest] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const printRef = useRef();
  const {id} = useParams()
  const {getToken} = useToken()
  const [child,setChild] = useState([])

    const getChild = async () => {
    setIsLoading(true);
    await Api.get("/users/my-children", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => {
        setChild(res.data)
      })
  };

  
  const getTestById = async()=>{
    await Api.get("/users/test/" + id + "/" + child[0].id,{
      headers : {
        Authorization : "Bearer " + getToken()
      }
    }).then((res)=>{
      setTest(res.data)
      console.log(res.data)
    }).finally(()=>{
      setIsLoading(false)
    })
  }

   useEffect(() => {
    getChild();
  }, []);

  useEffect(() => {
    if (child.length > 0) {
      getTestById();
    }
  }, [child]);

  const getScoreValue = (category) => {
    const scores = {
      "Kurang": 25,
      "Cukup": 50,
      "Baik": 75,
      "Sangat Baik": 100
    };
    return scores[category] || 0;
  };

  const getScoreColor = (category) => {
    const colors = {
      "Kurang": "bg-red-500",
      "Cukup": "bg-yellow-500", 
      "Baik": "bg-amber-500",
      "Sangat Baik": "bg-green-500"
    };
    return colors[category] || "bg-gray-400";
  };

  const ScoreBar = ({ label, category, showLabel = true }) => {
    const score = getScoreValue(category);
    const colorClass = getScoreColor(category);
    
    return (
      <div className="mb-4">
        {showLabel && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-amber-800">{label}</span>
            <span className="text-sm font-bold text-amber-900">{category}</span>
          </div>
        )}
        <div className="w-full bg-yellow-100 rounded-full h-3">
          <div 
            className={`h-3 rounded-full ${colorClass} transition-all duration-500 ease-out`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    
    // Generate skill bars HTML for print
    const skillBarsHTML = Object.entries(test.keterampilan).map(([key, value]) => {
      const score = getScoreValue(value);
      const label = formatKeterampilan(key);
      return `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-size: 14px; font-weight: 500;">${label}</span>
            <span style="font-size: 14px; font-weight: bold;">${value}</span>
          </div>
          <div style="width: 100%; height: 12px; background-color: #fef3c7; border-radius: 6px;">
            <div style="height: 12px; width: ${score}%; background-color: ${value === 'Kurang' ? '#ef4444' : value === 'Cukup' ? '#eab308' : value === 'Baik' ? '#f59e0b' : '#10b981'}; border-radius: 6px;"></div>
          </div>
        </div>
      `;
    }).join('');

    const psychologyBarsHTML = Object.entries(test.psikologi).map(([key, value]) => {
      const score = getScoreValue(value);
      return `
        <div style="margin-bottom: 15px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
            <span style="font-size: 14px; font-weight: 500;">${key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <span style="font-size: 14px; font-weight: bold;">${value}</span>
          </div>
          <div style="width: 100%; height: 12px; background-color: #fef3c7; border-radius: 6px;">
            <div style="height: 12px; width: ${score}%; background-color: ${value === 'Kurang' ? '#ef4444' : value === 'Cukup' ? '#eab308' : value === 'Baik' ? '#f59e0b' : '#10b981'}; border-radius: 6px;"></div>
          </div>
        </div>
      `;
    }).join('');
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Hasil Tes Siswa - ${test.student.name}</title>
          <style>
            * { box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              margin: 0; 
              padding: 20px;
              color: #333;
              background: white;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 3px solid #f59e0b;
              padding-bottom: 20px;
            }
            .header h1 {
              color: #92400e;
              margin: 0 0 10px 0;
              font-size: 28px;
            }
            .header h2 {
              color: #a16207;
              margin: 0;
              font-size: 18px;
              font-weight: normal;
            }
            .info-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 20px;
              margin-bottom: 30px;
              background-color: #fffbeb;
              padding: 20px;
              border-radius: 8px;
            }
            .info-item {
              font-size: 14px;
            }
            .info-label {
              font-weight: 600;
              color: #92400e;
            }
            .section {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            .section-title {
              color: #92400e;
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 15px;
              padding-bottom: 8px;
              border-bottom: 2px solid #fde68a;
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
              border-bottom: 1px solid #fde68a;
              font-size: 14px;
            }
            .data-value {
              font-weight: 600;
            }
            .notes {
              background-color: #fffbeb;
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
            <h1>Hasil Tes Siswa</h1>
            <h2>Tes ${test.id} - ${new Date(test.date).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</h2>
          </div>
          
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Pelatih:</span> ${test.coach}
            </div>
            <div class="info-item">
              <span class="info-label">ID Siswa:</span> ${test.student.id}
            </div>
            <div class="info-item">
              <span class="info-label">Nama Siswa:</span> ${test.student.name}
            </div>
            <div class="info-item">
              <span class="info-label">Tanggal Tes:</span> ${new Date(test.date).toLocaleDateString("id-ID")}
            </div>
          </div>

          <div class="section">
            <div class="section-title">📏 Antropometri</div>
            <div class="data-grid">
              <div class="data-item">
                <span>Tinggi Badan:</span>
                <span class="data-value">${test.antropometri.tinggiBadan} cm</span>
              </div>
              <div class="data-item">
                <span>Berat Badan:</span>
                <span class="data-value">${test.antropometri.beratBadan} kg</span>
              </div>
              <div class="data-item">
                <span>BMI:</span>
                <span class="data-value">${test.antropometri.bmi} (${test.antropometri.kategoriBMI})</span>
              </div>
              <div class="data-item">
                <span>Tinggi Duduk:</span>
                <span class="data-value">${test.antropometri.tinggiDuduk} cm</span>
              </div>
              <div class="data-item">
                <span>Panjang Tungkai:</span>
                <span class="data-value">${test.antropometri.panjangTungkai} cm</span>
              </div>
              <div class="data-item">
                <span>Rentang Lengan:</span>
                <span class="data-value">${test.antropometri.rentangLengan} cm</span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">❤️ Fisiologi</div>
            <div class="data-grid">
              <div class="data-item">
                <span>Denyut Nadi:</span>
                <span class="data-value">${test.fisiologi.denyutNadi} bpm</span>
              </div>
              <div class="data-item">
                <span>Saturasi Oksigen:</span>
                <span class="data-value">${test.fisiologi.saturasiOksigen}%</span>
              </div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">💪 Komponen Biomotor</div>
            <div class="data-grid">
              <div class="data-item">
                <span>Standing Board Jump:</span>
                <span class="data-value">${test.biomotor.standingBoardJump} cm</span>
              </div>
              <div class="data-item">
                <span>Test Kecepatan:</span>
                <span class="data-value">${test.biomotor.testKecepatan} detik</span>
              </div>
              <div class="data-item">
                <span>Daya Tahan:</span>
                <span class="data-value">${test.biomotor.dayaTahan} menit</span>
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
              <p><strong>Cedera:</strong> ${test.cedera}</p>
              <p><strong>Komentar Pelatih:</strong> "${test.komentar}"</p>
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

  const formatKeterampilan = (key) => {
    return key
      .replace(/([A-Z])/g, " $1")
      .replace(/^\w/, (c) => c.toUpperCase())
      .trim();
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 min-h-screen">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <UserSidebar />

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 md:ml-64">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
              Hasil Tes Siswa
            </h1>
            <p className="text-amber-700 text-sm md:text-base">
              Analisis komprehensif hasil penilaian siswa
            </p>
          </div>

          {isLoading ? (
            <div className="bg-white rounded-lg p-6 shadow text-center text-amber-700 animate-pulse">
              Memuat hasil tes...
            </div>
          ) : (
            <div className="space-y-6">
              <div
                ref={printRef}
                className="bg-white rounded-lg shadow border border-yellow-200 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 md:px-8 py-6 text-white">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold mb-1">
                        Tes {test.id}
                      </h2>
                      <p className="text-amber-100 text-sm md:text-base">
                        {new Date(test.date).toLocaleDateString("id-ID", { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0 text-right">
                      <p className="text-amber-100 text-sm">Siswa</p>
                      <p className="font-semibold text-sm md:text-base">{test.student.name}</p>
                      <p className="text-amber-200 text-sm">{test.student.id}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Info Pelatih */}
                  <div className="mb-8 p-4 bg-amber-50 rounded-lg border border-yellow-200">
                    <p className="text-sm text-amber-800">
                      <span className="font-medium">Pelatih:</span> {test.coach}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                    {/* Antropometri */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                          <TrendingUp className="text-amber-600" size={18} />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-800">Antropometri</h3>
                      </div>
                      <div className="space-y-3">
                        {Object.entries(test.antropometri).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center py-2 border-b border-yellow-200">
                            <span className="text-amber-700 capitalize text-sm md:text-base">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="font-semibold text-amber-900 text-sm md:text-base">
                              {typeof value === 'number' ? 
                                (key === 'bmi' ? value : `${value} ${key.includes('tinggi') || key.includes('panjang') || key.includes('rentang') ? 'cm' : key.includes('berat') ? 'kg' : ''}`) 
                                : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Fisiologi */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                          <Activity className="text-red-600" size={18} />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-800">Fisiologi</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-yellow-200">
                          <span className="text-amber-700 text-sm md:text-base">Denyut Nadi:</span>
                          <span className="font-semibold text-amber-900 text-sm md:text-base">{test.fisiologi.denyutNadi} bpm</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-yellow-200">
                          <span className="text-amber-700 text-sm md:text-base">Saturasi Oksigen:</span>
                          <span className="font-semibold text-amber-900 text-sm md:text-base">{test.fisiologi.saturasiOksigen}%</span>
                        </div>
                      </div>
                    </section>

                    {/* Biomotor */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <Target className="text-green-600" size={18} />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-800">Komponen Biomotor</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-yellow-200">
                          <span className="text-amber-700 text-sm md:text-base">Standing Board Jump:</span>
                          <span className="font-semibold text-amber-900 text-sm md:text-base">{test.biomotor.standingBoardJump} cm</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-yellow-200">
                          <span className="text-amber-700 text-sm md:text-base">Test Kecepatan:</span>
                          <span className="font-semibold text-amber-900 text-sm md:text-base">{test.biomotor.testKecepatan} detik</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-yellow-200">
                          <span className="text-amber-700 text-sm md:text-base">Daya Tahan:</span>
                          <span className="font-semibold text-amber-900 text-sm md:text-base">{test.biomotor.dayaTahan} menit</span>
                        </div>
                      </div>
                    </section>

                    {/* Psikologi dengan Grafik */}
                    <section className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Brain className="text-purple-600" size={18} />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-amber-800">Psikologi</h3>
                      </div>
                      <div className="space-y-4">
                        {Object.entries(test.psikologi).map(([key, value]) => (
                          <ScoreBar 
                            key={key}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                            category={value}
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
                      <h3 className="text-lg md:text-xl font-semibold text-amber-800">Analisis Keterampilan</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {Object.entries(test.keterampilan).map(([key, value]) => (
                        <ScoreBar 
                          key={key}
                          label={formatKeterampilan(key)}
                          category={value}
                        />
                      ))}
                    </div>
                  </section>

                  {/* Catatan */}
                  <section className="mt-8 p-4 md:p-6 bg-amber-50 border border-yellow-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-amber-800 mb-4">Catatan Tambahan</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-amber-800">Riwayat Cedera:</span>
                        <p className="text-amber-700 mt-1 text-sm md:text-base">{test.cedera}</p>
                      </div>
                      <div>
                        <span className="font-medium text-amber-800">Komentar Pelatih:</span>
                        <p className="text-amber-700 mt-1 italic text-sm md:text-base">"{test.komentar}"</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 md:px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-200 font-medium shadow text-sm md:text-base"
                >
                  <Printer size={18} />
                  Cetak Hasil Tes
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HasilTesSiswa;