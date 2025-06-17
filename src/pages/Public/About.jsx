import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Api from '../../utils/Api';
import { FaClock, FaMapMarkerAlt, FaUsers, FaFutbol } from 'react-icons/fa';

function About() {
  const [pelatih, setPelatih] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [students, setStudents] = useState([]);

  const getAllPelatih = async () => {
    try {
      const res = await Api.get("/public/coaches/");
      setPelatih(res.data || []);
    } catch (error) {
      console.error("Error fetching coaches:", error);
      setPelatih([]);
    }
  };

  const getAllAchievement = async () => {
    try {
      const res = await Api.get("/public/achievements");
      setAchievements(res.data || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      setAchievements([]);
    }
  };

  const getAllStudents = async () => {
    try {
      const res = await Api.get("/public/students/");
      setStudents(res.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    getAllPelatih();
    getAllAchievement();
    getAllStudents();
  }, []);

  const trainingSchedule = [
    {
      day: "Senin",
      sessions: [
        { time: "15:30 - 17:00", category: "U-8 & U-9", location: "Lapangan A" },
        { time: "17:00 - 18:30", category: "U-10 & U-11", location: "Lapangan A" }
      ]
    },
    {
      day: "Selasa",
      sessions: [
        { time: "15:30 - 17:00", category: "U-12 & U-13", location: "Lapangan B" },
        { time: "17:00 - 18:30", category: "U-14 & U-15", location: "Lapangan B" }
      ]
    },
    {
      day: "Rabu",
      sessions: [
        { time: "15:30 - 17:00", category: "U-8 & U-9", location: "Lapangan A" },
        { time: "17:00 - 18:30", category: "U-16 & U-17", location: "Lapangan A" }
      ]
    },
    {
      day: "Kamis",
      sessions: [
        { time: "15:30 - 17:00", category: "U-12 & U-13", location: "Lapangan B" },
        { time: "17:00 - 18:30", category: "U-18", location: "Lapangan B" }
      ]
    },
    {
      day: "Jumat",
      sessions: [
        { time: "15:30 - 17:00", category: "U-10 & U-11", location: "Lapangan A" },
        { time: "17:00 - 18:30", category: "U-14 & U-15", location: "Lapangan A" }
      ]
    },
    {
      day: "Sabtu",
      sessions: [
        { time: "08:00 - 10:00", category: "Semua Kategori", location: "Lapangan A & B" },
        { time: "10:00 - 12:00", category: "Latihan Khusus", location: "Lapangan B" }
      ]
    },
    {
      day: "Minggu",
      sessions: [
        { time: "08:00 - 10:00", category: "Pertandingan/Turnamen", location: "Lapangan A & B" }
      ]
    }
  ];

  return (
    <>
      <Header />
      <main className='pt-20'>
        {/* About Us Section */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 pt-12 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center relative text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed mb-8">
              SSB Farfaza adalah sekolah sepak bola terdepan yang berdedikasi untuk mengembangkan bakat muda Indonesia. 
              Kami berkomitmen memberikan pelatihan berkualitas tinggi dengan pendekatan modern dan profesional.
            </p>        
          </div>

          {/* Statistics Section */}
          <section className="mt-16 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-blue-600">{pelatih.length}+</div>
                <div className="text-gray-600 mt-2 font-medium">Pelatih Berpengalaman</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-green-600">11</div>
                <div className="text-gray-600 mt-2 font-medium">Kategori Usia</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-orange-600">{achievements.length}+</div>
                <div className="text-gray-600 mt-2 font-medium">Prestasi Diraih</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-purple-600">{students.length}+</div>
                <div className="text-gray-600 mt-2 font-medium">Siswa Aktif</div>
              </div>
            </div>
          </section>
        </section>

        {/* Training Schedule Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Jadwal Latihan
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-4"></div>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
                Jadwal latihan rutin yang dirancang untuk mengoptimalkan perkembangan setiap pemain dalam berbagai kategori usia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {trainingSchedule.map((schedule, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-blue-100">
                  <div className="text-center mb-4">
                    <h4 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                      {schedule.day}
                    </h4>
                  </div>
                  
                  <div className="space-y-4">
                    {schedule.sessions.map((session, sessionIndex) => (
                      <div key={sessionIndex} className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 rounded-r-lg">
                        <div className="flex items-center mb-2">
                          <FaClock className="text-blue-600 mr-2" size={14} />
                          <span className="font-semibold text-blue-700 text-sm">{session.time}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          <FaUsers className="text-green-600 mr-2" size={14} />
                          <span className="text-gray-700 text-sm font-medium">{session.category}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-red-500 mr-2" size={14} />
                          <span className="text-gray-600 text-sm">{session.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
              <div className="text-center">
                <FaFutbol className="text-blue-600 text-4xl mx-auto mb-4" />
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Informasi Penting</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h5 className="font-semibold text-blue-600 mb-2">Persyaratan Latihan:</h5>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Datang 15 menit sebelum latihan dimulai</li>
                      <li>• Menggunakan seragam latihan resmi</li>
                      <li>• Membawa sepatu bola dan pelindung kaki</li>
                      <li>• Membawa botol minum pribadi</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-600 mb-2">Fasilitas Tersedia:</h5>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• 2 Lapangan</li>
                      <li>• Ruang ganti dan kamar mandi</li>
                      <li>• Area parkir yang luas</li>
                      <li>• Kantin dan area istirahat</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Vision Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">
                Visi Kami
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Menjadi sekolah sepak bola terdepan yang menghasilkan pemain-pemain berkualitas tinggi dengan karakter yang kuat, 
                siap berkompetisi di tingkat nasional dan internasional.
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                Misi Kami
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Memberikan pelatihan sepak bola berkualitas dengan metode modern, membangun karakter positif, 
                dan menciptakan lingkungan yang mendukung perkembangan optimal setiap pemain.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <section className="text-center mb-20">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Mengapa Memilih SSB Farfaza?
            </h3>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
              Kami berkomitmen memberikan yang terbaik untuk perkembangan sepak bola anak-anak Indonesia
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <i className="fas fa-user-tie text-white text-2xl" />
                </div>
                <h4 className="font-bold text-xl mb-4 text-gray-800">Tim Pelatih Profesional</h4>
                <p className="text-gray-600 leading-relaxed">
                  {pelatih.length} pelatih bersertifikat dengan pengalaman bertahun-tahun dalam mengembangkan bakat muda.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <i className="fas fa-bullseye text-white text-2xl" />
                </div>
                <h4 className="font-bold text-xl mb-4 text-gray-800">Metode Pelatihan Modern</h4>
                <p className="text-gray-600 leading-relaxed">
                  Kurikulum pelatihan yang disesuaikan dengan standar Liga Persebaya dan mengikuti perkembangan sepak bola modern.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <i className="fas fa-trophy text-white text-2xl" />
                </div>
                <h4 className="font-bold text-xl mb-4 text-gray-800">Siswa Aktif Terdaftar</h4>
                <p className="text-gray-600 leading-relaxed">
                  {students.length} siswa aktif yang sedang menjalani pelatihan di berbagai kategori usia.
                </p>
              </div>
            </div>
          </section>
        </main>
      </main>
    </>
  );
}

export default About;
