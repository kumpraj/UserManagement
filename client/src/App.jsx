import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from './Components/FormComponent'
import UserList from './Components/UserList'

function App() {
  const [editableUser, setEditableUser] = useState(null);
  const [users, setUsers] = useState([]);

  //  Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://user-management-server-iota-seven.vercel.app/getUsers');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    }

    fetchUsers();
  }, [])

  const handleEditUser = (user) => {
    setEditableUser(user);
  }

  const handleSaveUser = async (userData , id) => {
    if(editableUser && editableUser._id){
      try {
        await axios.put(`https://user-management-server-iota-seven.vercel.app/user/${id}`,userData)
        alert('Data updated successfully');

        // resetting the form
        setEditableUser(null);
        refreshUsers();
      } catch (error) {
        console.error('Error updating user: ', error);
      }
    }else {
      // Add new User
      try {
        await axios.post('https://user-management-server-iota-seven.vercel.app/submit', userData);
        alert('Data saved successfully');
        refreshUsers();
      } catch (error) {
        alert('Data not saved successfully');
        console.error('Error submitting form: ', error);
      }
    }
  }

  // Refresh users list
  const refreshUsers = async () => {
    try {
      const response = await axios.get('https://user-management-server-iota-seven.vercel.app/getUsers');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-sans font-bold text-center text-blue-800 mb-6">User Management System</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-sans font-semibold text-gray-900 mb-4">User Form</h2>
              <Form editableUser={editableUser} onSave={handleSaveUser} />
            </div>
          </div>
          <div className="md:w-3/4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-sans font-semibold text-gray-700 mb-4">Users List</h2>
              <UserList users={users} onEditUser={handleEditUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
