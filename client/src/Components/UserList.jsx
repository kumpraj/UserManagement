import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {FaEdit} from 'react-icons/fa';


const UserList = ({ users, onEditUser }) => {

   

   useEffect(() => {
      axios.get('https://user-management-server-iota-seven.vercel.app/getUsers')
        .then(response => setUsers(response.data.users))
        .catch(error => console.error('Error fetching users ', error))
   }, []);

  return (
    <div className="overflow-x-auto w-full">
      <table className='table w-full text-slate-800 odd:bg-gray-200 even:bg-gray-100' >
        <thead className="text-slate-950 text-sm">
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