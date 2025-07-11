import { toast } from "react-toastify";
import summaryApi from "../common/index";
import ROLE from "../common/role";
import { useState } from "react";


const ChangeUserRole = ({name, email, role, userId, onClose, refetchData}) => {

  const [userRole, setUserRole] = useState(role)

   const handleRoleChange = async (e)=>{
    setUserRole(e.target.value)
    console.log(e.target.value)
  }

  const updateUserRole = async ()=>{
    const fetchDataResponse = await fetch(summaryApi.updateUser.url,{
      method : summaryApi.updateUser.method,
      credentials : 'include', 
      headers :{
        'content-type' : 'application/json'
      },
      body : JSON.stringify({
        role : userRole,
        userId : userId
      })
    })
    const dataResponse = await fetchDataResponse.json()

    if (dataResponse.success) {
      toast.success(dataResponse.message)
      onClose()
      refetchData();
    }
    console.log("role updated", dataResponse)
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Change User Role
        </h2>

        <div className="mb-2">
          <p className="text-sm text-gray-700">
            <span className="font-medium">Name:</span>{name}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">Email:</span>{email}
          </p>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Role
          </label>
          <select value={userRole} onChange={handleRoleChange} className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500">
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">
            Cancel
          </button>
          <button onClick={updateUserRole} className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
