// FULL CODE DENGAN LOADING PADA GET, ADD, DELETE
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import { sortIcon } from "../../../utils/sort";
import { useLocation, useParams } from "react-router-dom";
import Api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const AbsensiTanggal = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get("date");
  const { level } = useParams();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("nama");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showHapusModal, setShowHapusModal] = useState(false);
  const [selectedHapusId, setSelectedHapusId] = useState(null);
  const [tambahSiswaId, setTambahSiswaId] = useState("");
  const [siswa, setSiswa] = useState([]);
  const [kehadiran, setKehadiran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const { getToken } = useToken();

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredSiswa = kehadiran
    .filter((siswa) =>
      siswa.student.name.toLowerCase().includes(search.toLowerCase())
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

  const getData = async () => {
    setLoading(true);
    try {
      const absensiRes = await Api.get("/admin/attendance/date/" + selectedDate, {
        headers: { Authorization: "Bearer " + getToken() },
      });
      setKehadiran(absensiRes.data.filter((hadir) => hadir.student.level == level));

      const siswaRes = await Api.get("/admin/students", {
        headers: { Authorization: "Bearer " + getToken() },
      });

      const hadirIds = absensiRes.data.map((h) => h.studentId);
      setSiswa(
        siswaRes.data
          .filter((siswa) => !hadirIds.includes(siswa.id))
          .filter((s) => s.level == level)
      );
    } finally {
      setLoading(false);
    }
  };

  const getDataCoach = async () => {
    setLoading(true);
    try {
      const userId = jwtDecode(getToken()).userId;
      const absensiRes = await Api.get("/admin/attendance/date/" + selectedDate, {
        headers: { Authorization: "Bearer " + getToken() },
      });
      setKehadiran(
        absensiRes.data.filter(
          (hadir) => hadir.student.coachId == userId && hadir.student.level == level
        )
      );

      const siswaRes = await Api.get("/admin/students/coach/" + userId, {
        headers: { Authorization: "Bearer " + getToken() },
      });

      const hadirIds = absensiRes.data.map((h) => h.studentId);
      setSiswa(
        siswaRes.data
          .filter((siswa) => !hadirIds.includes(siswa.id))
          .filter((s) => s.level == level)
      );
    } finally {
      setLoading(false);
    }
  };

  const updateAttendance = async (id, present) => {
    setKehadiran((prev) =>
      prev.map((hadir) => (hadir.id === id ? { ...hadir, present } : hadir))
    );
    await Api.put(
      "/admin/attendance/" + id,
      {
        date: new Date(selectedDate),
        present,
      },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    ).catch(() => {
      toast.error("Gagal mengubah absensi");
    });
  };

  const createAttendance = async () => {
    setActionLoading(true);
    try {
      await Api.post(
        "/admin/attendance",
        {
          date: new Date(selectedDate),
          present: true,
          studentId: parseInt(tambahSiswaId),
        },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      );
      setTambahSiswaId("");
      const role = jwtDecode(getToken()).role;
      role === "SUPER_ADMIN" ? await getData() : await getDataCoach();
    } catch {
      toast.error("Gagal menambahkan siswa");
    } finally {
      setActionLoading(false);
    }
  };

  const handleHapusSiswa = async () => {
    setActionLoading(true);
    try {
      setKehadiran((prev) => prev.filter((s) => s.id !== selectedHapusId));
      setShowHapusModal(false);
      setSelectedHapusId(null);
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    const role = jwtDecode(getToken()).role;
    role === "SUPER_ADMIN" ? getData() : getDataCoach();
  }, [level, selectedDate]);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        <main className="flex-1 px-4 md:px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />
          <div className="flex justify-between items-start flex-col md:flex-row mb-6 mt-6 gap-4 md:gap-0">
            <div>
              <h1 className="text-xl font-bold text-black">Absensi Siswa {level}</h1>
              <p className="text-sm text-gray-600">Tanggal: {selectedDate || "-"}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <input
                type="text"
                placeholder="Cari nama siswa..."
                className="bg-gray-100 text-sm px-3 py-2 rounded-md w-full md:w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {jwtDecode(getToken()).role === "COACH" && (
                <div className="flex gap-2">
                  <select
                    onChange={(e) => setTambahSiswaId(e.target.value)}
                    className="bg-gray-100 px-3 py-2 rounded-md text-sm"
                  >
                    <option value="">Tambah siswa...</option>
                    {siswa.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  <button
                    onClick={createAttendance}
                    disabled={actionLoading || !tambahSiswaId}
                    className="bg-primary text-white px-4 py-2 rounded-md"
                  >
                    {actionLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : "Tambah"}
                  </button>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : filteredSiswa.length === 0 ? (
            <div className="bg-white rounded-md border border-gray-200 shadow-sm p-8">
              <p className="text-center text-gray-500 text-lg">Belum ada absensi hari ini.</p>
            </div>
          ) : (
            <div className="bg-white rounded-md border border-gray-200 shadow-sm mb-8">
              <table className="min-w-full text-sm text-left text-gray-700 hidden md:table">
                <thead className="bg-primary text-white font-semibold">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">Nama</th>
                    <th className="px-4 py-3">Jenis Kelamin</th>
                    <th className="px-4 py-3">Hadir?</th>
                    <th className="px-4 py-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSiswa.map((siswa) => (
                    <tr key={siswa.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium">{siswa.student.id}</td>
                      <td className="px-4 py-3">{siswa.student.name}</td>
                      <td className="px-4 py-3">{siswa.student.gender === "L" ? "Laki-Laki" : "Perempuan"}</td>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={siswa.present}
                          onChange={() => updateAttendance(siswa.id, !siswa.present)}
                          className="w-4 h-4"
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
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {showHapusModal && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">Hapus Siswa</h2>
            <p className="mb-4">Apakah Anda yakin ingin menghapus siswa ini dari daftar absensi?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowHapusModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-md"
              >Batal</button>
              <button
                onClick={handleHapusSiswa}
                disabled={actionLoading}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                {actionLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : "Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsensiTanggal;
