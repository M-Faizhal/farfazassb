import { useEffect, useState } from 'react';
import Header from '../../components/Header'
import Api from '../../utils/Api';

function Home() {

  const [pelatih,setPelatih] = useState([])

  const getAllPelatih = async()=>{
    await Api.get("/public/coaches/").then((res)=>{
        setPelatih(res.data)
    })
  }

  useEffect(()=>{
    getAllPelatih()
  },[])

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-20">
        <section className="relative mt-6 rounded-lg overflow-hidden max-w-5xl mx-auto">
          <div className="aspect-video w-full relative">
            <img
              src="/assets/login-image.svg"
              alt="Kids playing soccer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
            <h1 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight max-w-2xl drop-shadow-lg">
              Membangun Bakat, Membentuk Masa Depan
            </h1>
            <form className="mt-6 w-full max-w-md flex h-15 justify-between items-center bg-white rounded-2xl shadow-md overflow-hidden">
              <div className='flex items-center w-full'>
                <img className='ml-5 mr-2' src="/assets/search.svg" alt="search" />
                <input
                type="search"
                placeholder="Cari program pelatihan..."
                className="flex-grow text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
              />
              </div>
              <button
                type="submit"
                className="bg-primary rounded-2xl hover:bg-primary-200 cursor-pointer text-white px-8 h-full text-sm font-semibold"
              >
                Cari
              </button>
            </form>
          </div>
        </section>

        <section className="mt-16 max-w-5xl mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center">Pelatih</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {pelatih.map((coach,index)=>{
              return (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-sm">
                <div className='w-full h-full'>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                <img
                  src={coach.photoUrl}
                  alt="Coach"
                  className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-2 left-2 text-white text-sm font-medium rounded px-2 py-1">
                  <p className='font-semibold'>Coach</p>
                  <p className="font-bold text-2xl">{coach.name}</p>
                </div>
                </div>
              </div>
              )
            })}
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
