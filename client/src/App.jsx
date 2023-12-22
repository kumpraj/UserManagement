import { useState } from 'react';
import './App.css';
import axios from 'axios';
import Form from './Components/FormComponent'
import UserList from './Components/userList';

function App() {
  const [editableUser, setEditableUser] = useState(null);

  const handleEditUser = (user) => {
    setEditableUser(user);
  }

  const handleSaveUser = async (userData , id) => {
    if(editableUser && editableUser._id){
      try {
        const response = await axios.put(`http://localhost:5000/user/${id}`,userData)
        alert('Data updated successfully');

        // resetting the form
        setEditableUser(null);
      } catch (error) {
        console.error('Error updating user: ', error);
      }
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-sans font-bold text-center text-blue-800 mb-6">User Management System</h1>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-sans font-semibold text-gray-900 mb-4">User Form</h2>
              <Form editableUser={editableUser} onSave={handleSaveUser} />
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-sans font-semibold text-gray-700 mb-4">Users List</h2>
              <UserList onEditUser={handleEditUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
