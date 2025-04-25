import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const homeLink = isAuthenticated ? "/dashboard" : "/login";

  return (
    <div className="h-full flex flex-col items-center justify-center py-16 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="text-9xl font-bold text-surface-300 dark:text-surface-700">404</div>
      </motion.div>
      
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      
      <p className="text-surface-500 dark:text-surface-400 max-w-md mb-8">
        We couldn't find the page you were looking for. Perhaps you took a wrong turn somewhere.
      </p>
      
      <Link 
        to={homeLink}
        className="btn btn-primary flex items-center gap-2"
      >
        <Home className="w-5 h-5" />
        Back to {isAuthenticated ? "Dashboard" : "Home"}
      </Link>
    </div>
  );
};

export default NotFound;