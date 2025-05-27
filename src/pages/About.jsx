import Header from '../components/Header';

function About() {
  return (
    <>
      <Header />
      
      {/* About Us Section */}
      <section className="bg-[#27548A] pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center relative text-white">
          <h2 className="text-3xl font-semibold mb-2">About us</h2>
          <p className="text-xs max-w-xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>        
        </div>

        {/* Images row */}
        <div className="max-w-5xl mx-auto mt-10 flex justify-center gap-4 flex-wrap sm:flex-nowrap">
          <img className="rounded-lg shadow-md w-[160px] h-[120px] object-cover" src="https://storage.googleapis.com/a1aa/image/ce077383-e785-4c46-66f0-585699fa80cf.jpg" alt="Team collaborating" />
          <img className="rounded-lg shadow-md w-[160px] h-[120px] object-cover" src="https://storage.googleapis.com/a1aa/image/58829024-a3d8-4cae-fd33-e35f1785a72c.jpg" alt="Woman working" />
          <img className="rounded-lg shadow-md w-[160px] h-[120px] object-cover" src="https://storage.googleapis.com/a1aa/image/833105a1-6af1-4e6b-288f-d8bfdae8a944.jpg" alt="Two women discussing" />
          <img className="rounded-lg shadow-md w-[160px] h-[120px] object-cover" src="https://storage.googleapis.com/a1aa/image/cca25054-28e1-46b5-6e27-01458125b5d0.jpg" alt="Older man video call" />
        </div>
      </section>

      {/* Main Content Section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        {/* Headline and paragraphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div>
            <h3 className="text-2xl font-semibold mb-4 leading-tight">
              We make sure your idea &amp; creation delivered properly
            </h3>
            <p className="text-xs leading-relaxed mb-4">
              Pellentesque mollis urna vel semper egestas. Duis ac dictum lacus. Sed sagittis non nunc ac malesuada. Quisque ut eleifend urna. Etiam nec porttitor erat, vel ullamcorper erat.
            </p>
          </div>
          <div>
            <p className="text-xs leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>

        {/* Video and text side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 items-center">
          <div className="relative max-w-md mx-auto md:mx-0">
            <img className="rounded-lg shadow-md w-full h-auto object-cover" src="https://storage.googleapis.com/a1aa/image/f0a45b4d-cf4c-4975-13be-89ce63a5b367.jpg" alt="Man looking at papers" />
            <button aria-label="Play video" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 rounded-full p-3 shadow-md hover:bg-opacity-100 transition">
              <i className="fas fa-play text-black text-lg" />
            </button>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg px-4 py-2 w-[260px] text-center text-xs font-normal">
              <p className="font-semibold">“Making an impact, together”</p>
              <p className="text-gray-600 mt-1">Socialy Founder</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 leading-tight">
              We empower small business owners
            </h3>
            <p className="text-xs leading-relaxed mb-4">
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-xs italic font-semibold text-[#1c3b61] leading-relaxed">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
            </p>
          </div>
        </div>

        {/* Business growth section */}
        <section className="text-center mb-20 relative px-4">
          <h3 className="text-xl md:text-2xl font-semibold mb-3 max-w-xl mx-auto leading-tight">
            We help businesses to grow faster and bigger
          </h3>
          <p className="text-xs max-w-md mx-auto mb-10 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>

          {/* Decorative shapes */}
          <div className="absolute top-0 right-10 w-3 h-3 border-2 border-black rotate-45 mx-auto" />
          <div className="absolute top-16 left-10 w-3 h-3 border-2 border-black rotate-45 mx-auto" />

          {/* Icons and text row */}
          <div className="flex flex-col sm:flex-row justify-center gap-10 max-w-4xl mx-auto">
            <div className="flex flex-col items-center max-w-[160px] text-center px-2">
              <div className="bg-[#27548A] rounded-full w-14 h-14 flex items-center justify-center mb-3">
                <i className="fas fa-user-tie text-black text-xl" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Professional Team</h4>
              <p className="text-xs leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="flex flex-col items-center max-w-[160px] text-center px-2">
              <div className="bg-[#27548A] rounded-full w-14 h-14 flex items-center justify-center mb-3">
                <i className="fas fa-bullseye text-black text-xl" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Target Oriented</h4>
              <p className="text-xs leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
            <div className="flex flex-col items-center max-w-[160px] text-center px-2">
              <div className="bg-[#27548A] rounded-full w-14 h-14 flex items-center justify-center mb-3">
                <i className="fas fa-chart-line text-black text-xl" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Success Guarantee</h4>
              <p className="text-xs leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default About;
