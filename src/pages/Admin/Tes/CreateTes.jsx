import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminHeader from '../../../components/Admin/Header';
import AdminSidebar from '../../../components/Admin/Sidebar';

const pelatihList = [
  { id: 'P001', nama: 'Bambang' },
  { id: 'P002', nama: 'Joko' },
  { id: 'P003', nama: 'Lathif' },
  { id: 'P004', nama: 'Bayu' },
];

const CreateTes = () => {
  const { tesId } = useParams();
  const isEdit = Boolean(tesId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    namaTes: '',
    tanggal: '',
    pelatih: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isEdit) {
      // Fetch data tes by ID (dummy)
      const dummyData = {
        namaTes: 'Tes Fisik Dasar',
        tanggal: '2025-06-10',
        pelatih: 'Joko',
      };
      setFormData(dummyData);
    }
  }, [tesId, isEdit]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data yang dikirim:', formData);

    setSuccessMessage(isEdit ? 'Tes berhasil diperbarui!' : 'Tes berhasil ditambahkan!');
    setTimeout(() => {
      navigate('/admin/daftartes');
    }, 2000);
  };

  return (
    <div className="flex min-h-screen bg-[#f7f7f7]">
      <AdminSidebar />
      <main className="flex-1 p-6">
        <AdminHeader />

        <h1 className="text-xl font-bold text-black mb-6 mt-6">
          {isEdit ? 'Edit Tes' : 'Tambah Tes'}
        </h1>

        <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 max-w-4xl bg-white p-6 rounded-md shadow">
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

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-primary text-white font-semibold px-4 py-2 rounded-md"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/daftartes')}
            className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-md"
          >
            Batal
          </button>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
              <h2 className="text-lg font-semibold mb-2">Konfirmasi {isEdit ? 'Perubahan' : 'Penambahan'}</h2>
              <p className="text-sm text-gray-700 mb-4">Apakah Anda yakin ingin {isEdit ? 'menyimpan perubahan ini' : 'menambahkan tes ini'}?</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">Tinjau Ulang</button>
                <button onClick={handleSubmit} className="px-4 py-2 bg-primary text-white rounded-md">Ya, Simpan</button>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-3 rounded-md shadow-lg z-50">
            {successMessage}
          </div>
        )}
      </main>
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
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black placeholder-gray-600 focus:outline-primary"
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
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary"
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
