import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/Admin/Sidebar';
import AdminHeader from '../../../components/Admin/Header';

const EditSiswa = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Dummy data siswa (replace with fetch from API if needed)
  const siswaDummy = {
    id: 'S123',
    nama: 'Budi Santoso',
    jenisKelamin: 'Laki-laki',
    tempatLahir: 'Jakarta',
    tanggalLahir: '2010-05-10',
    usia: '14',
    level: 'U14',
    foto: '/path/to/foto.jpg',
    kk: '/path/to/kk.jpg',
    koperasi: '/path/to/koperasi.jpg',
    akta: '/path/to/akta.jpg',
    bpjs: '/path/to/bpjs.jpg',
  };

  const [formData, setFormData] = useState({
    id: '',
    nama: '',
    jenisKelamin: '',
    tempatLahir: '',
    tanggalLahir: '',
    usia: '',
    level: '',
  });

  const [files, setFiles] = useState({
    foto: null,
    kk: null,
    koperasi: null,
    akta: null,
    bpjs: null,
  });

  const [previews, setPreviews] = useState({});
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Simulasi fetch data siswa berdasarkan ID
  useEffect(() => {
    if (id) {
      setFormData({
        id: siswaDummy.id,
        nama: siswaDummy.nama,
        jenisKelamin: siswaDummy.jenisKelamin,
        tempatLahir: siswaDummy.tempatLahir,
        tanggalLahir: siswaDummy.tanggalLahir,
        usia: siswaDummy.usia,
        level: siswaDummy.level,
      });

      setPreviews({
        foto: siswaDummy.foto,
        kk: siswaDummy.kk,
        koperasi: siswaDummy.koperasi,
        akta: siswaDummy.akta,
        bpjs: siswaDummy.bpjs,
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const { id, files: fileList } = e.target;
    const file = fileList[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [id]: file }));
      setPreviews((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Data edited:', formData, files);
    setSuccessMessage('Data siswa berhasil diperbarui!');
    setTimeout(() => {
      navigate('/admin/siswa');
    }, 2000);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 px-6 py-8">
          <AdminHeader />
          <h2 className="text-black text-xl font-bold mb-6 mt-6">Edit Data Siswa</h2>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-4 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-6xl bg-white p-4 md:p-6 rounded-md border border-gray-200 shadow-sm"
          >
            <InputField label="ID Siswa" id="id" required onChange={handleChange} value={formData.id} />
            <FileUpload label="Foto Siswa" id="foto" onChange={handleFileChange} preview={previews.foto} />

            <InputField label="Nama" id="nama" required onChange={handleChange} value={formData.nama} />
            <SelectField label="Jenis Kelamin" id="jenisKelamin" required onChange={handleChange} value={formData.jenisKelamin} options={['Laki-laki', 'Perempuan']} />

            <InputField label="Tempat Lahir" id="tempatLahir" required onChange={handleChange} value={formData.tempatLahir} />
            <InputField label="Tanggal Lahir" id="tanggalLahir" type="date" required onChange={handleChange} value={formData.tanggalLahir} />

            <InputField label="Usia" id="usia" onChange={handleChange} value={formData.usia} />
            <SelectField label="Level" id="level" onChange={handleChange} value={formData.level} options={['U9', 'U10', 'U11', 'U12', 'U14']} />

            <FileUpload label="Kartu Keluarga" id="kk" onChange={handleFileChange} preview={previews.kk} />
            <FileUpload label="Kartu Koperasi" id="koperasi" onChange={handleFileChange} preview={previews.koperasi} />
            <FileUpload label="Akta Kelahiran" id="akta" onChange={handleFileChange} preview={previews.akta} />
            <FileUpload label="Kartu BPJS" id="bpjs" onChange={handleFileChange} preview={previews.bpjs} />
          </form>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => setShowSaveModal(true)}
              className="bg-primary text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/siswa')}
              className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>

          {/* Modal Konfirmasi Simpan */}
          {showSaveModal && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-none flex items-center justify-center z-50 px-4">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
                <h2 className="text-lg font-semibold mb-2">Konfirmasi Simpan</h2>
                <p className="text-sm text-gray-700 mb-4">
                  Apakah Anda yakin ingin menyimpan perubahan?
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

const InputField = ({ label, id, required, type = 'text', value, onChange }) => (
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

const FileUpload = ({ label, id, onChange, preview }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label}
    </label>
    {!preview ? (
      <>
        <label
          htmlFor={id}
          className="cursor-pointer rounded-md bg-white border border-gray-300 h-12 flex items-center justify-center text-sm text-gray-600"
        >
          Drag & Drop atau <span className="text-primary font-semibold ml-1">Browse</span>
        </label>
        <input id={id} type="file" onChange={onChange} className="hidden" />
      </>
    ) : (
      <div className="mt-3 border rounded overflow-hidden">
        <img src={preview} alt={`Preview ${id}`} className="w-full max-h-32 md:max-h-64 object-contain" />
      </div>
    )}
  </div>
);

export default EditSiswa;