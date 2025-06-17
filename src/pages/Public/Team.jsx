import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Api from '../../utils/Api';

export default function Team() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllStudents = async () => {
    try {
      setLoading(true);
      const res = await Api.get("/public/students/");
      setStudents(res.data || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching students:", error);
      setError("Gagal memuat data siswa");
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  const getStudentLevel = (index) => {
    const levels = [
      "U-8",
      "U-9", 
      "U-10",
      "U-11",
      "U-12",
      "U-13",
      "U-14",
      "U-15",
      "U-16",
      "U-17",
      "U-18"
    ];
    return levels[index % levels.length];
  };

  // Group students by their assigned level
  const groupStudentsByLevel = () => {
    const grouped = {};
    students.forEach((student, index) => {
      const level = getStudentLevel(index);
      if (!grouped[level]) {
        grouped[level] = [];
      }
      grouped[level].push({ ...student, level });
    });
    return grouped;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col font-poppins">
        <Header />
        <main className="flex-grow pt-24 md:pt-28">
          <div className="max-w-6xl mx-auto p-6 md:p-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col font-poppins">
        <Header />
        <main className="flex-grow pt-24 md:pt-28">
          <div className="max-w-6xl mx-auto p-6 md:p-8">
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl mb-6 max-w-md mx-auto">
                <p className="text-lg font-medium">{error}</p>
              </div>
              <button 
                onClick={getAllStudents}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Coba Lagi
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col font-poppins">
      <Header />

      <main className="flex-grow pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Siswa Kami
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Para siswa berbakat yang sedang mengembangkan kemampuan sepak bola mereka
            </p>
          </div>

          {/* Students Grid by Category */}
          {students.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
                <p className="text-gray-500 text-xl">Belum ada data siswa yang tersedia</p>
              </div>
            </div>
          ) : (
            <>
              {Object.entries(groupStudentsByLevel()).map(([level, levelStudents]) => (
                <div key={level} className="mb-12">
                  {/* Category Indicator */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl shadow-lg">
                      <h2 className="text-2xl font-bold flex items-center">
                        <div className="w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center mr-3 font-bold text-lg">
                          {level.replace('U-', '')}
                        </div>
                        Kategori {level}
                      </h2>
                      <p className="text-blue-100 text-sm mt-1">
                        {levelStudents.length} siswa terdaftar
                      </p>
                    </div>
                  </div>

                  {/* Students in this category */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
                    {levelStudents.map((student, index) => (
                      <div 
                        key={student.id} 
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
                                  transform hover:-translate-y-2 p-6 text-center group border border-gray-100"
                      >
                        <div className="relative mb-4">
                          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 
                                        flex items-center justify-center text-white font-bold text-2xl shadow-lg
                                        group-hover:scale-110 transition-transform duration-300">
                            {student.name.charAt(0).toUpperCase()}
                          </div>
                          
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 
                                        bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {student.level}
                          </div>
                        </div>
                        
                        <h3 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                          {student.name}
                        </h3>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Statistics */}
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center mt-16">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Statistik Tim</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{students.length}</div>
                    <div className="text-gray-600">Total Siswa</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {Object.keys(groupStudentsByLevel()).length}
                    </div>
                    <div className="text-gray-600">Kategori Usia</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600 mb-2">2014</div>
                    <div className="text-gray-600">Tahun Berdiri</div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="bg-white shadow-inner py-4 text-center text-gray-600 text-sm mt-8">
        @SSB Farfaza
      </footer>
    </div>
  );
}