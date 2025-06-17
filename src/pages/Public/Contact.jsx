import { MapPin, Phone, Mail } from 'lucide-react'
import Header from '../../components/Header'

  function Contact() {
  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-6 pt-20">
        <section className="relative min-h-screen bg-[#27548A] text-white">
          <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-wrap md:flex-nowrap gap-12 md:gap-24">

            {/* Contact Info */}
            <div className="flex-1 flex flex-col space-y-10 max-w-md text-white text-left">
              <div>
                <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
                <p className="text-xs font-normal leading-tight max-w-xs">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>

              <div className="space-y-8 text-xs leading-tight">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#1f2f3a]">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[#2ea1d9] font-semibold">Address</span><br />
                    Jalan Taman Kalikepiting Indah No 1 Surabaya
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#1f2f3a]">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[#2ea1d9] font-semibold">Phone</span><br />
                    <a href="tel:50747560945" className="text-white hover:underline">
                      081233179929
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-[#1f2f3a]">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[#2ea1d9] font-semibold">Email</span><br />
                    <a href="mailto:wrub7d78l0e@temporary-mail.net" className="text-white hover:underline">
                      farfazafcsurabaya@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              className="flex-1 bg-white max-w-sm w-full p-8 shadow-md rounded-xl text-black space-y-6"
              aria-label="Send Message Form"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Send a Message</h3>

              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  className="border-b-2 border-gray-300 focus:border-[#2ea1d9] outline-none text-sm pb-1 w-full transition duration-200"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="border-b-2 border-gray-300 focus:border-[#2ea1d9] outline-none text-sm pb-1 w-full transition duration-200"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Type your message here..."
                  required
                  className="border-b-2 border-gray-300 focus:border-[#2ea1d9] outline-none text-sm pb-1 w-full resize-none transition duration-200"
                />
              </div>

              <button
                type="submit"
                className="bg-[#2ea1d9] hover:bg-[#238ac0] text-white text-sm font-semibold px-5 py-2 rounded-md transition duration-200"
              >
                Send
              </button>
            </form>

          </div>
        </section>
      </main>
    </>
  )
}

export default Contact
