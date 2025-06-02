import AdminSidebar from '../../components/Admin/Sidebar';
import AdminHeader from '../../components/Admin/Header';

const AdminDashboard = () => {
  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row  mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8">
          <AdminHeader />

          <div className="flex justify-between items-center mb-6 mt-6">
            <h1 className="text-xl font-bold text-black">Dashboard</h1>
            
          </div>

          {/* Summary cards */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {['Siswa', 'Pelatih', 'Orang Tua', 'Prestasi'].map((item, i) => (
              <div key={i} className="bg-[#1F3C86] rounded-lg p-4 shadow-sm text-white">
                <p className="text-sm font-medium mb-1">Total {item}</p>
                <p className="text-2xl font-bold">{i === 0 ? 200 : '—'}</p>
              </div>
            ))}
          </section>

          {/* Kehadiran */}
          <section className="mb-10">
            <h2 className="text-base font-semibold text-black mb-4">Kehadiran Terbaru</h2>
            <div className="overflow-x-auto bg-white rounded-md border border-gray-200 shadow-sm">
              <table className="w-full text-left table-auto">
                <thead className="bg-[#1F3C86] text-white">
                  <tr>
                    <th className="px-4 py-2 font-semibold ">Student Name</th>
                    <th className="px-4 py-2 font-semibold ">Date</th>
                    <th className="px-4 py-2 font-semibold ">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Alex</td>
                    <td className="px-4 py-2 text-gray-700">2023-12-12</td>
                    <td className="px-4 py-2"><span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Absent</span></td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Liam</td>
                    <td className="px-4 py-2 text-gray-700">2023-12-12</td>
                    <td className="px-4 py-2"><span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">Present</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Nilai */}
          <section>
            <h2 className="text-base font-semibold text-black mb-4">Nilai Terbaru</h2>
            <div className="overflow-x-auto bg-white rounded-md border border-gray-200 shadow-sm">
              <table className="w-full text-left table-auto">
                <thead className="bg-[#1F3C86] text-white">
                  <tr>
                    <th className="px-4 py-2 font-semibold ">Nama Siswa</th>
                    <th className="px-4 py-2 font-semibold ">Tanggal</th>
                    <th className="px-4 py-2 font-semibold ">Kelas</th>
                    <th className="px-4 py-2 font-semibold ">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Alex</td>
                    <td className="px-4 py-2 text-gray-700">2023-12-12</td>
                    <td className="px-4 py-2">Fisika</td>
                    <td className="px-4 py-2">A</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-2">Liam</td>
                    <td className="px-4 py-2 text-gray-700">2023-12-12</td>
                    <td className="px-4 py-2">—</td>
                    <td className="px-4 py-2">—</td>
                  </tr>
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
