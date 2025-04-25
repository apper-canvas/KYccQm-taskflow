import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, Filter, Calendar, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    // Update stats
    const completed = tasks.filter(task => task.status === "completed").length;
    const inProgress = tasks.filter(task => task.status === "in-progress").length;
    const pending = tasks.filter(task => task.status === "pending").length;
    
    setStats({
      total: tasks.length,
      completed,
      pending,
      inProgress
    });
  }, [tasks]);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { 
            ...task, 
            status: newStatus, 
            completedAt: newStatus === "completed" ? new Date().toISOString() : null 
          } 
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = activeTab === "all" 
    ? tasks 
    : tasks.filter(task => task.status === activeTab);

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

      <div className="card overflow-visible">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Task List</h2>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-surface-500" />
            <div className="flex rounded-lg overflow-hidden border border-surface-200 dark:border-surface-700">
              <button 
                className={`px-3 py-1 text-sm ${activeTab === "all" ? "bg-primary text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"}`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === "pending" ? "bg-primary text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"}`}
                onClick={() => setActiveTab("pending")}
              >
                Pending
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === "in-progress" ? "bg-primary text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"}`}
                onClick={() => setActiveTab("in-progress")}
              >
                In Progress
              </button>
              <button 
                className={`px-3 py-1 text-sm ${activeTab === "completed" ? "bg-primary text-white" : "bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300"}`}
                onClick={() => setActiveTab("completed")}
              >
                Completed
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mx-auto w-16 h-16 mb-4 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center"
              >
                <Calendar className="w-8 h-8 text-surface-400" />
              </motion.div>
              <h3 className="text-lg font-medium mb-1">No tasks found</h3>
              <p className="text-surface-500 dark:text-surface-400 max-w-md mx-auto">
                {activeTab === "all" 
                  ? "You don't have any tasks yet. Create your first task to get started!" 
                  : `You don't have any ${activeTab} tasks. Change the filter or add new tasks.`}
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence>
                {filteredTasks.map(task => (
                  <motion.li
                    key={task.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="task-item group"
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      task.priority === "high" ? "bg-red-500" : 
                      task.priority === "medium" ? "bg-amber-500" : "bg-green-500"
                    }`} />
                    
                    <div className="flex-grow">
                      <div className="flex items-center gap-2">
                        <h3 className={`font-medium ${task.status === "completed" ? "line-through text-surface-400" : ""}`}>
                          {task.title}
                        </h3>
                        <span className={`
                          status-badge
                          ${task.status === "pending" ? "status-pending" : 
                            task.status === "in-progress" ? "status-in-progress" : 
                            "status-completed"}
                        `}>
                          {task.status.replace("-", " ")}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                          {task.description}
                        </p>
                      )}
                      {task.dueDate && (
                        <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {task.status !== "completed" && (
                        <button
                          onClick={() => updateTaskStatus(task.id, "completed")}
                          className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                          title="Mark as completed"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      
                      {task.status === "pending" && (
                        <button
                          onClick={() => updateTaskStatus(task.id, "in-progress")}
                          className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                          title="Mark as in progress"
                        >
                          <Clock className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                        title="Delete task"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>
      </div>

      <div id="task-form" className="card">
        <div className="p-4 border-b border-surface-200 dark:border-surface-700">
          <h2 className="text-lg font-semibold">Create New Task</h2>
        </div>
        <div className="p-4">
          <MainFeature onAddTask={addTask} />
        </div>
      </div>
    </div>
  );
};

export default Home;