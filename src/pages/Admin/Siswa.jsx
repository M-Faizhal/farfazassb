import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/Header';

const siswaDummy = [
  {
    id: 'FZ1401',
    nama: 'AFIF BIMA SAID',
    jenisKelamin: 'Laki-laki',
    tempatTanggalLahir: 'Surabaya, 26 Jan 2014',
    usia: 11,
    level: 'U11',
    kategoriBMI: 'Normal',
  },
  {
    id: 'FZ1403',
    nama: 'AL SAFARAZ AKMA FADHIL PRASETYO',
    jenisKelamin: 'Laki-laki',
    tempatTanggalLahir: 'Surabaya, 12 Oct 2014',
    usia: 10,
    level: 'U10',
    kategoriBMI: 'Overweight',
  },
  // Tambah data lainnya...
];

const Siswa = () => {
  const [search, setSearch] = useState('');

  const filteredSiswa = siswaDummy.filter((s) =>
    s.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Data Siswa</h1>
            <Link
              to="/admin/dashboard/siswa/new"
              className="bg-[#1F3C86]  text-white font-medium px-4 py-2 rounded rounded-md"
            >
              New Student
            </Link>
          </div>

          <div className="bg-white rounded-md border border-gray-200 shadow-sm mb-8">
            <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
              <input
                type="text"
                placeholder="Cari nama siswa..."
                className="bg-gray-100 text-sm px-3 py-2 rounded-md w-full max-w-xs placeholder-gray-500 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-[#1F3C86] text-white font-semibold">
                  <tr>
                    <th className="px-4 py-3">ID Siswa</th>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Jenis Kelamin</th>
                    <th className="px-4 py-3">Tempat, Tanggal Lahir</th>
                    <th className="px-4 py-3">Usia</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3">Kategori BMI</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSiswa.length > 0 ? (
                    filteredSiswa.map((siswa) => (
                      <tr
                        key={siswa.id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 font-medium">{siswa.id}</td>
                        <td className="px-4 py-3">{siswa.nama}</td>
                        <td className="px-4 py-3">{siswa.jenisKelamin}</td>
                        <td className="px-4 py-3">{siswa.tempatTanggalLahir}</td>
                        <td className="px-4 py-3">{siswa.usia}</td>
                        <td className="px-4 py-3">{siswa.level}</td>
                        <td className="px-4 py-3">{siswa.kategoriBMI}</td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            to={`/admin/dashboard/siswa/${siswa.id}`}
                            className="text-[#1F3C86] hover:underline"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center py-6 text-gray-500">
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
    </div>
  );
};

export default Siswa;
