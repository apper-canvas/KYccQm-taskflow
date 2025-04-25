import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Sun, Moon, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { clearUser } from "./store/userSlice";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark" || 
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    // Clear user data from Redux store
    dispatch(clearUser());
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && (
        <header className="sticky top-0 z-10 glass border-b border-surface-200 dark:border-surface-700">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">T</span>
              </motion.div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                TaskFlow
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <div className="text-sm text-surface-600 dark:text-surface-300">
                  Welcome, {user.firstName || user.emailAddress}
                </div>
              )}
              <div className="flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full neumorphic-light dark:neumorphic-dark"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-primary" />
                  )}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLogout}
                  className="p-2 rounded-full neumorphic-light dark:neumorphic-dark"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                </motion.button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className={`flex-grow container mx-auto px-4 py-6 ${!isAuthenticated ? 'flex items-center justify-center' : ''}`}>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Login />
          } />
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
          } />
          <Route path="/" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          } />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {isAuthenticated && (
        <footer className="border-t border-surface-200 dark:border-surface-700 py-4">
          <div className="container mx-auto px-4 text-center text-surface-500 text-sm">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;