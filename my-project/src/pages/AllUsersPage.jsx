import { useEffect, useState } from 'react';
import summaryApi from '../common/index';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdModeEdit } from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsersPage = () => {
  const [allUser, setAllUser] = useState([]);
  const [openUpdateRole, setopenUpdateRole] = useState(false)
  const [updateUserDetails, setupdateUserDetails] = useState({
    email : " ",
    name : " ",
    role : " ",
    _id : " "
  })

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
  <table className="min-w-full border-collapse rounded-lg overflow-hidden shadow">
  <thead className="bg-gray-900 text-gray-100 text-sm">
    <tr>
      <th className="py-3 px-4 border-b border-r border-gray-300 text-left">#</th>
      <th className="py-3 px-4 border-b border-r border-gray-300 text-left">Name</th>
      <th className="py-3 px-4 border-b border-r border-gray-300 text-left">Email</th>
      <th className="py-3 px-4 border-b border-r border-gray-300 text-left">Role</th>
      <th className="py-3 px-4 border-b border-r border-gray-300 text-left">Created Date</th>
      <th className="py-3 px-4 border-b text-center">Action</th>
    </tr>
  </thead>
  <tbody className="bg-white text-sm text-gray-800">
    {allUser.map((user, index) => (
      <tr key={user._id} className="hover:bg-gray-50 transition-colors">
        <td className="py-3 px-4 border-b border-r border-gray-200">{index + 1}</td>
        <td className="py-3 px-4 border-b border-r border-gray-200 capitalize">{user.name}</td>
        <td className="py-3 px-4 border-b border-r border-gray-200">{user.email}</td>
        <td className="py-3 px-4 border-b border-r border-gray-200 capitalize">{user.role}</td>
        <td className="py-3 px-4 border-b border-r border-gray-200">{moment(user.createdAt).format('LL')}</td>
        <td className="py-3 px-4 border-b text-center">
          <button
            onClick={() => {
              setupdateUserDetails(user);
              setopenUpdateRole(true);
            }}
            className="inline-flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-xs shadow"
          >
            <MdModeEdit className="text-base" />
            Edit
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


     {
      openUpdateRole && (
         <ChangeUserRole
          onClose={()=>setopenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          refetchData={fetchAllUsers}
         />
      )
     }
    </div>
  );
};

export default AllUsersPage;
