import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import Api from "../../utils/Api";
import { toLocal } from "../../utils/dates";
import { FaTrophy, FaUsers, FaStar } from "react-icons/fa6";

function Home() {
  const [pelatih, setPelatih] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [students, setStudents] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const initializeCarousel = () => {
      const images = [
        {
          src: "/assets/carousel/u14.jpg",
          alt: "Tim U14",
          title: "Tim U14 - Generasi Muda Berbakat",
          caption: "Membangun fondasi kuat untuk masa depan sepak bola Indonesia melalui pelatihan intensif dan pembinaan karakter yang terintegrasi."
        },
        {
          src: "/assets/carousel/u16.jpg", 
          alt: "Tim U16",
          title: "Tim U16 - Menuju Prestasi Gemilang",
          caption: "Mengasah kemampuan teknis dan taktis tingkat lanjut dengan dukungan pelatih berpengalaman dan fasilitas modern."
        },
        {
          src: "/assets/carousel/u18.jpg",
          alt: "Tim U18", 
          title: "Tim U18 - Persiapan Masa Depan",
          caption: "Mempersiapkan atlet muda untuk kompetisi profesional dengan program pelatihan komprehensif dan mental yang kuat."
        }
      ];
      
      setCarouselImages(images);
    };

    initializeCarousel();
  }, []);

  const getAllPelatih = async () => {
    try {
      const res = await Api.get("/public/coaches/");
      setPelatih(res.data || []);
    } catch (error) {
      console.error("Error fetching coaches:", error);
      setPelatih([]);
    }
  };

  const getAllAchievement = async () => {
    try {
      const res = await Api.get("/public/achievements");
      setAchievements(res.data || []);
    } catch (error) {
      console.error("Error fetching achievements:", error);
      setAchievements([]);
    }
  };

  const getAllStudents = async () => {
    try {
      const res = await Api.get("/public/students/");
      setStudents(res.data || []);
    } catch (error) {
      console.error("Error fetching students:", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    getAllPelatih();
    getAllAchievement();
    getAllStudents();
  }, []);

  const teamData = [
    { team: "U-8" },
    { team: "U-9" },
    { team: "U-10" },
    { team: "U-11" },
    { team: "U-12" },
    { team: "U-13" },
    { team: "U-14" },
    { team: "U-15" },
    { team: "U-16" },
    { team: "U-17" },
    { team: "U-18" },
  ];

  const renderTeamCards = () => {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-8">
          {teamData.slice(0, 8).map((item, i) => {
            return (
              <div
                key={i}
                className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 
                          rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl 
                          transform hover:-translate-y-2 transition-all duration-500 
                          text-center group cursor-pointer min-h-[200px] flex flex-col justify-center"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                              text-2xl lg:text-3xl font-bold rounded-full w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-4 
                              flex items-center justify-center shadow-lg
                              group-hover:scale-110 transition-transform duration-300">
                  {item.team.replace('U-', '')}
                </div>
                <div className="text-lg lg:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  Tim {item.team}
                </div>
                <div className="text-sm text-gray-600 leading-relaxed">
                  Tim kompetitif untuk usia {item.team.replace('U-', '')} tahun
                </div>
                <div className="mt-4 flex justify-center">
                  <FaUsers className="text-blue-500 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-4xl">
            {teamData.slice(8).map((item, i) => {
              const actualIndex = i + 8;
              return (
                <div
                  key={actualIndex}
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-blue-200 
                            rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl 
                            transform hover:-translate-y-2 transition-all duration-500 
                            text-center group cursor-pointer min-h-[200px] flex flex-col justify-center"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                                text-2xl lg:text-3xl font-bold rounded-full w-14 h-14 lg:w-16 lg:h-16 mx-auto mb-4 
                                flex items-center justify-center shadow-lg
                                group-hover:scale-110 transition-transform duration-300">
                    {item.team.replace('U-', '')}
                  </div>
                  <div className="text-lg lg:text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    Tim {item.team}
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Tim kompetitif untuk usia {item.team.replace('U-', '')} tahun
                  </div>
                  <div className="mt-4 flex justify-center">
                    <FaUsers className="text-blue-500 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <section className="relative mt-8 max-w-7xl mx-auto px-4">
            <div className="relative">
              <Carousel 
                images={carouselImages}
                autoSlide={true}
                autoSlideInterval={5000}
                showDots={false}
                showArrows={true}
                showPlayPause={true}
                height="h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px]"
                className="shadow-2xl rounded-3xl overflow-hidden"
              />
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
            </div>
          </section>

          <section className="mt-24 max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                Tim Pelatih Profesional
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-base lg:text-lg max-w-3xl mx-auto">
                Dipimpin oleh pelatih berpengalaman dan bersertifikat internasional
              </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 lg:gap-8">
              {pelatih.map((coach, index) => {
                return (
                  <div
                    key={index}
                    className="relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 
                              group cursor-pointer transform hover:-translate-y-3 hover:scale-105"
                  >
                    <div className="w-full h-full relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                      <img
                        src={coach.photoUrl}
                        alt={`Coach ${coach.name}`}
                        className="w-full h-64 lg:h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                        <div className="flex items-center mb-2">
                          <p className="font-semibold text-xs lg:text-sm opacity-90">Coach</p>
                        </div>
                        <p className="font-bold text-lg lg:text-xl leading-tight group-hover:text-yellow-300 transition-colors">
                          {coach.name}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-24 max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Tim Kami
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-base lg:text-lg max-w-3xl mx-auto">
                Berbagai kategori usia untuk mengembangkan bakat sepak bola dari dini
              </p>
            </div>
            {renderTeamCards()}
          </section>

          <section className="mt-24 max-w-7xl mx-auto mb-24 px-4 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
                Prestasi Gemilang
              </h3>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 text-base lg:text-lg max-w-3xl mx-auto">
                Pencapaian membanggakan yang telah diraih tim kami
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8">
              {achievements.map((item, i) => (
                <div
                  key={i}
                  className="relative bg-white rounded-2xl p-6 lg:p-8 text-center 
                            shadow-lg hover:shadow-2xl transition-all duration-500 
                            hover:-translate-y-3 group cursor-pointer
                            border border-yellow-100 hover:border-yellow-300
                            min-h-[280px] flex flex-col justify-between"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-20 -translate-y-10 translate-x-10"></div>
                  
                  <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 w-14 h-14 lg:w-16 lg:h-16 rounded-full 
                                  flex items-center justify-center mx-auto mb-6 shadow-lg
                                  group-hover:scale-110 transition-transform duration-300">
                      <FaTrophy size={24} className="text-white lg:text-[28px]" />
                    </div>
                    
                    <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors">
                      {item.event}
                    </h2>
                    
                    <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-3 lg:px-4 py-2 mb-4 inline-block">
                      <p className="text-xs lg:text-sm text-blue-700 font-semibold">
                        {toLocal(item.date)}
                      </p>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Home;