import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/Header';
import { sortIcon } from '../../utils/sort';

const orangtuaDummy = [
  {
    id: 1,
    nama: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    noTelepon: '081234567890',
    alamat: 'Jl. Merdeka No. 123, Surabaya',
    namaAnak: 'AFIF BIMA SAID',
    idAnak: 'FZ1401',
    status: 'Aktif',
    tanggalDaftar: '2024-01-15',
  },
  {
    id: 2,
    nama: 'Siti Aminah',
    email: 'siti.aminah@email.com',
    noTelepon: '081234567891',
    alamat: 'Jl. Sudirman No. 456, Surabaya',
    namaAnak: 'AL SAFARAZ AKMA FADHIL PRASETYO',
    idAnak: 'FZ1403',
    status: 'Aktif',
    tanggalDaftar: '2024-01-20',
  },
  {
    id: 3,
    nama: 'Ahmad Rahman',
    email: 'ahmad.rahman@email.com',
    noTelepon: '081234567892',
    alamat: 'Jl. Thamrin No. 789, Surabaya',
    namaAnak: 'MUHAMMAD FARHAN',
    idAnak: 'FZ1402',
    status: 'Nonaktif',
    tanggalDaftar: '2024-02-10',
  },
];

const Orangtua = () => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('nama');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    console.log(`Menghapus akun orangtua dengan ID: ${selectedId}`);
    setShowModal(false);
  };

  const filteredOrangtua = orangtuaDummy
    .filter((orangtua) =>
      orangtua.nama.toLowerCase().includes(search.toLowerCase()) ||
      orangtua.email.toLowerCase().includes(search.toLowerCase()) ||
      orangtua.namaAnak.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === 'string') {
        return sortOrder === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
    });

  const getStatusBadge = (status) => {
    return status === 'Aktif' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Data Akun Orang Tua</h1>
            <Link
              to="/admin/orangtua/create"
              className="bg-primary text-white font-medium px-4 py-2 rounded-md"
            >
              New Parent Account
            </Link>
          </div>

          <div className="bg-white rounded-md border border-gray-200 shadow-sm mb-8">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <input
                type="text"
                placeholder="Cari nama orangtua, email, atau nama anak..."
                className="bg-gray-100 text-sm px-3 py-2 rounded-md w-full max-w-md placeholder-gray-500 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-primary text-white font-semibold">
                  <tr>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('nama')}
                    >
                      Nama Orangtua {sortIcon(sortField, sortOrder, 'nama')}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      Email {sortIcon(sortField, sortOrder, 'email')}
                    </th>
                    <th className="px-4 py-3">No. Telepon</th>
                    <th className="px-4 py-3">Alamat</th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('namaAnak')}
                    >
                      Nama Anak {sortIcon(sortField, sortOrder, 'namaAnak')}
                    </th>
                    <th className="px-4 py-3">ID Anak</th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('status')}
                    >
                      Status {sortIcon(sortField, sortOrder, 'status')}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('tanggalDaftar')}
                    >
                      Tanggal Daftar {sortIcon(sortField, sortOrder, 'tanggalDaftar')}
                    </th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrangtua.length > 0 ? (
                    filteredOrangtua.map((orangtua) => (
                      <tr
                        key={orangtua.id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 font-medium">{orangtua.nama}</td>
                        <td className="px-4 py-3">{orangtua.email}</td>
                        <td className="px-4 py-3">{orangtua.noTelepon}</td>
                        <td className="px-4 py-3 max-w-xs truncate" title={orangtua.alamat}>
                          {orangtua.alamat}
                        </td>
                        <td className="px-4 py-3">{orangtua.namaAnak}</td>
                        <td className="px-4 py-3 font-medium">{orangtua.idAnak}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(orangtua.status)}`}>
                            {orangtua.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{orangtua.tanggalDaftar}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-3">
                            <Link to={`/admin/orangtua/edit/${orangtua.id}`}>
                              <Edit className="text-primary w-5 h-5 hover:scale-110 cursor-pointer" />
                            </Link>
                            <button onClick={() => handleOpenModal(orangtua.id)}>
                              <Trash2 className="text-red-600 w-5 h-5 hover:scale-110" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9" className="text-center py-6 text-gray-500">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-2">Konfirmasi Hapus</h2>
            <p className="text-sm text-gray-700 mb-4">
              Apakah Anda yakin ingin menghapus akun orangtua ini?
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

export default Orangtua;