import React from 'react';
import Header from '../../components/Header'; // Menggunakan komponen Header yang sudah ada

export default function Team() {
  // Data dummy untuk anggota tim (silakan sesuaikan dengan data sebenarnya jika ada)
  const teamMembers = [
    {
      name: 'Zlatan Ibrahimovic',
      role: 'Forward',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/e7811ef1-953e-4b68-04f8-e1c9b251341c.jpg', // Gambar dari desain Figma
    },
    {
      name: 'Gianluigi Donnarumma',
      role: 'Goalkeeper',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/330559f6-17b1-4c6e-5264-b816223d6a70.jpg', // Gambar dari desain Figma
    },
    {
      name: 'Alexis Saelemaekers',
      role: 'Midfielder',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/1f618a28-6623-45f8-b715-46a2a0957597.jpg', // Gambar dari desain Figma
    },
    {
      name: 'Franck Kessie',
      role: 'Midfielder',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/70a3c9b7-3b2d-4d7a-1175-104332e73b22.jpg', // Gambar dari desain Figma
    },
    {
      name: 'Davide Calabria',
      role: 'Defender',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/b82260bf-1234-4b53-b0a7-17551062b323.jpg', // Gambar dari desain Figma
    },
  ];

  // Fungsi untuk menangani klik navigasi (simulasi)
  // Di aplikasi nyata, Anda akan menggunakan React Router atau state management untuk navigasi.
  const handleNavigationClick = (pageName) => {
    console.log(`Navigasi ke: ${pageName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-poppins">
      <Header /> 

      <main className="flex-grow p-4 md:p-8 pt-20"> 
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden shadow-md">
              <img
                src="https://wallpapercave.com/wp/wp11114039.jpg"
                alt="Gambar Tim Farfaza FC"
                className="w-full h-auto object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/D0D0D0/333333?text=Gambar+Tim" }} 
              />
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Team</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Get to know the team
                <br />
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-[#2C9CF0]"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/150x150/667080/FFFFFF?text=?" }} 
                />
                <p className="font-semibold text-gray-800 text-lg">{member.name}</p>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              className="px-8 py-3 bg-[#2C9CF0] text-white rounded-md hover:bg-[#27548A] transition-colors shadow-md text-lg"
              onClick={() => handleNavigationClick('View All Players')}
            >
              View all players
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white shadow-inner py-4 text-center text-gray-600 text-sm mt-8">
        @farfaza fc
      </footer>
    </div>
  );
}