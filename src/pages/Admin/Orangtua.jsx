import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import AdminSidebar from "../../components/Admin/Sidebar";
import AdminHeader from "../../components/Admin/Header";
import { sortIcon } from "../../utils/sort";
import Api from "../../utils/Api";
import { useToken } from "../../utils/Cookies";

const Orangtua = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [parent, setParent] = useState([]);
  const { getToken } = useToken();

  const getAllParent = async () => {
    await Api.get("/admin/users", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setParent(res.data);
      console.log(res.data);
    });
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
    console.log(`Menghapus akun orangtua dengan ID: ${selectedId}`);
    setShowModal(false);
  };

  const filteredOrangtua = parent
    .filter(
      (orangtua) =>
        orangtua.name.toLowerCase().includes(search.toLowerCase()) ||
        orangtua.email.toLowerCase().includes(search.toLowerCase()) ||
        orangtua.parent.toLowerCase().includes(search.toLowerCase())
    )
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

  const getStatusBadge = (status) => {
    return status === "Aktif"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  useEffect(() => {
    getAllParent();
  }, []);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">
              Data Akun Orang Tua
            </h1>
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
                      onClick={() => handleSort("name")}
                    >
                      Nama Orangtua {sortIcon(sortField, sortOrder, "name")}
                    </th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("email")}
                    >
                      Email {sortIcon(sortField, sortOrder, "email")}
                    </th>
                    <th className="px-4 py-3">No. Telepon</th>
                    <th className="px-4 py-3">Alamat</th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("namaAnak")}
                    >
                      Nama Anak {sortIcon(sortField, sortOrder, "namaAnak")}
                    </th>
                    <th className="px-4 py-3">ID Anak</th>
                    <th
                      className="px-4 py-3 cursor-pointer"
                      onClick={() => handleSort("tanggalDaftar")}
                    >
                      Tanggal Daftar{" "}
                      {sortIcon(sortField, sortOrder, "tanggalDaftar")}
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
                        <td className="px-4 py-3 font-medium">
                          {orangtua.name}
                        </td>
                        <td className="px-4 py-3">{orangtua.email}</td>
                        <td className="px-4 py-3">{orangtua.telp}</td>
                        <td className="px-4 py-3 max-w-xs truncate">
                          {orangtua.address}
                        </td>

                        <td className="px-4 py-3">
                          {orangtua.parentOf && orangtua.parentOf.length > 0
                            ? orangtua.parentOf
                                .map((student) => student.name)
                                .join(", ")
                            : "-"}
                        </td>

                        <td className="px-4 py-3">
                          {orangtua.parentOf && orangtua.parentOf.length > 0
                            ? orangtua.parentOf
                                .map((student) => student.id)
                                .join(", ")
                            : "-"}
                        </td>

                        <td className="px-4 py-3">
                          {orangtua.tanggalDaftar || "-"}
                        </td>

                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-3">
                            <Link to={`/admin/orangtua/edit/${orangtua.id}`}>
                              <Edit className="text-primary w-5 h-5 hover:scale-110 cursor-pointer" />
                            </Link>
                            <button
                              onClick={() => handleOpenModal(orangtua.id)}
                            >
                              <Trash2 className="text-red-600 w-5 h-5 hover:scale-110" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="9"
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
        </main>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full mx-4">
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
