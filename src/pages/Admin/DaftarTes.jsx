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
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 px-6 py-8">
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
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-8">
              <p className="text-gray-500 text-center text-lg">
                Tidak ada data tes tersedia.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              {sortedTesList.map((tes) => (
                <div
                  key={tes.id}
                  className="bg-white rounded-md p-4 md:p-6 shadow-sm hover:shadow-md border border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer"
                >
                  <h2 className="text-lg md:text-xl font-bold text-primary mb-2 tracking-wide select-none">
                    {tes.id}
                  </h2>
                  <p className="text-gray-600 mb-1 text-xs md:text-sm">
                    <span className="font-semibold">Tanggal:</span>{' '}
                    {new Date(tes.tanggal).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <p className="text-gray-600 mb-1 text-xs md:text-sm">
                    <span className="font-semibold">Jumlah Siswa:</span>{' '}
                    {tes.jumlahSiswa}
                  </p>
                  <p className="text-gray-600 mb-4 text-xs md:text-sm">
                    <span className="font-semibold">Nama Pelatih:</span>{' '}
                    {tes.namaPelatih ? tes.namaPelatih : 'Tidak tersedia'}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <Link
                      to={`/admin/penilaian/`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200 text-xs md:text-sm"
                    >
                      <FiEye className="mr-1" size={16} />
                      Lihat Siswa
                    </Link>
                    <Link
                      to={`/admin/daftartes/edit`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200 text-xs md:text-sm"
                    >
                      <FiEdit className="mr-1" size={16} />
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