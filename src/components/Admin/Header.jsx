import { FaUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useToken } from '../../utils/Cookies';
import { jwtDecode } from 'jwt-decode';

const AdminHeader = () => {
  const {getToken} = useToken()
  return (
    <header className="flex justify-end items-center py-5 border-b border-gray-200">
      <div className='flex flex-row gap-3 items-center'>
        <FaUser size={15}/>
        <p className='font-semibold text-lg'>{jwtDecode(getToken()).name}</p>
      </div>
    </header>
  );
};

export default AdminHeader;
