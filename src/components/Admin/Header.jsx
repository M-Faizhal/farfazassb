import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="flex justify-end items-center px-6 py-4 border-b border-gray-200">
      <div>
        <Link
          to="/admin/login"
          className="bg-white text-gray-950 px-5 py-2 border border-[#29278C] rounded-md font-semibold transition duration-200 hover:bg-[#29278C] hover:text-white hover:shadow-md"
        >
          Log In
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
