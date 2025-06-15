import AdminSidebar from "../../components/Admin/Sidebar";
import AdminHeader from "../../components/Admin/Header";
import { useEffect, useState } from "react";
import Api from "../../utils/Api";
import { useToken } from "../../utils/Cookies";
import { jwtDecode } from "jwt-decode";
import { toLocal } from "../../utils/dates";

const AdminDashboard = () => {
  const [siswa, setSiswa] = useState([]);
  const [pelatih, setPelatih] = useState([]);
  const [orangTua, setOrangTua] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const { getToken } = useToken();

  const getAllOrangTua = async () => {
    await Api.get("/admin/users", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setOrangTua(res.data);
    });
  };

  const getAllPelatih = async () => {
    await Api.get("/admin/coaches", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setPelatih(res.data);
    });
  };

  const getSiswaByCoach = async () => {
    await Api.get("/admin/students/coach/" + jwtDecode(getToken()).userId, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setSiswa(res.data);
    });
  };

  const getAllSiswa = async () => {
    await Api.get("/admin/students", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setSiswa(res.data);
    });
  };

  const getTodayAttendance = async () => {
    await Api.get(
      "/admin/attendance/date/" + new Date().toISOString().slice(0, 10),
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    ).then((res) => {
      if (jwtDecode(getToken()).role == "SUPER_ADMIN") {
        setAttendance(res.data);
      } else {
        console.log(res.data);
        setAttendance(
          res.data.filter(
            (absen) => absen.student.coachId === jwtDecode(getToken()).userId
          )
        );
      }
    });
  };

  useEffect(() => {
    const role = jwtDecode(getToken()).role;
    switch (role) {
      case "SUPER_ADMIN":
        getAllSiswa();
        break;

      case "COACH":
        getSiswaByCoach();
        break;
    }
    getAllPelatih();
    getAllOrangTua();
    getTodayAttendance();
  }, []);

  return (
    <div className="bg-white min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row  mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Dashboard</h1>
          </div>

          {/* Summary cards */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Siswa", value: siswa.length },
              { label: "Pelatih", value: pelatih.length },
              { label: "Orang tua", value: orangTua.length },
              { label: "Prestasi", value: 0 },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-primary rounded-lg p-4 shadow-sm text-white"
              >
                <p className="text-sm font-medium mb-1">Total {item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </section>

          {/* Kehadiran */}
          <section className="mb-10">
            <h2 className="text-base font-semibold text-black mb-4">
              Kehadiran Hari Ini
            </h2>
            <div className="overflow-x-auto bg-white rounded-md border border-gray-200 shadow-sm">
              <table className="w-full text-left table-auto">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-2 font-semibold ">Nama Siswa</th>
                    <th className="px-4 py-2 font-semibold ">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length === 0 ? (
                    <tr>
                      <td
                        colSpan="2"
                        className="text-center py-4 text-gray-500"
                      >
                        Belum ada data kehadiran hari ini.
                      </td>
                    </tr>
                  ) : (
                    attendance.map((absen, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-4 py-2">{absen.student.name}</td>
                        <td className="px-4 py-2">
                          <span
                            className={`${
                              absen.present ? "bg-green-600" : "bg-red-600"
                            } text-white px-3 py-1 rounded-full text-xs font-semibold`}
                          >
                            {absen.present ? "Hadir" : "Absen"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
