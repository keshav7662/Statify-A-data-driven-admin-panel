import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from '../../services/authService' // Import API service
import DarkModeToggle from "../../components/DarkMode"; // Dark mode toggle
import { useProfile } from "../../context/ProfileProvider";
import { fetchLoggedInUserData } from "../../services/adminService";

const Login = () => {
  const { setProfile } = useProfile();
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
      role: isAdmin ? "admin" : "user",
    };

    try {
      const { token, role, userName, id } = await login(credentials); // Call API

      //save in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userId', id);
      const profileData = await fetchLoggedInUserData();
      setProfile(profileData);
      // Redirect based on role
      navigate(role === "admin" ? "/admin" : "/user");
    } catch (err) {
      (err)
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage); // Display error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <DarkModeToggle />
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          {isAdmin ? "Admin Login" : "User Login"}
        </h2>

        {/* Toggle between Admin/User */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsAdmin(false)}
            className={`py-2 px-4 rounded ${!isAdmin
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-600 dark:text-gray-100"
              }`}
          >
            User Login
          </button>
          <button
            onClick={() => setIsAdmin(true)}
            className={`py-2 px-4 rounded ${isAdmin
              ? "bg-blue-500 text-white"
              : "bg-gray-200 dark:bg-gray-600 dark:text-gray-100"
              }`}
          >
            Admin Login
          </button>
        </div>

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none bg-white focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isAdmin ? "Login as Admin" : "Login"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mt-4">
            {error}
          </p>
        )}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Do not have an account yet?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-500 dark:text-blue-400 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Login;
