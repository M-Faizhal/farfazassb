import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';
import AdminSidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/Header';
import { sortIcon } from '../../utils/sort';

const pelatihDummy = [
  {
    id: 1,
    nama: 'Rudi Hartono',
    email: 'rudi.hartono@email.com',
    noTelepon: '081234567890',
  },
  {
    id: 2,
    nama: 'Dewi Lestari',
    email: 'dewi.lestari@email.com',
    noTelepon: '081234567891',
  },
  {
    id: 3,
    nama: 'Andi Prasetya',
    email: 'andi.prasetya@email.com',
    noTelepon: '081234567892',
  },
];

const Pelatih = () => {
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
    console.log(`Menghapus akun pelatih dengan ID: ${selectedId}`);
    setShowModal(false);
  };

  const filteredPelatih = pelatihDummy
    .filter((p) =>
      p.nama.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      return typeof valA === 'string'
        ? sortOrder === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA)
        : sortOrder === 'asc'
        ? valA - valB
        : valB - valA;
    });

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Data Akun Pelatih</h1>
            <Link
              to="/admin/pelatih/create"
              className="bg-primary text-white font-medium px-4 py-2 rounded-md"
            >
              New Coach Account
            </Link>
          </div>

          <div className="bg-white rounded-md border border-gray-200 shadow-sm mb-8">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <input
                type="text"
                placeholder="Cari nama atau email pelatih..."
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
                      Nama {sortIcon(sortField, sortOrder, 'nama')}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('email')}
                    >
                      Email {sortIcon(sortField, sortOrder, 'email')}
                    </th>
                    <th className="px-4 py-3">No. Telepon</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPelatih.length > 0 ? (
                    filteredPelatih.map((p) => (
                      <tr
                        key={p.id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 font-medium">{p.nama}</td>
                        <td className="px-4 py-3">{p.email}</td>
                        <td className="px-4 py-3">{p.noTelepon}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-3">
                            <Link to={`/admin/pelatih/edit`}>
                              <Edit className="text-primary w-5 h-5 hover:scale-110 cursor-pointer" />
                            </Link>
                            <button onClick={() => handleOpenModal(p.id)}>
                              <Trash2 className="text-red-600 w-5 h-5 hover:scale-110" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-gray-500">
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
              Apakah Anda yakin ingin menghapus akun pelatih ini?
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

export default Pelatih;
