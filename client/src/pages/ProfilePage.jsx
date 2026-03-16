import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../assets/assets";

const ProfilePage = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("Martin Jhonson");
  const [bio, setBio] = useState("Hi EveryOne, i am using QuickChat");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center relative">

      {/* Glass Card */}
      <div
        className="w-[900px] max-w-[90%] flex justify-between items-center
        bg-white/5 backdrop-blur-xl border border-white/10
        rounded-2xl shadow-2xl p-10"
      >

        {/* LEFT SIDE FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-[45%] text-gray-200"
        >
          <h3 className="text-lg font-medium">Profile details</h3>

          <label
            htmlFor="avatar"
            className="flex items-center gap-3 cursor-pointer text-sm"
          >
            <input
              type="file"
              id="avatar"
              hidden
              accept=".png,.jpg,.jpeg,.heic"
              onChange={(e) => setSelectedImg(e.target.files[0])}
            />

            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />

            upload profile image
          </label>

          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 rounded-md border border-gray-500 bg-transparent
            focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <textarea
            rows={4}
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="p-2 rounded-md border border-gray-500 bg-transparent
            focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-400 to-violet-600
            py-2 rounded-full text-white mt-2"
          >
            Save
          </button>
        </form>

        {/* RIGHT SIDE LOGO */}
        <div className="flex justify-center items-center w-[50%]">

          <img
            src={assets.logo_icon}
            alt="QuickChat"
            className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
          />

        </div>

      </div>
    </div>
  );
};

export default ProfilePage;