import { Link } from 'react-router-dom';
import AdminHeader from '../../components/Admin/Header';
import AdminSidebar from '../../components/Admin/Sidebar';
import { FiEdit, FiEye, FiPlus } from 'react-icons/fi';

const tesList = [
  {
    id: 'TES001',
    tanggal: '2025-05-28',
    jumlahSiswa: 5,
    namaPelatih: "Bambang"
  },
  {
    id: 'TES002',
    tanggal: '2025-06-01',
    jumlahSiswa: 3,
    namaPelatih: "Joko"

  },
  {
    id: 'TES003',
    tanggal: '2025-06-01',
    jumlahSiswa: 3,
    namaPelatih: "Lathif"

  },
  {
    id: 'TES004',
    tanggal: '2025-06-01',
    jumlahSiswa: 3,
    namaPelatih: "Bayu"

  }
];

const DaftarTes = () => {
  // Sort the tesList by tanggal
  const sortedTesList = tesList.sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen font-sans text-gray-800">
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          <AdminHeader />
          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Daftar Tes</h1>
            <Link
              to="/admin/daftartes/create"
              className="bg-primary text-white font-medium px-4 py-2 rounded-md"
            >
              New Test
            </Link>
          </div>

          {sortedTesList.length === 0 ? (
            <p className="text-gray-500 text-center mt-20 text-xl">
              Tidak ada data tes tersedia.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTesList.map((tes) => (
                <div
                  key={tes.id}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-200 hover:border-[#1F3C86] transition-all duration-300 cursor-pointer"
                >
                  <h2 className="text-xl font-bold text-[#1F3C86] mb-2 tracking-wide select-none">
                    {tes.id}
                  </h2>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Tanggal:</span>{' '}
                    {new Date(tes.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">Jumlah Siswa:</span>{' '}
                    {tes.jumlahSiswa}
                  </p>
                  <p className="text-gray-600 mb-4">
                    <span className="font-semibold">Nama Pelatih:</span>{' '}
                    {tes.namaPelatih ? tes.namaPelatih : 'Tidak tersedia'}
                  </p>
                  <div className="flex justify-between">
                    <Link
                      to={`/admin/penilaian/`}
                      className="inline-flex items-center text-[#1F3C86] hover:text-[#1f3c86ca] font-medium transition-colors duration-200"
                    >
                      <FiEye className="mr-1" size={18} />
                      Lihat Siswa
                    </Link>
                    <Link
                      to={`/admin/daftartes/edit`}
                      className="inline-flex items-center text-[#1F3C86] hover:text-[#1f3c86ca] font-medium transition-colors duration-200"
                    >
                      <FiEdit className="mr-1" size={18} />
                      Edit Tes
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DaftarTes;
