import React, { useState } from 'react';
const AddUserForm = ({ onAddUser, onCancel }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [website, setWebsite] = useState('')
  const [company, setCompany] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setNameError('')
    setEmailError('')
    
    let isValid = true

    //vetem email,name required. shum thjesht validation per email
    
    if (!name.trim()) {
      setNameError('Name is required')
      isValid = false
    }
    if (!email.trim()) {
      setEmailError('Email is required')
      isValid = false
    } else if (!email.includes('@')) {
      setEmailError('Email is invalid')
      isValid = false
    } 
    if (!isValid) {
      return
    }
    onAddUser({ name, email, phone, website, company })
    setName('')
    setEmail('')
    setPhone('')
    setWebsite('')
    setCompany('')
  }

  return (
    <div className="mb-6 p-4 border rounded">
      <h2 className="text-lg font-semibold mb-3">Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${nameError ? 'border-red-500' : 'border-gray-300'}`} />
          {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${emailError ? 'border-red-500' : 'border-gray-300'}`} />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Website</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>

        <div className="flex space-x-2">
          <button 
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
            Add User
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;