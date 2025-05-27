import Header from '../components/Header'

function Home() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <section className="relative mt-6 rounded-lg overflow-hidden max-w-4xl mx-auto">
          <img
            src="https://storage.googleapis.com/a1aa/image/31f9c3b9-d15c-49d7-eff0-0297b0307981.jpg"
            alt="Kids playing soccer"
            className="w-full h-auto object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center px-6 text-center rounded-lg">
            <h1 className="text-white font-extrabold text-xl sm:text-2xl md:text-3xl leading-tight max-w-3xl">
              Membangun Bakat, Membentuk Masa Depan
            </h1>
            <form className="mt-6 w-full max-w-md flex items-center bg-white rounded-full shadow-md overflow-hidden">
              <input
                type="search"
                placeholder="Find a program"
                className="flex-grow px-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 text-sm font-semibold rounded-full"
              >
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Pelatih Section */}
        <section className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Pelatih</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative rounded-lg overflow-hidden">
                <img
                  src="https://storage.googleapis.com/a1aa/image/30b557af-a7a2-4a7e-06c5-f8aee2ff07fe.jpg"
                  alt="Coach"
                  className="w-full h-auto object-cover rounded-lg"
                />
                <div className="absolute bottom-2 left-2 text-white text-xs sm:text-sm font-semibold bg-black bg-opacity-50 rounded px-2 py-1">
                  <div>Coach</div>
                  <div className="font-bold">Alibaba</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tim Kami Section */}
        <section className="mt-12 max-w-4xl mx-auto">
          <h3 className="text-base font-semibold mb-4">Tim Kami</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-md p-3 text-xs sm:text-sm">
              <div className="font-semibold text-gray-800">U20</div>
              <div className="text-gray-500">Head Coach: Shin Tae-yong</div>
            </div>
            <div className="border border-gray-200 rounded-md p-3 text-xs sm:text-sm">
              <div className="font-semibold text-gray-800">U17</div>
              <div className="text-gray-500">Head Coach: Patrick Kluivert</div>
            </div>
            <div className="border border-gray-200 rounded-md p-3 text-xs sm:text-sm">
              <div className="font-semibold text-gray-800">U19</div>
              <div className="text-gray-500">Head Coach</div>
            </div>
          </div>
        </section>

        {/* Prestasi Section */}
        <section className="mt-12 max-w-4xl mx-auto mb-12">
          <h3 className="text-base font-semibold mb-4">Prestasi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs sm:text-sm">
            {[
              { year: 2021, desc: 'lorem ipsum' },
              { year: 2022, desc: 'lorem ipsum' },
              { year: 2023, desc: 'lorem ipsum' },
              { year: 2024, desc: 'Champion of 2024 U11 Girls Soccer League' }
            ].map((item, i) => (
              <div key={i} className="border border-gray-200 rounded-md p-3 text-gray-700">
                <div className="flex items-center space-x-1">
                  <i className="far fa-heart" />
                  <span>{item.year}</span>
                </div>
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
