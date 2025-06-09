import { Link } from 'react-router-dom';
import AdminHeader from '../../components/Admin/Header';
import AdminSidebar from '../../components/Admin/Sidebar';
import { FaFutbol } from 'react-icons/fa6';
import { LuGoal } from 'react-icons/lu'; // Ikon gawang

const kelompokUsia = [
  { label: 'U-8', deskripsi: 'Usia maksimal 8 tahun' },
  { label: 'U-9', deskripsi: 'Usia maksimal 9 tahun' },
  { label: 'U-10', deskripsi: 'Usia maksimal 10 tahun' },
  { label: 'U-11', deskripsi: 'Usia maksimal 11 tahun' },
  { label: 'U-12', deskripsi: 'Usia maksimal 12 tahun' },
  { label: 'U-13', deskripsi: 'Usia maksimal 13 tahun' },
  { label: 'U-14', deskripsi: 'Usia maksimal 14 tahun' },
  { label: 'U-15', deskripsi: 'Usia maksimal 15 tahun' },
  { label: 'U-16', deskripsi: 'Usia maksimal 16 tahun' },
  { label: 'U-17', deskripsi: 'Usia maksimal 17 tahun' },
  { label: 'U-18', deskripsi: 'Usia maksimal 18 tahun' },
];

const Kehadiran = () => {
  return (
    <div className="bg-[#f5f7fa] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64 text-sm">
          <AdminHeader />

          <div className="mb-8 mt-6">
            <h1 className="text-xl font-bold text-black mb-6">
              Absensi Siswa - Pilih Kelompok Usia
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {kelompokUsia.map(({ label, deskripsi }) => (
                <Link
                  to={`/admin/kehadiran/kalender`}
                  key={label}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-200 hover:border-[#1F3C86] transition-all duration-300 p-5 group relative overflow-hidden transform hover:scale-105 hover:-mx-2"
                >
                  {/* Bola dan Gawang */}
                  <div className="flex items-center justify-between mb-4 relative h-8">
                    <FaFutbol className="text-[#1F3C86] text-2xl absolute left-0 top-0 group-hover:translate-x-[90px] group-hover:rotate-[720deg] transition-transform duration-700 ease-out" />
                    <LuGoal className="text-[#1F3C86] text-xl absolute right-0 top-1 group-hover:scale-105 transition-transform duration-300" />
                  </div>

                  <div className="text-xl font-semibold text-[#1F3C86] group-hover:underline mt-6">
                    {label}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{deskripsi}</p>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Kehadiran;
