import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/Admin/Sidebar';
import AdminHeader from '../../../components/Admin/Header';
import { Eye, EyeOff } from 'lucide-react';

const EditPelatih = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // misalnya: /admin/pelatih/edit/:id
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    sertifikasi: '',
    password: '',
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch data pelatih by ID (dummy fetch logic)
  useEffect(() => {
    // Ganti ini dengan fetch asli dari API
    const dummyData = {
      nama: 'Pelatih A',
      email: 'pelatih@email.com',
      sertifikasi: 'B',
      fotoUrl: '/path/to/foto.jpg',
    };
    setFormData((prev) => ({
      ...prev,
      nama: dummyData.nama,
      email: dummyData.email,
      sertifikasi: dummyData.sertifikasi,
    }));
    setPreview(dummyData.fotoUrl);
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data yang dikirim ke backend:', formData, foto);

    // Kirim ke backend: jika password kosong, backend abaikan
    setSuccessMessage('Data pelatih berhasil diperbarui!');
    setTimeout(() => {
      navigate('/admin/pelatih');
    }, 2000);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 px-6 py-8">
          <AdminHeader />
          
          <h2 className="text-black text-xl font-bold mb-6 mt-6">Edit Data Pelatih</h2>

          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm"
          >
            <InputField label="Nama" id="nama" required value={formData.nama} onChange={handleChange} />
            <InputField label="Email" id="email" required value={formData.email} onChange={handleChange} />

            <SelectField
              label="Sertifikasi"
              id="sertifikasi"
              required
              value={formData.sertifikasi}
              onChange={handleChange}
              options={['A', 'B', 'C', 'D']}
            />

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm text-black mb-1">
                Password <span className="text-gray-500">(kosongkan jika tidak diubah)</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Isi jika ingin ubah password"
                  className="w-full rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 pr-10 text-black placeholder-gray-600 focus:outline-primary text-sm"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="foto" className="text-sm text-black mb-1">Foto</label>
              {!preview ? (
                <>
                  <label htmlFor="foto" className="cursor-pointer rounded-md bg-white border border-gray-300 h-12 flex items-center justify-center text-sm text-gray-600">
                    Drag & Drop atau <span className="text-primary font-semibold ml-1">Browse</span>
                  </label>
                  <input id="foto" type="file" onChange={handleFotoChange} className="hidden" />
                </>
              ) : (
                <div className="mt-3 border rounded overflow-hidden">
                  <img src={preview} alt="Preview" className="w-full max-h-32 md:max-h-64 object-contain" />
                </div>
              )}
            </div>
          </form>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="bg-primary cursor-pointer text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Simpan
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/pelatih')}
              className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Batal
            </button>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-2">Konfirmasi Perubahan</h2>
                <p className="text-sm text-gray-700 mb-4">Apakah Anda yakin ingin menyimpan perubahan ini?</p>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button 
                    onClick={() => setShowModal(false)} 
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md w-full sm:w-auto"
                  >
                    Tinjau Ulang
                  </button>
                  <button 
                    onClick={handleSubmit} 
                    className="px-4 py-2 bg-primary text-white rounded-md w-full sm:w-auto"
                  >
                    Ya, Simpan
                  </button>
                </div>
              </div>
            </div>
          )}

          {successMessage && (
            <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-md shadow-lg z-50 mx-4">
              {successMessage}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

const InputField = ({ label, id, required, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      value={value}
      onChange={onChange}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black placeholder-gray-600 focus:outline-primary text-sm"
      required={required}
    />
  </div>
);

const SelectField = ({ label, id, options = [], required, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm"
      required={required}
    >
      <option value="">-- Pilih --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default EditPelatih;