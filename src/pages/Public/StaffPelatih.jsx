import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Api from '../../utils/Api';

function StaffPelatih() {
  const [pelatih, setPelatih] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllPelatih = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/public/coaches/");
      setPelatih(res.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching coaches:", error);
      setError("Gagal memuat data pelatih");
      setPelatih([]);
    } finally {
      setLoading(false);
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
    getAllStudents();
  }, []);

  const getCoachRole = (index) => {
    const roles = [
      "Head Coach",
      "Assistant Coach", 
      "Technical Coach",
      "Fitness Coach",
      "Goalkeeping Coach",
      "Youth Coach"
    ];
    return roles[index % roles.length];
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-6 max-w-md mx-auto">
                <p className="text-lg font-medium">{error}</p>
              </div>
              <button 
                onClick={getAllPelatih}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Tim Pelatih Kami
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tim pelatih berpengalaman yang siap membimbing dan mengembangkan potensi setiap pemain.
            </p>
          </div>
          
          {/* Coaches Grid */}
          {pelatih.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <p className="text-gray-500 text-xl">Belum ada data pelatih yang tersedia</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {pelatih.map((coach, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                            transform hover:-translate-y-2 overflow-hidden group border border-gray-100"
                >[]
                  <div className="relative overflow-hidden">
                    <img 
                      src={coach.photoUrl} 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                      alt={`Coach ${coach.name}`} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Aktif
                    </div>
                  </div>
                  
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {coach.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-4">
                      {getCoachRole(index)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {pelatih.length > 0 && (
            <div className="mt-16 text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Statistik Tim</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{pelatih.length}</div>
                    <div className="text-gray-600">Total Pelatih</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">5+</div>
                    <div className="text-gray-600">Tahun Pengalaman</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">{students.length}</div>
                    <div className="text-gray-600">Siswa Dilatih</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default StaffPelatih;
