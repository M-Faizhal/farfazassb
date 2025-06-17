import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "../../components/Admin/Header";
import AdminSidebar from "../../components/Admin/Sidebar";
import {
  Edit,
  Eye,
  Plus,
  Trash2,
  Trophy,
  Users,
  User,
  X,
  Calendar,
  Award,
  MapPin,
} from "lucide-react";
import Api from "../../utils/Api";
import { useToken } from "../../utils/Cookies";
import { toLocal } from "../../utils/dates";
import id from "dayjs/locale/id";
import toast from "react-hot-toast";

const Prestasi = () => {
  const [prestasiData, setPrestasiData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPrestasi, setSelectedPrestasi] = useState(null);
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const { getToken } = useToken();

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleOpenDetailModal = (prestasi) => {
    setSelectedPrestasi(prestasi);
    setShowDetailModal(true);
  };

  const handleDelete = () => {
    deletePrestasi();
    setShowModal(false);
  };

  const filteredPrestasi = prestasiData.filter((prestasi) => {
    if (filterKategori === "Semua") return true;
    if (filterKategori === "Tim") return prestasi.studentId === null;
    if (filterKategori === "Individu") return prestasi.studentId !== null;
    return true;
  });

  const sortedPrestasiList = [...filteredPrestasi].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const getPeringkatBadge = (peringkat) => {
    const badges = {
      1: "bg-yellow-100 text-yellow-800 border-yellow-200",
      2: "bg-gray-100 text-gray-800 border-gray-200",
      3: "bg-orange-100 text-orange-800 border-orange-200",
    };
    return badges[peringkat] || "bg-blue-100 text-blue-800 border-blue-200";
  };

  const getTingkatBadge = (tingkat) => {
    const badges = {
      Nasional: "bg-red-100 text-red-800",
      Regional: "bg-blue-100 text-blue-800",
      Lokal: "bg-green-100 text-green-800",
    };
    return badges[tingkat] || "bg-gray-100 text-gray-800";
  };

  const getAllPrestasi = async () => {
    setIsLoading(true);
    await Api.get("/admin/achievements", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => {
        setPrestasiData(res.data);
      })
      .catch(() => {
        toast.error("Gagal memuat prestasi");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deletePrestasi = async (id) => {
    await Api.delete("/admin/achievements/" + selectedId, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then(() => {
      toast.success("Sukses Menghapus Prestasi");
      getAllPrestasi();
    });
  };

  useEffect(() => {
    getAllPrestasi();
  }, []);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 mt-6 gap-4">
            <h1 className="text-xl font-bold text-black">Data Prestasi</h1>
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterKategori}
                onChange={(e) => setFilterKategori(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-primary"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Tim">Prestasi Tim</option>
                <option value="Individu">Prestasi Individu</option>
              </select>
              <Link
                to="/admin/prestasi/create"
                className="bg-primary text-white font-medium px-4 py-2 rounded-md inline-flex items-center"
              >
                <Plus className="mr-1" size={16} />
                Tambah Prestasi
              </Link>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : sortedPrestasiList.length === 0 ? (
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-8">
              <p className="text-gray-500 text-center text-lg">
                Tidak ada data prestasi tersedia.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {sortedPrestasiList.map((prestasi) => (
                <div
                  key={prestasi.id}
                  className="bg-white rounded-md p-4 md:p-6 shadow-sm hover:shadow-md border border-gray-200 hover:border-primary transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {prestasi.studentId === null ? (
                        <Users className="text-primary" size={20} />
                      ) : (
                        <User className="text-primary" size={20} />
                      )}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTingkatBadge(
                          prestasi.level
                        )}`}
                      >
                        {prestasi.level}
                      </span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-bold border ${getPeringkatBadge(
                        prestasi.place
                      )} flex items-center gap-1`}
                    >
                      <Trophy size={12} />
                      Juara {prestasi.place}
                    </div>
                  </div>

                  <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2 leading-tight line-clamp-2">
                    {prestasi.title}
                  </h2>

                  <div className="space-y-1 mb-4">
                    <p className="text-gray-600 text-xs md:text-sm">
                      <span className="font-semibold">Event:</span>{" "}
                      {prestasi.event}
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm">
                      <span className="font-semibold">Tanggal:</span>{" "}
                      {toLocal(prestasi.date)}
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm">
                      <span className="font-semibold">Kategori:</span>{" "}
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          prestasi.studentId === null
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {prestasi.studentId === null ? "Tim" : "Individu"}
                      </span>
                    </p>
                    {prestasi.student?.name && (
                      <p className="text-gray-600 text-xs md:text-sm">
                        <span className="font-semibold">Siswa:</span>{" "}
                        {prestasi.student.name}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-700 text-xs md:text-sm mb-4 line-clamp-2">
                    {prestasi.desc}
                  </p>

                  <div className="flex flex-col sm:flex-row justify-between gap-2 pt-2 border-t border-gray-100">
                    <button
                      onClick={() => handleOpenDetailModal(prestasi)}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200 text-xs md:text-sm"
                    >
                      <Eye className="mr-1" size={14} />
                      Detail
                    </button>
                    <Link
                      to={`/admin/prestasi/edit/${prestasi.id}`}
                      className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors duration-200 text-xs md:text-sm"
                    >
                      <Edit className="mr-1" size={14} />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleOpenModal(prestasi.id)}
                      className="inline-flex items-center text-red-600 hover:text-red-700 text-xs md:text-sm font-medium"
                    >
                      <Trash2 className="mr-1" size={14} />
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {showDetailModal && selectedPrestasi && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      selectedPrestasi.kategori === "Tim"
                        ? "bg-blue-100"
                        : "bg-purple-100"
                    }`}
                  >
                    {selectedPrestasi.kategori === "Tim" ? (
                      <Users className="text-primary" size={24} />
                    ) : (
                      <User className="text-primary" size={24} />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Detail Prestasi
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedPrestasi.id}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-bold border ${getPeringkatBadge(
                      selectedPrestasi.plac
                    )} flex items-center gap-2`}
                  >
                    <Trophy size={16} />
                    Juara {selectedPrestasi.place}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getTingkatBadge(
                      selectedPrestasi.level
                    )}`}
                  >
                    {selectedPrestasi.level}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedPrestasi.title}
                </h1>
                <p className="text-gray-600">{selectedPrestasi.event}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="text-primary" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Tanggal Event
                      </p>
                      <p className="text-gray-800">
                        {toLocal(selectedPrestasi.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="text-primary" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Tingkat Kompetisi
                      </p>
                      <p className="text-gray-800">{selectedPrestasi.level}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    {selectedPrestasi.studentId === null ? (
                      <Users className="text-primary" size={20} />
                    ) : (
                      <User className="text-primary" size={20} />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Kategori
                      </p>
                      <p className="text-gray-800">
                        {selectedPrestasi.studentId === null
                          ? "Tim"
                          : "Individu"}
                      </p>
                    </div>
                  </div>

                  {selectedPrestasi.student.name && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="text-primary" size={20} />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Nama Siswa
                        </p>
                        <p className="text-gray-800">
                          {selectedPrestasi.student.name}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Award className="text-primary" size={20} />
                    <div>
                      <p className="text-sm font-medium text-gray-700">
                        Peringkat
                      </p>
                      <p className="text-gray-800">
                        Juara {selectedPrestasi.place}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Deskripsi Prestasi
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">
                    {selectedPrestasi.desc}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                <Link
                  to={`/admin/prestasi/edit/${selectedPrestasi.id}`}
                  className="flex-1 bg-primary text-white font-medium px-4 py-2 rounded-md inline-flex items-center justify-center hover:bg-primary/90 transition-colors"
                >
                  <Edit className="mr-2" size={16} />
                  Edit Prestasi
                </Link>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleOpenModal(selectedPrestasi.id);
                  }}
                  className="flex-1 bg-red-600 text-white font-medium px-4 py-2 rounded-md inline-flex items-center justify-center hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="mr-2" size={16} />
                  Hapus Prestasi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold mb-2">Konfirmasi Hapus</h2>
            <p className="text-sm text-gray-700 mb-4">
              Apakah Anda yakin ingin menghapus data prestasi ini?
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

export default Prestasi;
