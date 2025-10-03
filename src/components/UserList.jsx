import { useState } from 'react'
import React from 'react'

function UserList() {

  const [input, setInput] = useState('');
  
  const [data, setData] = useState([])
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

  const filteredData = data.filter(user =>
    user.name.toLowerCase().includes(input.toLowerCase()) ||
    user.email.toLowerCase().includes(input.toLowerCase())
  );



  

  return (
        <div>
         <div className="search-bar">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search..." />
        </div>
          <table style={{ border: '1px solid #ccc', borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Email</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Company</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(user => (
                <tr key={user.id}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.name}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.email}</td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>{user.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  )
}

export default UserList