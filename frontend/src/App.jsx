import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/authPages/Login'
import Home from './pages/Home'
import Register from "./pages/authPages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardAdmin from "./pages//adminDashboard/Dashboard/Dashboard";
import DashboardUser from './pages/userDashboard/Dashboard'
import Insights from './pages/adminDashboard/Insights/Insights'
import Settings from './pages/adminDashboard/Settings/Settings'
import Analytics from "./pages/adminDashboard/Analytics/Analytics";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import { ProfileProvider } from "./context/ProfileProvider";
const App = () => {
  return (
    <ProfileProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route for admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* Admin Dashboard as the root path */}
              <Route index element={<DashboardAdmin />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="insights" element={<Insights />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* protected route for users */}
          <Route element={<ProtectedRoute allowedRoles={['user']} />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<DashboardUser />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ProfileProvider>
  )
}

export default App