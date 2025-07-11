import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/Admin/Header";
import AdminSidebar from "../../components/Admin/Sidebar";
import { FiEdit, FiEye, FiPlus, FiTrash } from "react-icons/fi";
import Api from "../../utils/Api";
import { useToken } from "../../utils/Cookies";
import { toLocal } from "../../utils/dates";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const DaftarTes = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingHapus, setLoadingHapus] = useState(false); 
  const { getToken } = useToken();

  const getAllTest = async () => {
    try {
      const res = await Api.get("/admin/tests", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      const role = jwtDecode(getToken()).role;
      if (role === "COACH") {
        const coachId = jwtDecode(getToken()).userId;
        setTest(res.data.filter((t) => t.coach.id === coachId));
      } else {
        setTest(res.data);
      }
    } catch (err) {
      toast.error("Gagal memuat data tes");
    } finally {
      setLoading(false);
    }
  };

  const deleteTests = async (id) => {
    setLoadingHapus(true); 
    try {
      await Api.delete("/admin/tests/" + id, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      });
      toast.success("Berhasil menghapus test");
      await getAllTest();
      setShowModal(false);
    } catch {
      toast.error("Gagal menghapus test");
    } finally {
      setLoadingHapus(false);
    }
  };

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    deleteTests(selectedId);
  };

  useEffect(() => {
    getAllTest();
  }, []);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Daftar Tes</h1>
            {jwtDecode(getToken()).role === "COACH" && (
              <Link
                to="/admin/daftartes/create"
                className="bg-primary text-white font-medium px-4 py-2 rounded-md"
              >
                <FiPlus className="inline-block mr-1" />
                Tambah tes
              </Link>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : test?.length === 0 ? (
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-8">
              <p className="text-gray-500 text-center text-lg">
                Tidak ada data tes tersedia.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
              {test?.map((tes) => (
                <div
                  key={tes.id}
                  className="bg-white rounded-md p-4 md:p-6 shadow-sm hover:shadow-md border border-gray-200 hover:border-primary transition-all duration-300 cursor-pointer"
                >
                  <p className="text-primary font-bold text-lg mb-2">
                    {tes.name}
                  </p>
                  <p className="text-gray-600 mb-1 text-xs md:text-sm">
                    <span className="font-semibold">Tanggal:</span>{" "}
                    {toLocal(tes.date)}
                  </p>
                  <p className="text-gray-600 mb-1 text-xs md:text-sm">
                    <span className="font-semibold">Jumlah Siswa:</span>{" "}
                    {tes.grades.length}
                  </p>
                  <p className="text-gray-600 mb-4 text-xs md:text-sm">
                    <span className="font-semibold">Nama Pelatih:</span>{" "}
                    {tes.coach.name || "Tidak tersedia"}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <Link
                      to={`/admin/daftartes/penilaian/${tes.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200 text-xs md:text-sm"
                    >
                      <FiEye className="mr-1" size={16} />
                      Lihat Siswa
                    </Link>
                    <Link
                      to={`/admin/daftartes/edit/${tes.id}`}
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
                disabled={loadingHapus}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={loadingHapus}
                className={`px-4 py-2 rounded-md ${
                  loadingHapus
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-600 text-white"
                }`}
              >
                {loadingHapus ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DaftarTes;
