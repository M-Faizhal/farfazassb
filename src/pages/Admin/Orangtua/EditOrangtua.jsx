import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/Admin/Sidebar';
import AdminHeader from '../../../components/Admin/Header';

const EditOrangtua = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy data orangtua (replace with fetch from API if needed)
  const orangtuaDummy = {
    id: 1,
    nama: 'Budi Santoso',
    email: 'budi.santoso@email.com',
    noTelepon: '081234567890',
    alamat: 'Jl. Merdeka No. 123, Surabaya',
    namaAnak: 'AFIF BIMA SAID',
    idAnak: 'FZ1401',
    status: 'Aktif',
  };

  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
    noTelepon: '',
    alamat: '',
    namaAnak: '',
    idAnak: '',
    status: 'Aktif',
  });

  const [showSaveModal, setShowSaveModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Simulasi fetch data orangtua berdasarkan ID
  useEffect(() => {
    if (id) {
      setFormData({
        nama: orangtuaDummy.nama,
        email: orangtuaDummy.email,
        password: '', // Password tidak ditampilkan untuk keamanan
        confirmPassword: '',
        noTelepon: orangtuaDummy.noTelepon,
        alamat: orangtuaDummy.alamat,
        namaAnak: orangtuaDummy.namaAnak,
        idAnak: orangtuaDummy.idAnak,
        status: orangtuaDummy.status,
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Validasi password jika diisi
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    console.log('Data edited:', formData);
    setShowSaveModal(false);
    setSuccessMessage('Data akun orangtua berhasil diperbarui!');
    setTimeout(() => {
      navigate('/admin/orangtua');
    }, 2000);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h2 className="text-black text-xl font-bold mb-6 mt-6">Edit Akun Orang Tua</h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm"
          >
            <InputField 
              label="Nama Orangtua" 
              id="nama" 
              required 
              onChange={handleChange} 
              value={formData.nama} 
            />
            <InputField 
              label="Email" 
              id="email" 
              type="email" 
              required 
              onChange={handleChange} 
              value={formData.email} 
            />

            <InputField 
              label="Password Baru (Opsional)" 
              id="password" 
              type="password" 
              onChange={handleChange} 
              value={formData.password}
              placeholder="Kosongkan jika tidak ingin mengubah password"
            />
            <InputField 
              label="Konfirmasi Password Baru" 
              id="confirmPassword" 
              type="password" 
              onChange={handleChange} 
              value={formData.confirmPassword}
              placeholder="Ulangi password baru"
            />

            <InputField 
              label="No. Telepon" 
              id="noTelepon" 
              type="tel" 
              required 
              onChange={handleChange} 
              value={formData.noTelepon} 
            />
            <SelectField 
              label="Status" 
              id="status" 
              required 
              onChange={handleChange} 
              value={formData.status} 
              options={['Aktif', 'Nonaktif']} 
            />

            <div className="md:col-span-2">
              <InputField 
                label="Alamat" 
                id="alamat" 
                required 
                onChange={handleChange} 
                value={formData.alamat} 
                isTextarea={true}
              />
            </div>

            <InputField 
              label="Nama Anak" 
              id="namaAnak" 
              required 
              onChange={handleChange} 
              value={formData.namaAnak} 
            />
            <InputField 
              label="ID Anak" 
              id="idAnak" 
              required 
              onChange={handleChange} 
              value={formData.idAnak} 
            />
          </form>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="bg-primary cursor-pointer text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Update Account
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/orangtua')}
              className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>

          {showSaveModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-2">Konfirmasi Simpan</h2>
                <p className="text-sm text-gray-700 mb-4">
                  Apakah Anda yakin ingin menyimpan perubahan data akun orangtua ini?
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setShowSaveModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md w-full sm:w-auto"
                  >
                    Tinjau Ulang
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded-md w-full sm:w-auto"
                  >
                    Ya, Simpan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifikasi Sukses */}
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

const InputField = ({ label, id, required, type = 'text', value, onChange, isTextarea = false, placeholder }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    {isTextarea ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={3}
        placeholder={placeholder}
        className="rounded-md bg-[#E6EEFF] border border-gray-300 p-3 text-black placeholder-gray-600 focus:outline-primary text-sm resize-vertical"
        required={required}
      />
    ) : (
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black placeholder-gray-600 focus:outline-primary text-sm"
        required={required}
      />
    )}
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

export default EditOrangtua;