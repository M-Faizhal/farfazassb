import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="flex justify-end items-center px-6 py-4 border-b border-gray-200">
      <div>
        <Link
          to="/admin/login"
          className="bg-sky-600 text-white px-5 py-2 rounded-md font-semibold transition duration-200 hover:bg-sky-800 hover:shadow-md"
        >
          Log In
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
