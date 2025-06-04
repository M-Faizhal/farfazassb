import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import AdminSidebar from '../../../components/Admin/Sidebar';
import AdminHeader from '../../../components/Admin/Header';
import { sortIcon } from '../../../utils/sort';
import { useLocation } from 'react-router-dom';

const semuaSiswaDummy = [
  { id: 'FZ113', nama: 'AL SAFARAZ AKMA FADHIL PRASETYO', jenisKelamin: 'Laki-laki' },
  { id: 'FZ231', nama: 'RAKA PUTRA WICAKSONO', jenisKelamin: 'Laki-laki' },
  { id: 'FZ241', nama: 'DANIA ARUM SEKAR', jenisKelamin: 'Perempuan' },
  { id: 'FZ301', nama: 'BIMA SATRIA', jenisKelamin: 'Laki-laki' },
  { id: 'FZ302', nama: 'SINTA DEWI LESTARI', jenisKelamin: 'Perempuan' },
];

const AbsensiTanggal = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get('date');

  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('nama');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showSimpanModal, setShowSimpanModal] = useState(false);
  const [showHapusModal, setShowHapusModal] = useState(false);
  const [selectedHapusId, setSelectedHapusId] = useState(null);
  const [tambahSiswaId, setTambahSiswaId] = useState('');

  const [kehadiran, setKehadiran] = useState([
    { id: 'FZ113', nama: 'AL SAFARAZ AKMA FADHIL PRASETYO', jenisKelamin: 'Laki-laki', status: true },
    { id: 'FZ231', nama: 'RAKA PUTRA WICAKSONO', jenisKelamin: 'Laki-laki', status: false },
    { id: 'FZ241', nama: 'DANIA ARUM SEKAR', jenisKelamin: 'Perempuan', status: false },
  ]);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredSiswa = kehadiran
    .filter((siswa) => siswa.nama.toLowerCase().includes(search.toLowerCase()))
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

  const handleCheckboxChange = (id) => {
    const updated = kehadiran.map((siswa) =>
      siswa.id === id ? { ...siswa, status: !siswa.status } : siswa
    );
    setKehadiran(updated);
  };

  const handleTambahSiswa = () => {
    const siswa = semuaSiswaDummy.find((s) => s.id === tambahSiswaId);
    if (siswa && !kehadiran.some((s) => s.id === siswa.id)) {
      setKehadiran([...kehadiran, { ...siswa, status: false }]);
      setTambahSiswaId('');
    }
  };

  const handleHapusSiswa = () => {
    setKehadiran(kehadiran.filter((s) => s.id !== selectedHapusId));
    setShowHapusModal(false);
    setSelectedHapusId(null);
  };

  const handleSubmit = () => {
    console.log('Absensi disimpan:', kehadiran);
    setShowSimpanModal(false);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        <main className="flex-1 px-4 md:px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />
          <div className="flex justify-between items-start flex-col md:flex-row mb-6 mt-6 gap-4 md:gap-0">
            <div>
              <h1 className="text-xl font-bold text-black">Absensi Siswa - U10</h1>
              <p className="text-sm text-gray-600">Tanggal: {selectedDate || 'Tidak ada tanggal'}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Cari nama siswa..."
                className="bg-gray-100 text-sm px-3 py-2 rounded-md w-full md:w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex gap-2">
                <select
                  value={tambahSiswaId}
                  onChange={(e) => setTambahSiswaId(e.target.value)}
                  className="bg-gray-100 px-3 py-2 rounded-md text-sm"
                >
                  <option value="">Tambah siswa...</option>
                  {semuaSiswaDummy.map((s) => (
                    <option key={s.id} value={s.id}>{s.nama}</option>
                  ))}
                </select>
                <button onClick={handleTambahSiswa} className="bg-primary text-white px-4 py-2 rounded-md">
                  Tambah
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-md border border-gray-200 shadow-sm mb-8">
            <div className="block w-full overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 hidden md:table">
                <thead className="bg-primary text-white font-semibold">
                  <tr>
                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('id')}>
                      ID Siswa {sortIcon(sortField, 'id')}
                    </th>
                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('nama')}>
                      Nama {sortIcon(sortField, 'nama')}
                    </th>
                    <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort('jenisKelamin')}>
                      Jenis Kelamin {sortIcon(sortField, 'jenisKelamin')}
                    </th>
                    <th className="px-4 py-3">Hadir?</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSiswa.length > 0 ? (
                    filteredSiswa.map((siswa) => (
                      <tr key={siswa.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{siswa.id}</td>
                        <td className="px-4 py-3">{siswa.nama}</td>
                        <td className="px-4 py-3">{siswa.jenisKelamin}</td>
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={siswa.status}
                            onChange={() => handleCheckboxChange(siswa.id)}
                            className="w-4 h-4 text-green-600 border-gray-300 rounded"
                          />
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button
                            onClick={() => {
                              setSelectedHapusId(siswa.id);
                              setShowHapusModal(true);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">
                        Tidak ada data ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Mobile version */}
              <div className="md:hidden">
                {filteredSiswa.map((siswa) => (
                  <div key={siswa.id} className="border rounded-md p-4 mb-4">
                    <p><strong>ID:</strong> {siswa.id}</p>
                    <p><strong>Nama:</strong> {siswa.nama}</p>
                    <p><strong>Jenis Kelamin:</strong> {siswa.jenisKelamin}</p>
                    <div className="flex justify-between items-center mt-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={siswa.status}
                          onChange={() => handleCheckboxChange(siswa.id)}
                          className="w-4 h-4 text-green-600 border-gray-300 rounded"
                        />
                        Hadir
                      </label>
                      <button
                        onClick={() => {
                          setSelectedHapusId(siswa.id);
                          setShowHapusModal(true);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end px-4 py-4">
              <button
                onClick={() => setShowSimpanModal(true)}
                className="bg-primary text-white font-medium px-6 py-2 rounded-md"
              >
                Simpan Absensi
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Modal Simpan */}
      {showSimpanModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-3">Konfirmasi Absensi</h2>
            <div className="max-h-64 overflow-y-auto text-sm mb-4">
              <ul className="list-disc list-inside space-y-1">
                {kehadiran.map((siswa) => (
                  <li key={siswa.id}>
                    {siswa.nama} - {siswa.status ? 'Hadir' : 'Tidak Hadir'}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowSimpanModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
                Batal
              </button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded-md">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {showHapusModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Hapus Siswa</h2>
            <p className="mb-4">Apakah Anda yakin ingin menghapus siswa ini dari daftar absensi?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowHapusModal(false)} className="px-4 py-2 bg-gray-200 rounded-md">Batal</button>
              <button onClick={handleHapusSiswa} className="px-4 py-2 bg-red-600 text-white rounded-md">Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsensiTanggal;
