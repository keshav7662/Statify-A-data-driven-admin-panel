import { Link } from 'react-router-dom';
import DarkModeToggle from '../components/DarkMode';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <DarkModeToggle />
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
          Welcome to Our App
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Choose an option to proceed
        </p>
        <div className="flex flex-col space-y-4">
          <Link to="/login" className="w-full text-center py-2 px-4 rounded-md bg-indigo-500 dark:bg-yellow-400 text-white dark:text-gray-900 font-semibold hover:bg-indigo-600 dark:hover:bg-yellow-500">
            Login
          </Link>
          <Link to="/register" className="w-full text-center py-2 px-4 rounded-md bg-blue-500 dark:bg-pink-500 text-white dark:text-gray-900 font-semibold hover:bg-blue-600 dark:hover:bg-pink-600">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
