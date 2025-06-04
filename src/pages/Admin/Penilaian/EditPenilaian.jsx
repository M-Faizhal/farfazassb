import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../../../components/Admin/Sidebar';
import AdminHeader from '../../../components/Admin/Header';

const daftarSiswa = ['Budi', 'Ani', 'Joko'];
const daftarPelatih = ['Coach A', 'Coach B', 'Coach C'];
const kategoriSkala = ['Kurang', 'Cukup', 'Baik', 'Sangat Baik'];

const dummyPenilaian = {
  namaSiswa: 'Budi',
  tanggalTes: '2025-06-01',
  namaPelatih: 'Coach A',
  tinggiBadan: '170',
  beratBadan: '65',
  bmi: '22.5',
  kategoriBmi: 'Normal',
  tinggiDuduk: '90',
  panjangTungkai: '80',
  rentangLengan: '175',
  denyutNadi: '70',
  saturasiOksigen: '98',
  boardJump: '220',
  kecepatan: '5.5',
  dayaTahan: '12',
  ControllingTungkaiKanan: 'Baik',
  ControllingTungkaiKiri: 'Cukup',
  Dribbling: 'Baik',
  LongpassTungkaiKanan: 'Sangat Baik',
  LongpassTungkaiKiri: 'Cukup',
  ShortpassTungkaiKanan: 'Baik',
  ShortpassTungkaiKiri: 'Baik',
  ShootingTungkaiKanan: 'Baik',
  ShootingTungkaiKiri: 'Cukup',
  disiplin: 'Baik',
  komitmen: 'Sangat Baik',
  percayaDiri: 'Baik',
  injuryDetail: 'Pernah cedera hamstring bulan lalu.',
  comment: 'Performa bagus, tetap jaga kebugaran.'
};

const EditPenilaian = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setFormData(dummyPenilaian);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Form Data:', formData);
    setSuccessMessage('Data penilaian berhasil diperbarui!');
    setTimeout(() => navigate('/admin/daftartes/penilaian'), 2000);
  };

  return (
    <div className="bg-[#f7f7f7] min-h-screen text-sm text-[#333]">
      <div className="flex flex-col md:flex-row mx-auto min-h-screen">
        <AdminSidebar />
        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />
          <h2 className="text-black text-xl font-bold mb-6 mt-6">Edit Penilaian</h2>

          <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded-md border border-gray-200 shadow-sm max-w-6xl">
            <SelectField label="Nama Siswa" id="namaSiswa" options={daftarSiswa} required value={formData.namaSiswa} onChange={handleChange} />
            <InputField label="Tanggal Tes" id="tanggalTes" type="date" required value={formData.tanggalTes || ''} onChange={handleChange} />
            <SelectField label="Nama Pelatih" id="namaPelatih" options={daftarPelatih} required value={formData.namaPelatih} onChange={handleChange} />

            <Section title="Antropometri">
              {[
                ['tinggiBadan', 'Tinggi Badan (cm)'],
                ['beratBadan', 'Berat Badan (kg)'],
                ['bmi', 'Body Mass Index (kg/m²)'],
                ['kategoriBmi', 'Kategori BMI'],
                ['tinggiDuduk', 'Tinggi Duduk (cm)'],
                ['panjangTungkai', 'Panjang Tungkai (cm)'],
                ['rentangLengan', 'Rentang Lengan (cm)']
              ].map(([id, label]) => (
                <InputField key={id} id={id} label={label} value={formData[id] || ''} onChange={handleChange} />
              ))}
            </Section>

            <Section title="Fisiologi">
              <InputField id="denyutNadi" label="Denyut Nadi Istirahat (bpm)" value={formData.denyutNadi || ''} onChange={handleChange} />
              <InputField id="saturasiOksigen" label="Saturasi Oksigen (%)" value={formData.saturasiOksigen || ''} onChange={handleChange} />
            </Section>

            <Section title="Komponen Biomotor">
              {[
                ['boardJump', 'Tes Standing Board Jump (cm)'],
                ['kecepatan', 'Tes Kecepatan (detik)'],
                ['dayaTahan', 'Tes Daya Tahan (menit)']
              ].map(([id, label]) => (
                <InputField key={id} id={id} label={label} value={formData[id] || ''} onChange={handleChange} />
              ))}
            </Section>

            <Section title="Keterampilan">
              {[
                "ControllingTungkaiKanan",
                "ControllingTungkaiKiri",
                "Dribbling",
                "LongpassTungkaiKanan",
                "LongpassTungkaiKiri",
                "ShortpassTungkaiKanan",
                "ShortpassTungkaiKiri",
                "ShootingTungkaiKanan",
                "ShootingTungkaiKiri"
              ].map((id) => (
                <SelectField
                  key={id}
                  id={id}
                  label={id.replace(/([A-Z])/g, ' $1')}
                  options={kategoriSkala}
                  value={formData[id] || ''}
                  onChange={handleChange}
                />
              ))}
            </Section>

            <Section title="Psikologi">
              {["disiplin", "komitmen", "percayaDiri"].map((id) => (
                <SelectField
                  key={id}
                  id={id}
                  label={id.charAt(0).toUpperCase() + id.slice(1)}
                  options={kategoriSkala}
                  value={formData[id] || ''}
                  onChange={handleChange}
                />
              ))}
            </Section>

            {/* Cedera dan Komentar berdampingan dan tinggi sama */}
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextAreaField
                label="Detail Cedera"
                id="injuryDetail"
                value={formData.injuryDetail || ''}
                onChange={handleChange}
                placeholder="Masukkan detail cedera jika ada"
                className="h-full"
              />
              <TextAreaField
                label="Komentar"
                id="comment"
                value={formData.comment || ''}
                onChange={handleChange}
                placeholder="Masukkan komentar tambahan di sini..."
                className="h-full"
              />
            </div>
          </form>

          <div className="mt-6 flex gap-3">
            <button onClick={() => setShowModal(true)} className="bg-primary text-white font-semibold px-4 py-2 rounded-md">Update</button>
            <button onClick={() => navigate('/admin/daftartes/penilaian')} className="bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-md">Cancel</button>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-3">Konfirmasi Update</h2>
                <p>Apakah Anda yakin ingin memperbarui data ini?</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button onClick={() => setShowModal(false)} className="bg-gray-200 px-4 py-2 rounded">Tinjau Ulang</button>
                  <button onClick={handleSubmit} className="bg-primary text-white px-4 py-2 rounded">Ya, Simpan</button>
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
    </div>
  );
};

const InputField = ({ label, id, type = 'text', required, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label} {required && <span className="text-red-600">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="rounded-md bg-[#E6EEFF] border border-gray-300 h-10 px-3 text-black focus:outline-primary text-sm"
    />
  </div>
);

const SelectField = ({ label, id, options = [], required, value, onChange }) => (
  <div className="flex flex-col">
    <label htmlFor={id} className="text-sm text-black mb-1">
      {label} {required && <span className="text-red-600">*</span>}
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
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const TextAreaField = ({ label, id, value, onChange, rows = 4, placeholder, className = '' }) => (
  <div className={`flex flex-col w-full ${className}`}>
    <label htmlFor={id} className="text-sm text-black mb-1">{label}</label>
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full h-full rounded-md bg-[#E6EEFF] border border-gray-300 px-3 py-2 text-black placeholder-gray-600 focus:outline-primary text-sm resize-none"
    />
  </div>
);

const Section = ({ title, children }) => (
  <div className="col-span-2">
    <h3 className="text-base font-semibold mb-2 mt-4 text-[#1F3C86]">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

export default EditPenilaian;
