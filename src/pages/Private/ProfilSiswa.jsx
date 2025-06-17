import UserSidebar from "../../components/Private/Sidebar";
import { useEffect, useState } from "react";
import { User, Calendar, Ruler, MapPin, Activity, Info } from "lucide-react";
import Api from "../../utils/Api";
import { useToken } from "../../utils/Cookies";
import { toLocal } from "../../utils/dates";

const ProfilSiswa = () => {
  const [student, setStudent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const { getToken } = useToken();

  const getChild = async () => {
    setIsLoading(true);
    await Api.get("/users/my-children", {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
      .then((res) => {
        setStudent(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getChild();
  }, []);

  const profileFields = [
    {
      label: "Nama Lengkap",
      value: student[0]?.name,
      icon: User,
      colSpan: "lg:col-span-2",
    },
    {
      label: "Jenis Kelamin",
      value:
        student[0]?.gender === "L"
          ? "Laki-laki"
          : student[0]?.gender === "P"
          ? "Perempuan"
          : "-",
      icon: Info,
      colSpan: "col-span-1",
    },
    {
      label: "Tempat Lahir",
      value: student[0]?.tempatLahir,
      icon: MapPin,
      colSpan: "col-span-1",
    },
    {
      label: "Tanggal Lahir",
      value: student[0]?.tanggalLahir
        ? toLocal(student[0].tanggalLahir)
        : "-",
      icon: Calendar,
      colSpan: "col-span-1",
    },
    {
      label: "Usia",
      value: student[0]?.age ? `${student[0].age} tahun` : "-",
      icon: Calendar,
      colSpan: "col-span-1",
    },
    {
      label: "Level",
      value: student[0]?.level,
      icon: Ruler,
      colSpan: "col-span-1",
    },
    {
      label: "Kategori BMI",
      value: student[0]?.kategoriBMI,
      icon: Activity,
      colSpan: "col-span-1",
    },
  ];

  const handleImageError = () => {
    setImageError(true);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 min-h-screen">
        <div className="flex flex-col md:flex-row mx-auto min-h-screen">
          <UserSidebar />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8 md:ml-64 w-full">
            <div className="w-full max-w-none">
              <div className="bg-white rounded-2xl border border-yellow-200 shadow-sm p-8">
                <div className="animate-pulse">
                  <div className="flex items-center justify-center h-32">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-300 rounded-full animate-spin"></div>
                      <p className="text-amber-700 font-medium">
                        Memuat data...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 min-h-screen">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <UserSidebar />

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 md:ml-64 w-full">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
                  Profil Siswa
                </h1>
                <p className="text-amber-700 text-sm md:text-base">
                  Informasi data pribadi siswa
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-none">
            <div className="bg-white rounded-2xl border border-yellow-200 shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-8 md:px-8">
                <div className="flex flex-col items-center justify-center">
                  {/* Photo Container - Made Larger */}
                  <div className="relative mb-6">
                    {imageError || !student[0]?.photoUrl ? (
                      <div className="w-40 h-40 md:w-48 md:h-48 bg-white/20 rounded-full border-4 border-white/30 flex items-center justify-center backdrop-blur-sm">
                        <User className="text-white" size={60} />
                      </div>
                    ) : (
                      <img
                        src={student[0].photoUrl}
                        alt="Foto Siswa"
                        className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-white shadow-xl object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      {student[0]?.name || "-"}
                    </h2>
                    <p className="text-yellow-100 text-sm md:text-base">
                      Informasi Biodata Siswa
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {profileFields.map((field, index) => (
                    <div key={index} className={`group ${field.colSpan}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center group-hover:bg-amber-100 transition-colors duration-200">
                          <field.icon className="text-amber-700" size={18} />
                        </div>
                        <div>
                          <p className="text-amber-700 text-sm font-medium">
                            {field.label}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-800 text-lg font-semibold ml-13 pl-0.5">
                        {field.value || "-"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilSiswa;
