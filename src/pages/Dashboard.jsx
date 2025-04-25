import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTasks, setActiveTab, setLoading, setError } from "../store/taskSlice";
import { fetchTasks } from "../services/taskService";
import TaskList from "../components/TaskList";
import TaskStats from "../components/TaskStats";
import MainFeature from "../components/MainFeature";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { activeTab, stats, loading, error } = useSelector((state) => state.tasks);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        dispatch(setLoading(true));
        const tasksData = await fetchTasks();
        dispatch(setTasks(tasksData));
      } catch (err) {
        dispatch(setError(err.message || "Failed to load tasks"));
      }
    };

    // Only load tasks if user is authenticated
    if (user) {
      loadTasks();
    }
  }, [dispatch, user]);

  const handleTabChange = (tab) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <p className="text-surface-500 dark:text-surface-400">
            Organize, prioritize, and complete your tasks efficiently
          </p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary flex items-center justify-center gap-2 self-start"
          onClick={() => document.getElementById("task-form").scrollIntoView({ behavior: "smooth" })}
        >
          <PlusCircle className="w-5 h-5" />
          <span>New Task</span>
        </motion.button>
      </div>

      <TaskStats stats={stats} />

      <div className="card overflow-visible">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Task List</h2>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
              <button 
                className={`px-3 py-1 text-sm ${activeTab === "all" ? "bg-primary text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"}`}
                onClick={() => handleTabChange("all")}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === "pending" ? "bg-primary text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"}`}
                onClick={() => handleTabChange("pending")}
              >
                Pending
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === "in-progress" ? "bg-primary text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"}`}
                onClick={() => handleTabChange("in-progress")}
              >
                In Progress
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === "completed" ? "bg-primary text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"}`}
                onClick={() => handleTabChange("completed")}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-lg">
              Error loading tasks: {error}
            </div>
          ) : (
            <TaskList />
          )}
        </div>
      </div>

      <div id="task-form" className="card">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-lg font-semibold">Create New Task</h2>
        </div>
        <div className="p-4">
          <MainFeature />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;