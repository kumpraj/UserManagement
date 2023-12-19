import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {FaEdit} from 'react-icons/fa';


const UserList = ({onEditUser}) => {

   const [users, setUsers] = useState([]);

   useEffect(() => {
      axios.get('http://localhost:5000/getUsers')
        .then(response => setUsers(response.data.users))
        .catch(error => console.error('Error fetching users ', error))
   }, []);

  return (
    <div className="overflow-x-auto w-full">
      <table className='table w-full table-zebra' >
        <thead>
          <tr>
            <th>Name</th>
            <th>Sectors</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.sectors.join(', ')}</td>
              <td>
                <button onClick={() => onEditUser(user)}>
                  <FaEdit/>
                </button>
              </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList