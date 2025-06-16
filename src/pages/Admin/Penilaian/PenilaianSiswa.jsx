import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import { sortIcon } from "../../../utils/sort";
import Api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { toLocal } from "../../../utils/dates";
import { FaPlus } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const PenilaianSiswa = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [addId, setAddId] = useState();
  const [nama, setNama] = useState();
  const [siswa, setSiswa] = useState([]);
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getToken } = useToken();
  const { id } = useParams();

  const removeGrades = async (id) => {
    await Api.delete(`/admin/grades/${id}`, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then(() => {
        toast.success("Sukses menghapus penilaian");
        getTestById();
      })
      .catch(() => {
        toast.error("Error menghapus penilaian");
      });
  };

  const getTestById = async () => {
    const response = await Api.get("/admin/tests/" + id, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    });
    setTest(response.data);
    return response.data;
  };

  const getAllSiswa = async (testData) => {
    const response = await Api.get(
      "/admin/students/coach/" + jwtDecode(getToken()).userId,
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    );
    const siswaList = response.data;
    const filtered = testData.grades.length
      ? siswaList.filter(
          (s) => !testData.grades.some((g) => g.student.id === s.id)
        )
      : siswaList;
    setSiswa(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testData = await getTestById();
        await getAllSiswa(testData);
      } catch (err) {
        toast.error("Gagal memuat data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

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
    removeGrades(selectedId);
    setShowModal(false);
  };

  const filteredSiswa =
    test?.grades
      ?.filter((siswa) =>
        siswa?.student?.name?.toLowerCase().includes(search.toLowerCase())
      )
      ?.sort((a, b) => {
        const valA = a?.student?.[sortField];
        const valB = b?.student?.[sortField];

        if (typeof valA === "string") {
          return sortOrder === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        } else {
          return sortOrder === "asc" ? valA - valB : valB - valA;
        }
      }) ?? [];

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h2 className="text-2xl font-bold text-black mb-1">Detail Tes</h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
 
              <div className="mb-6">
                <div className="bg-white p-4 rounded-md shadow border text-sm space-y-1">
                  <p>
                    <span className="font-medium">ID Tes:</span> {test?.id}
                  </p>
                  <p>
                    <span className="font-medium">Tanggal Tes:</span>{" "}
                    {toLocal(test?.date)}
                  </p>
                  <p>
                    <span className="font-medium">Pelatih:</span>{" "}
                    {test?.coach.name}
                  </p>
                  <p>
                    <span className="font-medium">Jumlah Siswa:</span>{" "}
                    {test?.grades.length}
                  </p>
                </div>
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
                  {jwtDecode(getToken()).role === "COACH" && (
                    <div className="flex flex-row gap-3">
                      <select
                        className="outline-none border-1 rounded-lg px-3 py-2"
                        onChange={(e) => {
                          setAddId(e.target.value.split(",")[0]);
                          setNama(e.target.value.split(",")[1]);
                        }}
                      >
                        <option value={null}>Tambah Siswa</option>
                        {siswa?.map((s) => (
                          <option key={s.id} value={`${s.id},${s.name}`}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() =>
                          addId &&
                          navigate(
                            `/admin/daftartes/penilaian/create/${addId}?test=${id}&nama=${nama}&tanggal=${toLocal(
                              test.date
                            )}`
                          )
                        }
                        className="cursor-pointer bg-primary text-white flex flex-row px-5 py-3 rounded-lg font-semibold"
                      >
                        <FaPlus size={20} />
                        <p>Tambah Penilaian</p>
                      </button>
                    </div>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm text-left text-gray-700">
                    <thead className="bg-primary text-white font-semibold">
                      <tr>
                        <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("id")}>
                          ID Siswa {sortIcon(sortField, "id")}
                        </th>
                        <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("nama")}>
                          Nama {sortIcon(sortField, "nama")}
                        </th>
                        <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("jenisKelamin")}>
                          Jenis Kelamin {sortIcon(sortField, "jenisKelamin")}
                        </th>
                        <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("usia")}>
                          Usia {sortIcon(sortField, "usia")}
                        </th>
                        <th className="px-4 py-3 cursor-pointer" onClick={() => handleSort("level")}>
                          Level {sortIcon(sortField, "level")}
                        </th>
                        <th className="px-4 py-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSiswa.length > 0 ? (
                        filteredSiswa.map((s) => (
                          <tr key={s.id} className="border-t border-gray-200 hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{s.student.id}</td>
                            <td className="px-4 py-3">{s.student.name}</td>
                            <td className="px-4 py-3">
                              {s.student.gender === "L" ? "Laki-Laki" : "Perempuan"}
                            </td>
                            <td className="px-4 py-3">{s.student.age}</td>
                            <td className="px-4 py-3">{s.student.level}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-3">
                                <Link
                                  to={`/admin/daftartes/penilaian/edit/${s.student.id}?test=${id}&nama=${s.student.name}&tanggal=${toLocal(
                                    test.date
                                  )}&grade=${s.id}`}
                                >
                                  <FiEdit className="text-primary w-5 h-5 hover:scale-110" />
                                </Link>
                                <button onClick={() => handleOpenModal(s.id)}>
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
            </>
          )}
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

export default PenilaianSiswa;
