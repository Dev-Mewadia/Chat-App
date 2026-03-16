import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import assets, { userDummyData } from '../assets/assets';

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate();

  // Load dummy user data initially
  useEffect(() => {
    if (userDummyData.length > 0) {
      const currentUser = userDummyData[0]; // Assume first user
      setName(currentUser.fullName || "Martin Johnson")
      setBio(currentUser.bio || "Hi Everyone, I am using QuickChat")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setError("")
    try {
      // TODO: Integrate with backend API
      // await fetch('/api/users/profile', { method: 'PUT', body: JSON.stringify({ name, bio, selectedImg }) })
      console.log('Profile saved:', { name, bio, selectedImg })
      navigate('/')
    } catch (err) {
      setError('Failed to save profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center bg-cover bg-no-repeat relative'>
     <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg'>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-10 flex-1">
         <h3 className='text-lg'>Profile Details</h3>
         <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer text-sm'>
            <input 
              onChange={(e) => setSelectedImg(e.target.files[0])} 
              type="file" 
              id='avatar' 
              accept='.png, .jpg,.jpeg, .heic' 
              hidden 
            />
            <img 
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
              alt="Profile avatar"
              className={`w-12 h-12 rounded-full ${selectedImg ? 'ring-2 ring-violet-500' : ''}`}
            />
            Upload profile image
         </label>
         {error && <p className="text-red-400 text-sm">{error}</p>}
         <input 
           onChange={(e) => setName(e.target.value)}
           value={name}
           type="text" 
           required 
           placeholder='Your Name' 
           className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent' 
         />
         <textarea 
           onChange={(e) => setBio(e.target.value)} 
           value={bio} 
           placeholder="Write Profile Bio" 
           required 
           className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 bg-transparent" 
           rows={4} 
         />
         <button 
           type="submit" 
           disabled={loading}
           className="bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer hover:from-purple-500 hover:to-violet-700 disabled:opacity-50"
         >
           {loading ? 'Saving...' : 'Save'}
         </button>
        </form>
         <img className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover' src={assets.profile_martin} alt="Profile preview" />
     </div>
    </div>
  )
}

export default ProfilePage

