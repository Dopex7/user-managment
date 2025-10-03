import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import AddUserForm from './AddUserForm'

function UserList() {
  const [input, setInput] = useState('');
  const [data, setData] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [sortBy, setSortBy] = useState('')
  const [sortDirection, setSortDirection] = useState('asc')
  const navigate = useNavigate()
  
  // bojm fetch userat, i ruajm ne state (input)
  React.useEffect(() => {
    const fetchLocation = async () => {
        await fetch("https://jsonplaceholder.typicode.com/users")
         .then((res)=> res.json())
         .then((data) => {
          setData(data);
          console.log(data);
         });
    };
    fetchLocation();
  }, []);

  // filtrojm userat nese kan email apo name njejt si ne input
  const filteredData = data.filter(user => 
    user.name.toLowerCase().includes(input.toLowerCase()) ||
    user.email.toLowerCase().includes(input.toLowerCase())
  );

  // sorting i thjesht per mi rendit userat sipas Shkronjav A-z per per qdo kolon
  const getSortedData = () => {
    if (!sortBy) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aVal, bVal;
      if (sortBy === 'name') {
        aVal = a.name;
        bVal = b.name;
      } else if (sortBy === 'email') {
        aVal = a.email;
        bVal = b.email;
      } else if (sortBy === 'company') {
        aVal = a.company.name;
        bVal = b.company.name;
      }
      if (aVal < bVal) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  }


  // kur klikohet nje user, e marrim id nlist e ruajm ne local storage dhe bojm navigate te Userdetails
  const handleUserClick = (userId) => {
    const user = data.find(u => u.id === userId);
    if (user) {
      localStorage.setItem('selectedUser', JSON.stringify(user));
      navigate(`/user/${userId}`);
    }
  };

  const handleAddUser = (userData) => {
    const newUser = {
      id: -(data.length + 1),
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '',
      website: userData.website || '',
      company: { name: userData.company || 'New Company' }
    }
    setData([newUser, ...data])
    setShowForm(false)
  }

  return (
    <div className="p-6">
      <div className="flex mb-6">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Search" 
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l"/>
        <button 
          onClick={() => setShowForm(true)}
          className="bg-gray-500 text-white px-4 py-2 rounded-r hover:bg-gray-600 whitespace-nowrap cursor-pointer">
          Add User
        </button>
      </div>
      
      {showForm && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg z-50 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Add New User</h2>
            <button 
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer">
              ×
            </button>
          </div>
          <AddUserForm 
            onAddUser={handleAddUser}
            onCancel={() => setShowForm(false)} />
        </div>
      )}
      
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th 
              className="text-left py-3 px-4 font-semibold cursor-pointer"
              onClick={() => handleSort('name')}>
              Name {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="text-left py-3 px-4 font-semibold cursor-pointer"
              onClick={() => handleSort('email')}>
              Email {sortBy === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
            <th 
              className="text-left py-3 px-4 font-semibold cursor-pointer"
              onClick={() => handleSort('company')}>
              Company {sortBy === 'company' && (sortDirection === 'asc' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>  
        <tbody>
          {getSortedData().map(user => (
            <tr 
              key={user.id}
              onClick={() => handleUserClick(user.id)}
              className="cursor-pointer hover:bg-gray-50">
              <td className="py-3 px-4 border-b border-gray-200">{user.name}</td>
              <td className="py-3 px-4 border-b border-gray-200">{user.email}</td>
              <td className="py-3 px-4 border-b border-gray-200">{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList