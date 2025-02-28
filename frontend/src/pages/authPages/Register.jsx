import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkModeToggle from '../../components/DarkMode';
import { register } from '../../services/authService';
import { trackVisitors } from '../../services/visitorService';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useProfile } from '../../context/ProfileProvider';
import { fetchLoggedInUserData } from '../../services/adminService';

const Register = () => {
  const { setProfile } = useProfile();
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewProfileImage, setPreviewProfileImage] = useState('');
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
    continent: '',
    country: '',
    postalCode: '',
    userProfileImage: null
  });

  const navigate = useNavigate();
  const fileInputRef = useRef();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        const uniqueContinents = [...new Set(data.map(country => country.region).filter(Boolean))];
        setContinents(uniqueContinents);
      } catch (error) {
        console.error('Error fetching continents:', error);
      }
    })();
  }, []);

  const fetchCountries = useCallback(async (continent) => {
    if (!continent) return;
    try {
      const response = await fetch(`https://restcountries.com/v3.1/region/${continent}`);
      const data = await response.json();
      setCountries(data.map(country => country.name.common));
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  }, []);

  useEffect(() => {
    fetchCountries(userData.continent);
  }, [userData.continent, fetchCountries]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'userProfileImage' && files.length) {
      const file = files[0];
      setUserData(prev => ({ ...prev, userProfileImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => setPreviewProfileImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setUserData(prev => ({ ...prev, [name]: value }));
    }
  };

  const removeProfileImage = () => {
    setPreviewProfileImage('');
    setUserData(prev => ({ ...prev, userProfileImage: null }));
    fileInputRef.current.value = '';
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await register(formData);
      localStorage.setItem('token', response.token);
      localStorage.setItem('country', response.user.country);
      localStorage.setItem('userName', response.user.userName);
      localStorage.setItem('userId', response.user.id);
      localStorage.setItem('role', response.user.role);


      setProfile(response.user)
      trackVisitors();
      toast.success(response.message);

      navigate("/user");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <DarkModeToggle />
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">User Registration</h2>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {loading && <div className="flex justify-center items-center"><span className="loading loading-dots loading-lg"></span></div>}

        <form className="space-y-4" onSubmit={handleRegistration}>
          <div className="flex flex-col items-center">
            <div className="relative rounded-full bg-gray-100">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex justify-center items-center">
                {previewProfileImage ? (
                  <img src={previewProfileImage} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-500 text-sm">Avatar</span>
                )}
              </div>
              {previewProfileImage && (
                <button
                  onClick={removeProfileImage}
                  className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition shadow-md"
                >
                  <RiDeleteBin6Line size={16} />
                </button>
              )}
            </div>
            <label htmlFor="fileInput" className="mt-2 px-4 py-1 text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600">
              {previewProfileImage ? 'Change Photo' : 'Choose File'}
            </label>
            <input type="file" id="fileInput" name="userProfileImage" accept="image/*" onChange={handleInputChange} className="hidden" ref={fileInputRef} />
          </div>

          {['userName', 'email', 'password'].map(field => (
            <div key={field}>
              <label className="block text-gray-700 dark:text-gray-300 capitalize">{field}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={userData[field]}
                onChange={handleInputChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                placeholder={`Enter your ${field}`}
              />
            </div>
          ))}

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300">Continent</label>
              <select name="continent" value={userData.continent} onChange={handleInputChange} className="w-full px-4 py-2 mt-2 border rounded-md">
                <option value="">Select a continent</option>
                {continents.map(continent => <option key={continent} value={continent}>{continent}</option>)}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 dark:text-gray-300">Country</label>
              <select name="country" value={userData.country} onChange={handleInputChange} className="w-full px-4 py-2 mt-2 border rounded-md" disabled={!userData.continent}>
                <option value="">Select a country</option>
                {countries.map(country => <option key={country} value={country}>{country}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600" disabled={!userData.userName || !userData.email || !userData.password || !userData.country}>
            {loading ? 'Processing...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
