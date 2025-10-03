import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const userData = await response.json();
        setUser(userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return <div className="p-6">Loading Data</div>;
  }

  if (!user) {
    return <div className="p-6">User not found</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-500 hover:text-blue-700 mb-4 inline-block">
        &larr; Back to Users
      </Link>
      
      <div className="bg-white shadow rounded-lg p-6">
     <h1 className="text-2xl font-bold mb-6">{user.name}</h1>
        
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     <div>
    <h2 className="text-lg font-semibold mb-3">Contact Information</h2>
     <p className="mb-2"><span className="font-medium">Email:</span> {user.email}</p>
     <p className="mb-2"><span className="font-medium">Phone:</span> {user.phone}</p>
   <p className="mb-2"><span className="font-medium">Website:</span> {user.website}</p>
   </div>
          
        </div>
      </div>
    </div>
  );
};

export default UserDetail;