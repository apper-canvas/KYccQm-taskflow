import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setUser, setLoading, setError } from "../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initializing, setInitializing] = useState(true);
  const [loginError, setLoginError] = useState(null);

  useEffect(() => {
    const setupApperAuth = () => {
      const { ApperClient, ApperUI } = window.ApperSDK;
      const apperClient = new ApperClient("YOUR_CANVAS_ID");
      
      dispatch(setLoading(true));
      
      ApperUI.setup(apperClient, {
        target: '#authentication',
        clientId: "YOUR_CANVAS_ID",
        hide: [],
        view: 'login',
        onSuccess: function(user, account) {
          dispatch(setUser(user));
          navigate('/dashboard');
        },
        onError: function(error) {
          console.error("Authentication failed:", error);
          setLoginError("Authentication failed. Please try again.");
          dispatch(setError("Authentication failed"));
        },
        onLoad: function() {
          setInitializing(false);
          dispatch(setLoading(false));
        }
      });
      
      ApperUI.showLogin("#authentication");
    };

    setupApperAuth();
  }, [dispatch, navigate]);

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mx-auto mb-4"
        >
          <span className="text-white font-bold text-2xl">T</span>
        </motion.div>
        <h1 className="text-3xl font-bold mb-2">Welcome to TaskFlow</h1>
        <p className="text-surface-500 dark:text-surface-400">
          Login to manage your tasks efficiently
        </p>
      </div>
      
      {loginError && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-lg mb-4">
          {loginError}
        </div>
      )}
      
      <div className="card overflow-hidden">
        {initializing ? (
          <div className="p-8 flex justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div 
            id="authentication" 
            className="min-h-[400px] flex items-center justify-center" 
          />
        )}
      </div>

      <div className="mt-6 text-center text-sm text-surface-500 dark:text-surface-400">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary dark:text-primary-light font-medium hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;