import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Api from '../../utils/Api';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaInstagram, FaFacebook, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [students, setStudents] = useState([]);
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsRes, coachesRes] = await Promise.all([
          Api.get("/public/students/"),
          Api.get("/public/coaches/")
        ]);
        setStudents(studentsRes.data || []);
        setCoaches(coachesRes.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  // Contact information - updated with Indonesian phone number
  const contactInfo = [
    {
      icon: FaPhone,
      title: "Telepon",
      value: "+62 812 3317 9929",
      description: "Hubungi kami untuk informasi cepat",
      color: "from-blue-500 to-blue-600",
      href: "tel:+6281233179929"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp", 
      value: "+62 812 3317 9929",
      description: "Chat langsung dengan kami",
      color: "from-green-500 to-green-600",
      href: "https://wa.me/6281233179929"
    },
    {
      icon: FaEnvelope,
      title: "Email",
      value: "farfazafcsurabaya@gmail.com",
      description: "Kirim email untuk pertanyaan detail",
      color: "from-purple-500 to-purple-600",
      href: "mailto:farfazafcsurabaya@gmail.com"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Alamat",
      value: "Jl. Taman Kalikepiting Indah No 1 Surabaya",
      description: "Kunjungi fasilitas latihan kami",
      color: "from-red-500 to-red-600",
      href: "#"
    }
  ];

  const operationalHours = [
    { day: "Senin - Jumat", time: "15:00 - 20:00 WIB" },
    { day: "Sabtu", time: "08:00 - 20:00 WIB" },
    { day: "Minggu", time: "08:00 - 18:00 WIB" }
  ];

  const socialMedia = [
    { 
      icon: FaWhatsapp, 
      name: "WhatsApp", 
      color: "bg-green-500 hover:bg-green-600", 
      link: "https://wa.me/6281233179929"
    },
    { 
      icon: FaInstagram, 
      name: "Instagram", 
      color: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700", 
      link: "https://www.instagram.com/farfazafcsurabaya/?hl=id",
      followers: "4.6K"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <main className="pt-24 md:pt-28">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Hubungi Kami
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Kami siap membantu Anda dengan informasi tentang program pelatihan, pendaftaran, dan pertanyaan lainnya
            </p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                          transform hover:-translate-y-3 p-6 text-center group border border-gray-100 block"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${info.color} 
                              flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <info.icon className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {info.title}
                </h3>
                <p className="text-gray-900 font-semibold mb-2 text-sm break-words">{info.value}</p>
                <p className="text-gray-500 text-sm">{info.description}</p>
              </a>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <FaPaperPlane className="text-blue-600 text-2xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Kirim Pesan</h2>
              </div>
              
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda dalam 1x24 jam.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="contoh@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subjek *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Pilih subjek pesan</option>
                    <option value="pendaftaran">Informasi Pendaftaran</option>
                    <option value="biaya">Informasi Biaya</option>
                    <option value="jadwal">Jadwal Latihan</option>
                    <option value="fasilitas">Fasilitas</option>
                    <option value="lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Pesan *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Tuliskan pesan atau pertanyaan Anda di sini..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-1'
                  } text-white shadow-lg`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Operational Hours */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center mb-4">
                  <FaClock className="text-blue-600 text-xl mr-3" />
                  <h3 className="text-xl font-bold text-gray-800">Jam Operasional</h3>
                </div>
                <div className="space-y-3">
                  {operationalHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-700 font-medium">{schedule.day}</span>
                      <span className="text-blue-600 font-semibold">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Ikuti Media Sosial</h3>
                <p className="text-gray-600 mb-6 text-sm">Dapatkan update terbaru tentang kegiatan dan prestasi SSB Farfaza</p>
                <div className="space-y-3">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-between group`}
                    >
                      <div className="flex items-center">
                        <social.icon size={20} className="mr-3" />
                        <span className="font-semibold">{social.name}</span>
                      </div>
                      <span className="text-sm opacity-90">{social.followers}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Statistik SSB</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Total Siswa</span>
                    <span className="font-bold text-2xl">{students.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Pelatih Aktif</span>
                    <span className="font-bold text-2xl">{coaches.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-100">Tahun Berdiri</span>
                    <span className="font-bold text-2xl">2014</span>
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Info Pendaftaran</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2"></div>
                    <span className="text-green-100 text-sm">Pendaftaran dibuka sepanjang tahun</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2"></div>
                    <span className="text-green-100 text-sm">Usia 8-18 tahun (U-8 s/d U-18)</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2"></div>
                    <span className="text-green-100 text-sm">Trial gratis untuk siswa baru</span>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mr-3 mt-2"></div>
                    <span className="text-green-100 text-sm">Fasilitas modern dan lengkap</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-inner py-6 text-center text-gray-600 text-sm mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <p>&copy; 2024 SSB Farfaza. Semua hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
