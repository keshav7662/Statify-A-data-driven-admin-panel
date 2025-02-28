import { useState, useEffect } from 'react';
import { TiWeatherSunny } from "react-icons/ti";
import { MdDarkMode } from "react-icons/md";
const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('dark-mode', newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className='absolute top-4 right-4 px-4 py-2 font-semibold rounded-md text-yellow-400 dark:text-white p-4 border-2 shadow-sm'
    >
      {darkMode ? <TiWeatherSunny /> : <MdDarkMode />}
    </button>
  );
};

export default DarkMode;
