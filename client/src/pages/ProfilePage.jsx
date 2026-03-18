import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import assets, { userDummyData } from '../assets/assets';
import bgImage from '../assets/bgImage.svg';

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load dummy user data
  useEffect(() => {
    if (userDummyData.length > 0) {
      const currentUser = userDummyData[0];
      setName(currentUser.fullName || "Martin Johnson");
      setBio(currentUser.bio || "Hi Everyone, I am using QuickChat");
    }
  }, []);

  // Image preview (safe)
  useEffect(() => {
    if (!selectedImg) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImg);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImg]);

  // Handle image change with validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB");
      return;
    }

    setError("");
    setSelectedImg(file);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log('Profile saved:', { name, bio, selectedImg });

      setTimeout(() => {
        navigate('/');
      }, 800);

    } catch (err) {
      setError('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-black overflow-hidden">

      {/* SVG Background */}
      <img 
        src={bgImage}
        alt="background"
        className="absolute w-[900px] opacity-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
      />

      {/* Glow Effect */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full"></div>

      {/* Main Card */}
      <div className="relative z-10 w-5/6 max-w-2xl backdrop-blur-xl bg-white/5 border border-white/10 text-gray-300 flex items-center justify-between max-sm:flex-col-reverse rounded-xl shadow-lg">

        {/* FORM */}
        <form 
          onSubmit={handleSubmit} 
          className={`flex flex-col gap-5 p-10 flex-1 ${loading ? 'opacity-50 pointer-events-none' : ''}`}
        >
          <h3 className='text-lg font-semibold'>Profile Details</h3>

          {/* Image Upload */}
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer text-sm'>
            <input
              type="file"
              id='avatar'
              accept='.png, .jpg, .jpeg'
              hidden
              onChange={handleImageChange}
            />

            <img
              src={preview || assets.avatar_icon}
              alt="avatar"
              className='w-12 h-12 rounded-full object-cover ring-2 ring-violet-500'
            />

            Upload profile image
          </label>

          {/* Error */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Name */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            required
            className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500'
          />

          {/* Bio */}
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write Profile Bio"
            required
            rows={4}
            className='p-2 border border-gray-500 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-violet-500'
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-2 rounded-full text-lg hover:scale-105 transition"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </form>

        {/* Profile Preview */}
        <img
          src={preview || assets.profile_martin}
          alt="profile preview"
          className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 object-cover'
        />

      </div>
    </div>
  );
};

export default ProfilePage;