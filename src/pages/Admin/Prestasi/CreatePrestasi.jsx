import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../../components/Admin/Sidebar';
import AdminHeader from '../../../components/Admin/Header';
import { Trophy, Users, User } from 'lucide-react';

const CreatePrestasi = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: '',
    kategori: '',
    tanggal: '',
    tingkat: '',
    peringkat: '',
    deskripsi: '',
    namaAtlet: '',
    namaEvent: '',
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [id]: value,
      ...(id === 'kategori' && value === 'Tim' && { namaAtlet: '' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newId = `PRS${String(Date.now()).slice(-3).padStart(3, '0')}`;
    
    const prestasiData = {
      id: newId,
      ...formData,
      namaAtlet: formData.kategori === 'Tim' ? null : formData.namaAtlet,
    };

    console.log('Data prestasi baru:', prestasiData);
    setShowCreateModal(false);
    setSuccessMessage('Data prestasi berhasil ditambahkan!');
    setTimeout(() => {
      navigate('/admin/prestasi');
    }, 2000);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <div className="flex items-center gap-3 mb-6 mt-6">
            <Trophy className="text-primary" size={24} />
            <h2 className="text-black text-xl font-bold">Tambah Data Prestasi</h2>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm"
          >
            <InputField 
              label="Judul Prestasi" 
              id="judul" 
              required 
              onChange={handleChange} 
              value={formData.judul}
              placeholder="Contoh: Juara 1 Liga Junior Surabaya 2024"
            />
            
            <SelectField 
              label="Kategori Prestasi" 
              id="kategori" 
              required 
              onChange={handleChange} 
              value={formData.kategori} 
              options={['Tim', 'Individu']}
              icon={formData.kategori === 'Tim' ? <Users size={16} /> : formData.kategori === 'Individu' ? <User size={16} /> : null}
            />

            <InputField 
              label="Nama Event/Tournament" 
              id="namaEvent" 
              required 
              onChange={handleChange} 
              value={formData.namaEvent}
              placeholder="Contoh: Liga Junior Surabaya 2024"
            />

            <InputField 
              label="Tanggal Event" 
              id="tanggal" 
              type="date" 
              required 
              onChange={handleChange} 
              value={formData.tanggal} 
            />

            <SelectField 
              label="Tingkat Kompetisi" 
              id="tingkat" 
              required 
              onChange={handleChange} 
              value={formData.tingkat} 
              options={['Lokal', 'Regional', 'Nasional', 'Internasional']} 
            />

            <SelectField 
              label="Peringkat" 
              id="peringkat" 
              required 
              onChange={handleChange} 
              value={formData.peringkat} 
              options={['1', '2', '3', '4', '5', 'Lainnya']} 
            />

            {formData.kategori === 'Individu' && (
                <SelectField
                    label="Nama Siswa"
                    id="namaSiswa"
                    required
                    onChange={handleChange}
                    value={formData.namaSiswa}
                    options={['-- Pilih Siswa --', 'Siswa A', 'Siswa B', 'Siswa C']}
                    icon={<User size={16} />}
                />
            )}

            {formData.kategori === 'Tim' && (
                <div className="flex items-center justify-center p-4 bg-blue-50 rounded-md border border-blue-200">
                    <Users className="text-blue-600 mr-2" size={20} />
                    <span className="text-blue-800 font-medium">Prestasi Tim</span>
                </div>
            )}

            <div className="md:col-span-2">
                <InputField 
                    label="Deskripsi Prestasi" 
                    id="deskripsi" 
                    required 
                    onChange={handleChange} 
                    value={formData.deskripsi} 
                    isTextarea={true}
                    placeholder="Deskripsikan detail prestasi yang diraih..."
                />
            </div>
            </form>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="bg-primary cursor-pointer text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto inline-flex items-center justify-center"
                >
                    <Trophy className="mr-2" size={16} />
                    Create Achievement
                </button>
                <button
                    type="button"
                    onClick={() => navigate('/admin/prestasi')}
                    className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
                >
                    Cancel
                </button>
            </div>

          {showCreateModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy className="text-primary" size={20} />
                  <h2 className="text-lg font-semibold">Konfirmasi Tambah Prestasi</h2>
                </div>
                <div className="mb-4 space-y-2 text-sm">
                  <p><span className="font-medium">Judul:</span> {formData.judul}</p>
                  <p><span className="font-medium">Kategori:</span> {formData.kategori}</p>
                  <p><span className="font-medium">Peringkat:</span> Juara {formData.peringkat}</p>
                  <p><span className="font-medium">Tingkat:</span> {formData.tingkat}</p>
                  {formData.kategori === 'Individu' && formData.namaAtlet && (
                    <p><span className="font-medium">Atlet:</span> {formData.namaAtlet}</p>
                  )}
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Apakah data prestasi yang Anda masukkan sudah benar?
                </p>
                <div className="flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
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

const InputField = ({ label, id, required, type = 'text', value, onChange, isTextarea = false, placeholder, icon }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1 flex items-center gap-2">
      {icon}
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    {isTextarea ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        rows={4}
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

const SelectField = ({ label, id, options = [], required, value, onChange, icon }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1 flex items-center gap-2">
      {icon}
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
      <option value="">-- Pilih {label} --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default CreatePrestasi;