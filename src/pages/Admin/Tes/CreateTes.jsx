import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../components/Admin/Header';
import AdminSidebar from '../../../components/Admin/Sidebar';

const pelatihList = [
  { id: 'P001', nama: 'Bambang' },
  { id: 'P002', nama: 'Joko' },
  { id: 'P003', nama: 'Lathif' },
  { id: 'P004', nama: 'Bayu' },
];

const CreateTes = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaTes: '',
    tanggal: '',
    pelatih: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data yang dikirim:', formData);

    setSuccessMessage('Tes berhasil ditambahkan!');
    setTimeout(() => {
      navigate('/admin/daftartes');
    }, 2000);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h1 className="text-black text-xl font-bold mb-6 mt-6">
            Tambah Tes
          </h1>

          <form 
            onSubmit={(e) => e.preventDefault()} 
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm"
          >
            <InputField
              label="Nama Tes"
              id="namaTes"
              required
              value={formData.namaTes}
              onChange={handleChange}
            />
            <InputField
              label="Tanggal Tes"
              id="tanggal"
              type="date"
              required
              value={formData.tanggal}
              onChange={handleChange}
            />
            <SelectField
              label="Nama Pelatih"
              id="pelatih"
              required
              value={formData.pelatih}
              onChange={handleChange}
              options={pelatihList.map((p) => p.nama)}
            />
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
              onClick={() => navigate('/admin/daftartes')}
              className="bg-gray-200 cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Batal
            </button>
          </div>

          {/* Modal Konfirmasi */}
          {showModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-2">Konfirmasi Penambahan</h2>
                <div className="text-sm text-gray-800 space-y-1 mb-4">
                  <p><strong>Nama Tes:</strong> {formData.namaTes}</p>
                  <p><strong>Tanggal:</strong> {formData.tanggal}</p>
                  <p><strong>Pelatih:</strong> {formData.pelatih}</p>
                </div>
                <p className="text-sm text-gray-700 mb-4">Apakah Anda yakin ingin menambahkan tes ini?</p>
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

const InputField = ({ label, id, value, onChange, type = 'text', required }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black placeholder-gray-600 focus:outline-primary text-sm"
    />
  </div>
);

const SelectField = ({ label, id, options = [], value, onChange, required }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
      {required && <span className="text-red-600">*</span>}
    </label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm"
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

export default CreateTes;