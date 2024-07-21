import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut
} from '../redux/user/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imageProgress, setimageProgress] = useState(0);
  const [ImageError, setImageError] = useState(false);
  const [FormData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    // Simulate or implement your file upload logic here
    try {
      // Example: Replace with your actual file upload logic
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

      // Example fetch request to Cloudinary or other file storage service
      const res = await fetch('https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        setFormData({ ...FormData, profilePicture: data.secure_url });
      } else {
        setImageError(true);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setImageError(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...FormData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      // Example: Replace with your API endpoint for updating user
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(FormData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      // Example: Replace with your API endpoint for deleting user
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch(`/api/auth/signout`);
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='bg-[#1C1C1C] p-8 h-min-h-screen'>
      <div className='p-3 max-w-lg mx-auto bg-white rounded-2xl'>
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
          <input type="file" ref={fileRef} hidden accept='image/*'
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={FormData.profilePicture || currentUser.profilePicture}
            alt=""
            className='h-24 w-24 mt-2 self-center bg-slate-200 rounded-full cursor-pointer object-cover'
            onClick={() => fileRef.current.click()}
          />

          <p className='self-center text-sm'>
            {ImageError ? (
              <span className='text-red-600'>
                Error uploading image (file size must be less than 2 mb)
              </span>
            ) : imageProgress > 0 && imageProgress < 100 ? (
              <span className='text-slate-700'>{`Uploading: ${imageProgress} %`}</span>
            ) : imageProgress === 100 ? (
              <span className='text-green-600'>Image uploaded successfully</span>
            ) : (
              ''
            )}
          </p>

          <input type="text" id='username' placeholder='Username' defaultValue={currentUser.username} className='bg-slate-100 rounded-lg p-3' onChange={handleChange} />
          <input type="email" id='email' placeholder='Email' defaultValue={currentUser.email} className='bg-slate-100 rounded-lg p-3' onChange={handleChange} />
          <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' onChange={handleChange} />
          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'Loading' : 'Update'}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span onClick={handleDeleteAccount} className='text-red-600 cursor-pointer'>Delete Account</span>
          <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign out</span>
        </div>
        <p className='text-red-600 mt-5'>{error && 'Something went wrong!'}</p>
        <p className='text-green-600 mt-5'>{updateSuccess && 'User updated successfully!'}</p>
      </div>
    </div>
  );
};

export default Profile;
