import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/Admin/Sidebar';
import AdminHeader from '../../../components/Admin/Header';
import Api from '../../../utils/Api';
import { useToken } from '../../../utils/Cookies';

const DetailPelatih = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getToken } = useToken();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCoachById = async () => {
    try {
      setLoading(true);
      const res = await Api.get(`/admin/coaches/${id}`, {
        headers: { Authorization: 'Bearer ' + getToken() },
      });
      setCoach(res.data);
    } catch (err) {
      console.error('Gagal mengambil data pelatih:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoachById();
  }, [id]);

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h2 className="text-black text-xl font-bold mb-6 mt-6">Detail Pelatih</h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : coach ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-md border border-gray-200 shadow-sm max-w-6xl">
              <FilePreview label="Foto Pelatih" src={coach.photoUrl} />
              <TextPreview label="Nama" value={coach.name} />
              <TextPreview label="Email" value={coach.email} />
              <TextPreview label="No. Telepon" value={coach.telp} />
              <TextPreview
                label="Jenis Kelamin"
                value={coach.gender === 'L' ? 'Laki-Laki' : 'Perempuan'}
              />
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500 italic">
              Data pelatih tidak ditemukan.
            </div>
          )}

          {loading ? null : (
            <div className="mt-6 flex flex-col sm:flex-row gap-3 ">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto "
              >
                Kembali
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const TextPreview = ({ label, value }) => (
  <div className="flex flex-col">
    <label className="text-sm text-black mb-1 font-medium">{label}</label>
    <p className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 flex items-center text-black text-sm">
      {value || '-'}
    </p>
  </div>
);

const FilePreview = ({ label, src }) => (
  <div className="flex flex-col">
    <label className="text-sm text-black mb-1 font-medium">{label}</label>
    {src ? (
      <div className="mt-1 border rounded overflow-hidden">
        <img
          src={src}
          alt={`Preview ${label}`}
          className="w-full max-h-32 md:max-h-64 object-contain"
        />
      </div>
    ) : (
      <p className="text-sm italic text-gray-500">Belum diunggah</p>
    )}
  </div>
);

export default DetailPelatih;
