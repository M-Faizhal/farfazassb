import UserSidebar from "../../components/Private/Sidebar";
import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, Trophy } from "lucide-react";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data dummy
    const timer = setTimeout(() => {
      setUser({
        name: "Budi Santoso",
        email: "budi.santoso@gmail.com",
        telp: "08123456789",
        alamat: "Jl. Merdeka No. 123, Surabaya, Jawa Timur",
        namaAnak: "Siti Aminah",
        idAnak: "STD001234",
      });
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const profileFields = [
    {
      label: "Nama Orang Tua",
      value: user?.name,
      icon: User,
      colSpan: "col-span-1"
    },
    {
      label: "Email",
      value: user?.email,
      icon: Mail,
      colSpan: "col-span-1"
    },
    {
      label: "No. Telepon",
      value: user?.telp,
      icon: Phone,
      colSpan: "col-span-1"
    },
    {
      label: "Alamat",
      value: user?.alamat,
      icon: MapPin,
      colSpan: "lg:col-span-2"
    },
    {
      label: "Nama Siswa",
      value: user?.namaAnak,
      icon: Trophy,
      colSpan: "col-span-1"
    },
    {
      label: "ID Siswa",
      value: user?.idAnak,
      icon: User,
      colSpan: "col-span-1"
    }
  ];

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-amber-50 via-white to-yellow-50 min-h-screen">
        <div className="flex flex-col md:flex-row mx-auto min-h-screen">
          <UserSidebar />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8 md:ml-64 w-full">
            <div className="max-w-none">
              <div className="bg-white rounded-2xl border border-yellow-200 shadow-sm p-8">
                <div className="animate-pulse">
                  <div className="flex items-center justify-center h-32">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-300 rounded-full animate-spin"></div>
                      <p className="text-amber-700 font-medium">Memuat data...</p>
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

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8 md:ml-64">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-amber-800 mb-2">
                  Data Orang Tua
                </h1>
                <p className="text-amber-700 text-sm md:text-base">
                  Informasi profil orang tua siswa sepak bola
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full max-w-none">
            <div className="bg-white rounded-2xl border border-yellow-200 shadow-lg overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-8 md:px-8">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full border-4 border-white/30 flex items-center justify-center backdrop-blur-sm">
                    <User className="text-white" size={32} />
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-white mb-1">
                      {user?.name || '-'}
                    </h2>
                    <p className="text-yellow-100 text-sm">
                      Informasi Profil Pengguna
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
                      <p className={`text-gray-800 text-lg font-semibold ml-13 pl-0.5 ${
                        field.label === "Email" ? "break-all" : ""
                      }`}>
                        {field.value || '-'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="bg-amber-50 px-6 py-4 md:px-8 border-t border-yellow-200">
                <p className="text-amber-700 text-sm text-center">
                  Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;