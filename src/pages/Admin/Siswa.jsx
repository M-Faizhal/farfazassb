import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import AdminSidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/Header';
import { sortIcon } from '../../utils/sort';
import Api from '../../utils/Api';
import { useCookies } from 'react-cookie';
import { toLocal } from '../../utils/dates';
import { useToken } from '../../utils/Cookies';
import { jwtDecode } from 'jwt-decode';

const Siswa = () => {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('nama');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [siswa,setSiswa] = useState([])
  const {getToken} = useToken()

  const getAllSiswa = async() =>{
    await Api.get("/admin/students",{
      headers : { 
        Authorization : "Bearer " + getToken()
      }
    }).then((res)=>{
      setSiswa(res.data)
    })
  }

   const getSiswaByCoach = async() =>{
    await Api.get("/admin/students/coach/" + jwtDecode(getToken()).userId,{
      headers : { 
        Authorization : "Bearer " + getToken()
      }
    }).then((res)=>{
      setSiswa(res.data)
    })
  }
  
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
    console.log(`Menghapus siswa dengan ID: ${selectedId}`);
    setShowModal(false);
  };

  const filteredSiswa = siswa
    .filter((siswa) =>
      siswa.name.toLowerCase().includes(search.toLowerCase())
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

    useEffect(()=>{
      const role = jwtDecode(getToken()).role
      switch (role) {
        case "SUPER_ADMIN":
          getAllSiswa()
          break;
      
        case "COACH":
          getSiswaByCoach()
          break;
      }
    },[])

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Data Siswa</h1>
            <Link
              to="/admin/siswa/create"
              className="bg-primary text-white font-medium px-4 py-2 rounded-md"
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
                <thead className="bg-primary text-white font-semibold">
                  <tr>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('id')}
                    >
                      ID Siswa {sortIcon(sortField,'id')}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('name')}
                    >
                      Nama {sortIcon('name')}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('gender')}
                    >
                      Jenis Kelamin {sortIcon('gender')}
                    </th>
                    <th className="px-4 py-3">Tempat, Tanggal Lahir</th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('age')}
                    >
                      Usia {sortIcon('age')}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('level')}
                    >
                      Level {sortIcon('level')}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort('kategoriBMI')}
                    >
                      Kategori BMI {sortIcon('kategoriBMI')}
                    </th>
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
                        <td className="px-4 py-3">{siswa.name}</td>
                        <td className="px-4 py-3">{siswa.gender == "L"? "Laki-Laki" : "Perempuan"}</td>
                        <td className="px-4 py-3">{siswa.tempatLahir + ", " + toLocal(siswa.tanggalLahir)}</td>
                        <td className="px-4 py-3">{siswa.age}</td>
                        <td className="px-4 py-3">{siswa.level}</td>
                        <td className="px-4 py-3">{siswa.kategoriBMI}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-3">
                            <Link to={`/admin/siswa/edit`}>
                              <FiEdit className="text-primary w-5 h-5 hover:scale-110" />
                            </Link>
                            <button onClick={() => handleOpenModal(siswa.id)}>
                              <FiTrash2 className="text-red-600 w-5 h-5 hover:scale-110" />
                            </button>
                          </div>
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

      {/* Modal Hapus */}
      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-2">Konfirmasi Hapus</h2>
            <p className="text-sm text-gray-700 mb-4">
              Apakah Anda yakin ingin menghapus siswa ini?
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

export default Siswa;
