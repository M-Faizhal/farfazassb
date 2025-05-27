import Header from '../components/Header'

function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        {/* Hero Section */}
        <section className="relative mt-6 rounded-lg overflow-hidden max-w-5xl mx-auto shadow-lg">
          <div className="aspect-video w-full">
            <img
              src="https://storage.googleapis.com/a1aa/image/31f9c3b9-d15c-49d7-eff0-0297b0307981.jpg"
              alt="Kids playing soccer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center px-6 text-center">
            <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight max-w-2xl drop-shadow-lg">
              Membangun Bakat, Membentuk Masa Depan
            </h1>
            <form className="mt-6 w-full max-w-md flex items-center bg-white rounded-full shadow-md overflow-hidden">
              <input
                type="search"
                placeholder="Cari program pelatihan..."
                className="flex-grow px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-sm font-semibold"
              >
                Cari
              </button>
            </form>
          </div>
        </section>

        {/* Pelatih Section */}
        <section className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-6 text-center">Pelatih</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden shadow-sm">
                <img
                  src="https://storage.googleapis.com/a1aa/image/30b557af-a7a2-4a7e-06c5-f8aee2ff07fe.jpg"
                  alt="Coach"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium bg-black bg-opacity-60 rounded px-2 py-1">
                  <div>Coach</div>
                  <div className="font-bold">Alibaba</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tim Kami Section */}
        <section className="mt-16 max-w-5xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-center">Tim Kami</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { team: 'U20', coach: 'Shin Tae-yong' },
              { team: 'U17', coach: 'Patrick Kluivert' },
              { team: 'U19', coach: 'Belum diumumkan' }
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-md p-4 bg-white shadow-sm text-center">
                <div className="text-lg font-bold text-gray-800">{item.team}</div>
                <div className="text-sm text-gray-500 mt-1">Head Coach: {item.coach}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Prestasi Section */}
        <section className="mt-16 max-w-5xl mx-auto mb-16">
          <h3 className="text-xl font-semibold mb-6 text-center">Prestasi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {[
              { year: 2021, desc: 'Peringkat 3 Nasional U15' },
              { year: 2022, desc: 'Runner-up Turnamen Remaja Asia' },
              { year: 2023, desc: 'Juara Regional U17' },
              { year: 2024, desc: 'Champion of 2024 U11 Girls Soccer League' }
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-md p-4 text-gray-700 bg-white shadow-sm">
                <div className="font-bold mb-1">{item.year}</div>
                <div>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}

export default Home;
