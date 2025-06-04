import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from '../../components/Admin/Header';
import AdminSidebar from '../../components/Admin/Sidebar';
import { FiEdit, FiEye, FiPlus, FiTrash } from 'react-icons/fi';

const initialTesList = [
  {
    id: 'TES001',
    tanggal: '2025-05-28',
    jumlahSiswa: 5,
    namaPelatih: "Coach Bambang"
  },
  {
    id: 'TES002',
    tanggal: '2025-06-01',
    jumlahSiswa: 3,
    namaPelatih: "Coach Joko"
  },
  {
    id: 'TES003',
    tanggal: '2025-06-01',
    jumlahSiswa: 3,
    namaPelatih: "Coach Lathif"
  },
  {
    id: 'TES004',
    tanggal: '2025-06-01',
    jumlahSiswa: 3,
    namaPelatih: "Coach Bayu"
  }
];

const DaftarTes = () => {
  const [tesData, setTesData] = useState(initialTesList);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    const updatedData = tesData.filter(tes => tes.id !== selectedId);
    setTesData(updatedData);
    setShowModal(false);
  };

  const sortedTesList = [...tesData].sort((a, b) => new Date(a.tanggal) - new Date(b.tanggal));

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Daftar Tes</h1>
            <Link
              to="/admin/daftartes/create"
              className="bg-primary text-white font-medium px-4 py-2 rounded-md"
            >
              <FiPlus className="inline-block mr-1" />
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
                    {tes.namaPelatih || 'Tidak tersedia'}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <Link
                      to={`/admin/daftartes/penilaian`}
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
                    <button
                      onClick={() => handleOpenModal(tes.id)}
                      className="inline-flex items-center text-red-600 hover:text-red-700 text-xs md:text-sm font-medium"
                    >
                      <FiTrash className="mr-1" size={16} />
                      
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal Konfirmasi Hapus */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-2">Konfirmasi Hapus</h2>
            <p className="text-sm text-gray-700 mb-4">
              Apakah Anda yakin ingin menghapus data tes ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarTes;
