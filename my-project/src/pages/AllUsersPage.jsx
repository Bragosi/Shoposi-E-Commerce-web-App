import { useEffect, useState } from 'react';
import summaryApi from '../common/index';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsersPage = () => {
  const [allUser, setAllUser] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const fetchUserData = await fetch(summaryApi.allUser.url, {
        method: summaryApi.allUser.method,
        credentials: 'include',
      });

      const dataResponse = await fetchUserData.json();

      if (dataResponse.success) {
        setAllUser(dataResponse.data);
      }
      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }

      console.log('data response', dataResponse);
    } catch (err) {
      console.error("Error fetching all users:", err.message || err);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="rounded-lg shadow-md p-6 overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">All Users</h2>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-left text-sm">
            <th className="py-3 px-4 border-b">#</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Role</th>
            <th className="py-3 px-4 border-b">Created Date</th>
            <th className="py-3 px-4 border-b text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {allUser.map((user, index) => (
            <tr
              key={user._id}
              className="hover:bg-gray-50 transition-colors text-sm text-gray-800"
            >
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b capitalize">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b capitalize">{user.role}</td>
              <td className="py-2 px-4 border-b">
                {moment(user.createdAt).format('LL')}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button className="px-3 py-1 bg-green-500 hover:bg-green-700 text-white text-xs rounded-md shadow">
                  <MdModeEdit/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ChangeUserRole/>
    </div>
  );
};

export default AllUsersPage;
