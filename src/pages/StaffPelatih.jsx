import Header from '../components/Header'
function StaffPelatih(){
    return (
        <>
          <Header />
          <main className="max-w-7xl mx-auto px-6">
            {/* Hero Section */}
            <section class="max-w-6xl mx-auto px-4 py-12">
  <h2 class="text-center font-extrabold text-2xl md:text-3xl mb-2">
    Meet Our Coaching Staff
  </h2>
  <p class="text-center text-sm text-gray-600 mb-10">
    Profesional dan berdedikasi membimbing tim kami menuju kesuksesan.
  </p>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-y-10 gap-x-6">
    {/* <!-- Coach 1 --> */}
    <div class="flex flex-col items-center text-center">
      <div class="w-24 h-24 rounded-full overflow-hidden circle-bg-1 flex items-center justify-center">
        <img src="https://storage.googleapis.com/a1aa/image/946e4e5f-7691-400b-024d-aad44becc363.jpg" class="w-24 h-24 object-cover rounded-full" alt="Head Coach" />
      </div>
      <h3 class="mt-3 font-bold text-sm">Andi Santoso</h3>
      <p class="text-xs text-gray-500">Head Coach</p>
      <div class="mt-2 flex space-x-3 text-gray-600 text-xs">
        <a href="#" class="hover:text-gray-900" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="hover:text-gray-900" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" class="hover:text-gray-900" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      </div>
    </div>

    {/* <!-- Coach 2 --> */}
    <div class="flex flex-col items-center text-center">
      <div class="w-24 h-24 rounded-full overflow-hidden circle-bg-2 flex items-center justify-center">
        <img src="https://storage.googleapis.com/a1aa/image/71a7813f-ce86-4d44-39b0-fccb1864bc48.jpg" class="w-24 h-24 object-cover rounded-full" alt="Assistant Coach" />
      </div>
      <h3 class="mt-3 font-bold text-sm">Budi Hartono</h3>
      <p class="text-xs text-gray-500">Assistant Coach</p>
      <div class="mt-2 flex space-x-3 text-gray-600 text-xs">
        <a href="#" class="hover:text-gray-900" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="hover:text-gray-900" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" class="hover:text-gray-900" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      </div>
    </div>

    {/* <!-- Coach 3 --> */}
    <div class="flex flex-col items-center text-center">
      <div class="w-24 h-24 rounded-full overflow-hidden circle-bg-1 flex items-center justify-center">
        <img src="https://storage.googleapis.com/a1aa/image/3886c57c-80f2-4573-80b9-1be4bf3b7d46.jpg" class="w-24 h-24 object-cover rounded-full" alt="Fitness Coach" />
      </div>
      <h3 class="mt-3 font-bold text-sm">Siti Nurhaliza</h3>
      <p class="text-xs text-gray-500">Fitness Coach</p>
      <div class="mt-2 flex space-x-3 text-gray-600 text-xs">
        <a href="#" class="hover:text-gray-900" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="hover:text-gray-900" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" class="hover:text-gray-900" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      </div>
    </div>

    {/* <!-- Coach 4 --> */}
    <div class="flex flex-col items-center text-center">
      <div class="w-24 h-24 rounded-full overflow-hidden circle-bg-2 flex items-center justify-center">
        <img src="https://storage.googleapis.com/a1aa/image/81d50913-1052-44a3-e698-daf1322b3041.jpg" class="w-24 h-24 object-cover rounded-full" alt="Goalkeeping Coach" />
      </div>
      <h3 class="mt-3 font-bold text-sm">Agus Prasetyo</h3>
      <p class="text-xs text-gray-500">Goalkeeping Coach</p>
      <div class="mt-2 flex space-x-3 text-gray-600 text-xs">
        <a href="#" class="hover:text-gray-900" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="hover:text-gray-900" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        <a href="#" class="hover:text-gray-900" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
      </div>
    </div>
  </div>
</section>              
          </main>
        </>
      )}


export default StaffPelatih
