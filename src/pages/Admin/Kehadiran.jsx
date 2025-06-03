import AdminHeader from "../../components/Admin/Header";
import AdminSidebar from "../../components/Admin/Sidebar";
import { Link } from "react-router";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { sortIcon } from "../../utils/sort";
import { useState } from "react";

const siswaDummy = [
  {
    id: "FZ1401",
    tanggal: "2025-06-03",
    sesi_kelas: "Latihan Pagi",
    nama: "AFIF BIMA SAID",
    jenisKelamin: "Laki-laki",
    keterangan: "Hadir",
  },
  {
    id: "FZ1403",
    tanggal: "2025-06-03",
    sesi_kelas: "Latihan Pagi",
    nama: "AL SAFARAZ AKMA FADHIL PRASETYO",
    jenisKelamin: "Laki-laki",
    keterangan: "Hadir",
  },
];

function Presence() {
  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [search, setSearch] = useState("");

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };
  
  const filteredSiswa = siswaDummy
    .filter((siswa) => siswa.nama.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];

      if (typeof valA === "string") {
        return sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      } else {
        return sortOrder === "asc" ? valA - valB : valB - valA;
      }
    });

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />
          
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 mt-6 gap-4">
            <h2 className="text-black text-xl font-bold">
              Absensi Siswa
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center">
              <input type="date" className="outline-none border border-gray-300 py-2 px-3 rounded-md" />
              <select className="outline-none border border-gray-300 py-2 px-3 rounded-md">
                <option value="1">Latihan Pagi</option>
                <option value="2">Latihan Siang</option>
                <option value="3">Latihan Sore</option>
              </select>
              <div className="flex flex-row items-center py-2 px-3 border border-gray-300 rounded-md bg-gray-100">
                <img src="/assets/search.svg" alt="search" className="w-4 h-4 mr-2" />
                <input
                  type="text"
                  placeholder="Cari Siswa"
                  className="outline-none bg-transparent flex-1 min-w-0"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className="cursor-pointer bg-primary flex flex-row items-center justify-center gap-2 text-white font-semibold px-4 py-2 rounded-md whitespace-nowrap">
                <FiPlus color="white"/>
                Input Absensi
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-md border border-gray-200 shadow-sm mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700">
                <thead className="bg-primary text-white font-semibold">
                  <tr>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("id")}
                    >
                      ID Siswa {sortIcon(sortField, sortOrder, "id")}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("tanggal")}
                    >
                      Tanggal {sortIcon(sortField, sortOrder, "tanggal")}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("sesi_kelas")}
                    >
                      Sesi Kelas {sortIcon(sortField, sortOrder, "sesi_kelas")}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("nama")}
                    >
                      Nama {sortIcon(sortField, sortOrder, "nama")}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("jenisKelamin")}
                    >
                      Jenis Kelamin {sortIcon(sortField, sortOrder, "jenisKelamin")}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("keterangan")}
                    >
                      Keterangan {sortIcon(sortField, sortOrder, "keterangan")}
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
                        <td className="px-4 py-3">{siswa.tanggal}</td>
                        <td className="px-4 py-3">{siswa.sesi_kelas}</td>
                        <td className="px-4 py-3">{siswa.nama}</td>
                        <td className="px-4 py-3">{siswa.jenisKelamin}</td>
                        <td className="px-4 py-3">{siswa.keterangan}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-3">
                            <Link>
                              <FiEdit className="text-primary w-5 h-5 hover:scale-110" />
                            </Link>
                            <button>
                              <FiTrash2 className="text-red-600 w-5 h-5 hover:scale-110" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-6 text-gray-500">
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
}

export default Presence;