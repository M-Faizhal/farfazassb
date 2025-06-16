import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AdminSidebar from "../../components/Admin/Sidebar";
import AdminHeader from "../../components/Admin/Header";
import { sortIcon } from "../../utils/sort";
import Api from "../../utils/Api";
import { toLocal } from "../../utils/dates";
import { useToken } from "../../utils/Cookies";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const Siswa = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [siswa, setSiswa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const navigate = useNavigate();
  const { getToken } = useToken();

  const getAllSiswa = async () => {
    try {
      const res = await Api.get("/admin/students", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      setSiswa(res.data);
    } catch (err) {
      console.error("Gagal memuat data siswa", err);
    } finally {
      setLoading(false);
    }
  };

  const getSiswaByCoach = async () => {
    try {
      const res = await Api.get(
        "/admin/students/coach/" + jwtDecode(getToken()).userId,
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      );
      setSiswa(res.data);
    } catch (err) {
      console.error("Gagal memuat data siswa pelatih", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteSiswa = async () => {
    setLoadingDelete(true);
    try {
      await Api.delete("/admin/students/" + selectedId, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      toast.success("Sukses menghapus siswa");
      const role = jwtDecode(getToken()).role;
      setLoading(true);
      switch (role) {
        case "SUPER_ADMIN":
          await getAllSiswa();
          break;
        case "COACH":
          await getSiswaByCoach();
          break;
      }
      setShowModal(false);
    } catch (err) {
      toast.error("Gagal menghapus siswa");
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    deleteSiswa();
  };

  const filteredSiswa = siswa
    .filter((siswa) => siswa.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      return typeof valA === "string"
        ? sortOrder === "asc"
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA)
        : sortOrder === "asc"
        ? valA - valB
        : valB - valA;
    });

  useEffect(() => {
    const role = jwtDecode(getToken()).role;
    if (role === "SUPER_ADMIN") {
      getAllSiswa();
    } else if (role === "COACH") {
      getSiswaByCoach();
    }
  }, []);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Data Siswa</h1>
            {jwtDecode(getToken()).role === "COACH" && (
              <Link
                to="/admin/siswa/create"
                className="bg-primary text-white font-medium px-4 py-2 rounded-md"
              >
                Tambah Siswa
              </Link>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
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
                      <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("id")}>
                        ID Siswa {sortIcon(sortField, sortOrder, "id")}
                      </th>
                      <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("name")}>
                        Nama {sortIcon(sortField, sortOrder, "name")}
                      </th>
                      <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("gender")}>
                        Jenis Kelamin {sortIcon(sortField, sortOrder, "gender")}
                      </th>
                      <th className="px-4 py-3">Tempat, Tanggal Lahir</th>
                      <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("age")}>
                        Usia {sortIcon(sortField, sortOrder, "age")}
                      </th>
                      <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("level")}>
                        Level {sortIcon(sortField, sortOrder, "level")}
                      </th>
                      <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("kategoriBMI")}>
                        Kategori BMI {sortIcon(sortField, sortOrder, "kategoriBMI")}
                      </th>
                      <th className="px-4 py-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSiswa.length > 0 ? (
                      filteredSiswa.map((siswa) => (
                        <tr
                          key={siswa.id}
                          onClick={() => navigate(`/admin/siswa/detail/${siswa.id}`)}
                          className="cursor-pointer border-t border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium">{siswa.id}</td>
                          <td className="px-4 py-3">{siswa.name}</td>
                          <td className="px-4 py-3">
                            {siswa.gender === "L" ? "Laki-Laki" : "Perempuan"}
                          </td>
                          <td className="px-4 py-3">
                            {siswa.tempatLahir}, {toLocal(siswa.tanggalLahir)}
                          </td>
                          <td className="px-4 py-3">{siswa.age}</td>
                          <td className="px-4 py-3">{siswa.level}</td>
                          <td className="px-4 py-3">{siswa.kategoriBMI}</td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex justify-end gap-3">
                              {jwtDecode(getToken()).role === "COACH" && (
                                <Link
                                  to={`/admin/siswa/edit/${siswa.id}`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FiEdit className="text-primary w-5 h-5 hover:scale-110" />
                                </Link>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleOpenModal(siswa.id);
                                }}
                              >
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
          )}
        </main>
      </div>

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
                className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                disabled={loadingDelete}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={loadingDelete}
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  loadingDelete
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-600 text-white"
                }`}
              >
                {loadingDelete ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Siswa;
