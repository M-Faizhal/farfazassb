import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import AdminSidebar from "../../components/Admin/Sidebar";
import AdminHeader from "../../components/Admin/Header";
import { sortIcon } from "../../utils/sort";
import Api from "../../utils/Api";
import { useToken } from "../../utils/Cookies";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const Pelatih = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [pelatih, setPelatih] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(false); // NEW
  const { getToken } = useToken();
  const navigate = useNavigate();

  const hapusPelatih = async (id) => {
    setLoadingDelete(true); // NEW
    try {
      await Api.delete("/admin/coaches/" + id, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      toast.success("Sukses Menghapus Pelatih");
      await getAllPelatih(); // pastikan menunggu
      setShowModal(false);
    } catch (err) {
      toast.error("Gagal menghapus pelatih");
    } finally {
      setLoadingDelete(false); // NEW
    }
  };

  const getAllPelatih = async () => {
    try {
      const res = await Api.get("/admin/coaches", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      setPelatih(res.data);
    } catch (error) {
      console.error("Gagal memuat data pelatih", error);
    } finally {
      setLoading(false);
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
    hapusPelatih(selectedId);
  };

  const filteredPelatih = pelatih
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase())
    )
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
    getAllPelatih();
  }, []);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Data Akun Pelatih</h1>
            {jwtDecode(getToken()).role === "SUPER_ADMIN" && (
              <Link
                to="/admin/pelatih/create"
                className="bg-primary text-white font-medium px-4 py-2 rounded-md"
              >
                Tambah Pelatih
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
                        onClick={() => handleSort("name")}
                      >
                        Nama {sortIcon(sortField, sortOrder, "name")}
                      </th>
                      <th
                        className="px-4 py-3 cursor-pointer"
                        onClick={() => handleSort("email")}
                      >
                        Email {sortIcon(sortField, sortOrder, "email")}
                      </th>
                      <th className="px-4 py-3">No. Telepon</th>
                      {jwtDecode(getToken()).role === "SUPER_ADMIN" && (
                        <th className="px-4 py-3 text-right">Aksi</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPelatih.length > 0 ? (
                      filteredPelatih.map((p) => (
                        <tr
                          onClick={() =>
                            navigate(`/admin/pelatih/detail/${p.id}`)
                          }
                          key={p.id}
                          className="border-t border-gray-200 hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-medium">{p.name}</td>
                          <td className="px-4 py-3">{p.email}</td>
                          <td className="px-4 py-3">{p.telp}</td>
                          {jwtDecode(getToken()).role === "SUPER_ADMIN" && (
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-3">
                                <Link
                                  to={`/admin/pelatih/edit/${p.id}`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Edit className="text-primary w-5 h-5 hover:scale-110 cursor-pointer" />
                                </Link>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenModal(p.id);
                                  }}
                                >
                                  <Trash2 className="text-red-600 w-5 h-5 hover:scale-110" />
                                </button>
                              </div>
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="text-center py-6 text-gray-500"
                        >
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
              Apakah Anda yakin ingin menghapus akun pelatih ini?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                disabled={loadingDelete}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={loadingDelete}
                className={`px-4 py-2 rounded-md ${
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

export default Pelatih;
