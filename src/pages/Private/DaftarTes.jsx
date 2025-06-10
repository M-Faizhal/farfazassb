import UserSidebar from "../../components/Private/Sidebar";
import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

const DaftarTesSiswa = () => {
  const [tests, setTests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data dari server
    const timer = setTimeout(() => {
      setTests([
        {
          id: "TES001",
          date: "2025-05-28",
          coach: "Coach Bambang",
        },
        {
          id: "TES003",
          date: "2025-06-01",
          coach: "Coach Lathif",
        },
      ]);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 min-h-screen">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <UserSidebar />

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 md:ml-64">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">Penilaian</h1>
            <p className="text-amber-700 text-sm md:text-base">
              Daftar tes yang diikuti oleh siswa
            </p>
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="bg-white rounded-lg p-6 shadow text-center text-amber-700 animate-pulse">
              Memuat daftar tes...
            </div>
          ) : tests.length === 0 ? (
            <div className="bg-white rounded-lg p-6 shadow text-center text-gray-600">
              Belum ada tes yang diikuti.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tests.map((test) => (
                <Link
                  key={test.id}
                  to={`/user/penilaian/${test.id}`}
                  className="bg-white rounded-lg border border-yellow-200 p-6 shadow-md hover:bg-amber-50 transition block"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <ClipboardList className="text-amber-600" size={20} />
                    <p className="font-semibold text-amber-800">Tes {test.id}</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-1">Tanggal: {test.date}</p>
                  <p className="text-gray-600 text-sm">Pelatih: {test.coach}</p>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DaftarTesSiswa;
