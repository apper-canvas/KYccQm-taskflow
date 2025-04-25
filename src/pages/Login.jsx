import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { setUser, setLoading, setError } from "../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const { ApperClient, ApperUI } = window.ApperSDK;
    const apperClient = new ApperClient("7qxCIbP7lC6DvSYy0kWsW0cRcXR8mfKY");
    
    ApperUI.setup(apperClient, {
      target: '#authentication',
      clientId: "7qxCIbP7lC6DvSYy0kWsW0cRcXR8mfKY",
      hide: [],
      view: 'login',
      onSuccess: function(user, account) {
        // Store user details in Redux
        dispatch(setUser(user));
        
        // Navigate to dashboard after successful authentication
        navigate('/dashboard');
      },
      onError: function(error) {
        // Handle authentication errors
        console.error("Authentication failed:", error);
        dispatch(setError("Authentication failed. Please try again."));
      }
    });
    
    ApperUI.showLogin("#authentication");
    
    return () => {
      // Clean up any UI elements when component unmounts
      const authContainer = document.getElementById('authentication');
      if (authContainer) {
        authContainer.innerHTML = '';
      }
    };
  }, [dispatch, navigate]);

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4"
        >
          <span className="text-white font-bold text-2xl">T</span>
        </motion.div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          TaskFlow
        </h1>
        <p className="text-surface-600 dark:text-surface-400">
          Sign in to organize your tasks efficiently
        </p>
      </motion.div>

      {error && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div 
        id="authentication" 
        className="min-h-[400px] flex items-center justify-center mb-6" 
      />

      <div className="text-center">
        <p className="text-surface-600 dark:text-surface-400 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;