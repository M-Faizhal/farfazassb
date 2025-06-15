import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/Admin/Sidebar";
import AdminHeader from "../../../components/Admin/Header";
import Api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";

const DetailOrangtua = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useToken();

  const [userData, setUserData] = useState(null);

  const getUserById = async () => {
    await Api.get("/admin/users/" + id, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    }).then((res) => {
      setUserData(res.data);
    });
  };

  useEffect(() => {
    if (id) {
      getUserById();
    }
  }, [id]);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h2 className="text-black text-xl font-bold mb-6 mt-6">
            Detail Akun Orang Tua
          </h2>

          {userData && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm">
              <ReadOnlyField label="Nama Orang Tua" value={userData.name} />
              <ReadOnlyField label="Email" value={userData.email} />
              <ReadOnlyField label="No. Telepon" value={userData.telp} />
              <ReadOnlyField label="Status" value={userData.status ? "Aktif" : "Nonaktif"} />
              <div className="md:col-span-2">
                <ReadOnlyField label="Alamat" value={userData.address} isTextarea={true} />
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/orangtua")}
              className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Kembali
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

const ReadOnlyField = ({ label, value, isTextarea = false }) => (
  <div className="flex flex-col">
    <label className="text-sm text-black mb-1">{label}</label>
    {isTextarea ? (
      <textarea
        value={value || "-"}
        readOnly
        className="rounded-md bg-[#E6EEFF] border border-gray-300 p-3 text-black placeholder-gray-600 focus:outline-none text-sm resize-none"
      />
    ) : (
      <input
        type="text"
        value={value || "-"}
        readOnly
        className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black text-sm"
      />
    )}
  </div>
);

export default DetailOrangtua;
