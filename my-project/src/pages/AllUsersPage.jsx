import { useEffect, useState } from 'react'
import summaryApi from '../common/index'
import { toast } from 'react-toastify';
 
const AllUsersPage = () => {
  const [allUser, setAllUser] = useState([])

const fetchAllUsers = async () => {
  try {
    const fetchUserData = await fetch(summaryApi.allUser.url, {
      method: summaryApi.allUser.method,
      credentials: 'include',
    });

    const dataResponse = await fetchUserData.json();

    if (dataResponse.success) {
      setAllUser(dataResponse.data)
    }
    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

    console.log('data response', dataResponse);
  } catch (err) {
    console.error("Error fetching all users:", err.message || err);
  }
};

  useEffect(()=>{
    fetchAllUsers()
  },[])
  return (
    <div>
      <table className='w-full userTable '>
       <thead>
        <tr>
        <th>Sr</th>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Created Date</th>
        </tr>
       </thead>
      </table>
      <tbody>
        {
          allUser.map((el, index)=>{
            return(
              <tr>
                <td>
                  {index + 1}
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </div>
  )
}

export default AllUsersPage