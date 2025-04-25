import { motion } from "framer-motion";
import { CheckCircle2, Clock, BarChart3, Calendar } from "lucide-react";

const TaskStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p className="text-surface-500 dark:text-surface-400 text-sm">Total Tasks</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p className="text-surface-500 dark:text-surface-400 text-sm">Completed</p>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="text-surface-500 dark:text-surface-400 text-sm">In Progress</p>
          <p className="text-2xl font-bold">{stats.inProgress}</p>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <Calendar className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div>
          <p className="text-surface-500 dark:text-surface-400 text-sm">Pending</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TaskStats;