import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function UserList() {
  const [input, setInput] = useState('');
  const [data, setData] = useState([])
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

  // Filtrojm userat nese kan email apo name njejt si ne input
  const filteredData = data.filter(user => 
    user.name.toLowerCase().includes(input.toLowerCase()) ||
    user.email.toLowerCase().includes(input.toLowerCase())
  );


  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
        <div className="p-6">
         <div className="mb-6">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Search" 
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        </div>
       <table className="min-w-full border border-gray-300">
        <thead>
        <tr className="bg-gray-100">
        <th className="text-left py-3 px-4 font-semibold">Name</th>
         <th className="text-left py-3 px-4 font-semibold">Email</th>
         <th className="text-left py-3 px-4 font-semibold">Company</th>
         </tr>
          </thead>  
           <tbody>
          {filteredData.map(user => (
            <tr key={user.id}
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