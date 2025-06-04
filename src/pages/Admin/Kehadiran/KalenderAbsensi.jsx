import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import AdminHeader from '../../../components/Admin/Header';
import AdminSidebar from '../../../components/Admin/Sidebar';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'dayjs/locale/id';

dayjs.locale('id');

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const KalenderAbsensi = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const navigate = useNavigate();

  const startOfMonth = currentDate.startOf('month');
  const startDay = (startOfMonth.day() + 6) % 7;
  const daysInMonth = currentDate.daysInMonth();
  const today = dayjs().format('YYYY-MM-DD');

  const goToPrevMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
  const goToNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

  const handleDateClick = (date) => {
    const formatted = date.format('YYYY-MM-DD');
    navigate(`/admin/kehadiran/kalender/absensi?date=${formatted}`);
  };

  const renderCells = () => {
    const totalCells = startDay + daysInMonth;
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
      if (i < startDay) {
        cells.push(<div key={`empty-${i}`} />);
      } else {
        const date = currentDate.date(i - startDay + 1);
        const isToday = date.format('YYYY-MM-DD') === today;

        cells.push(
          <div
            key={date.format('YYYY-MM-DD')}
            onClick={() => handleDateClick(date)}
            className={`w-10 h-10 flex items-center justify-center rounded-full cursor-pointer text-sm transition duration-200
              ${isToday ? 'bg-[#1F3C86] text-white font-semibold' : 'text-gray-700 hover:bg-blue-100'}
            `}
          >
            {date.date()}
          </div>
        );
      }
    }

    return cells;
  };

  return (
    <div className="bg-[#f5f7fa] min-h-screen text-[#333]">
      <div className="flex flex-col md:flex-row min-h-screen">
        <AdminSidebar />

        <main className="flex-1 px-6 py-8 pt-20 md:pt-0 md:ml-64">
          <AdminHeader />

          <h1 className="text-xl font-bold text-black mb-6 pt-6">Absensi Siswa - U10</h1>

          <div className="bg-white rounded-3xl shadow-md p-6 max-w-xl mx-auto">
            {/* Kalender Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {currentDate.format('MMMM YYYY')}
              </h2>
              <div className="flex items-center gap-2">
                <button onClick={goToPrevMonth} className="p-2 hover:bg-gray-100 rounded-full">
                  <FiChevronLeft />
                </button>
                <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 rounded-full">
                  <FiChevronRight />
                </button>
              </div>
            </div>

            {/* Days */}
            <div className="grid grid-cols-7 text-center text-gray-500 font-medium mb-2">
              {days.map((day) => (
                <div key={day} className="text-sm">{day}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-y-3 text-center">
              {renderCells()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KalenderAbsensi;
