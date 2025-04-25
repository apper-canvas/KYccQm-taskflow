import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, updateTask } from "../store/taskSlice";
import { updateTaskStatus, deleteTaskById } from "../services/taskService";
import { format } from "date-fns";

const TaskList = () => {
  const dispatch = useDispatch();
  const { filteredTasks, activeTab } = useSelector((state) => state.tasks);

  const handleStatusUpdate = async (taskId, newStatus) => {
    try {
      const updatedTask = await updateTaskStatus(taskId, newStatus);
      dispatch(updateTask(updatedTask));
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTaskById(taskId);
        dispatch(deleteTask(taskId));
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  };

  if (filteredTasks.length === 0) {
    return (
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
    );
  }
  
  return (
    <ul className="space-y-2">
      <AnimatePresence>
        {filteredTasks.map(task => (
          <motion.li
            key={task.Id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="task-item group"
          >
            <div className={`w-3 h-3 rounded-full ${
              task.Priority === "high" ? "bg-red-500" : 
              task.Priority === "medium" ? "bg-amber-500" : "bg-green-500"
            }`} />
            
            <div className="flex-grow">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium ${task.Status === "completed" ? "line-through text-surface-400" : ""}`}>
                  {task.Title}
                </h3>
                <span className={`
                  status-badge
                  ${task.Status === "pending" ? "status-pending" : 
                    task.Status === "in-progress" ? "status-in-progress" : 
                    "status-completed"}
                `}>
                  {task.Status.replace("-", " ")}
                </span>
              </div>
              {task.Description && (
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-1">
                  {task.Description}
                </p>
              )}
              {task.DueDate && (
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  Due: {format(new Date(task.DueDate), 'MMM d, yyyy')}
                </p>
              )}
            </div>
            
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {task.Status !== "completed" && (
                <button
                  onClick={() => handleStatusUpdate(task.Id, "completed")}
                  className="p-1 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30 rounded"
                  title="Mark as completed"
                >
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
              
              {task.Status === "pending" && (
                <button
                  onClick={() => handleStatusUpdate(task.Id, "in-progress")}
                  className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded"
                  title="Mark as in progress"
                >
                  <Clock className="w-4 h-4" />
                </button>
              )}
              
              <button
                onClick={() => handleDeleteTask(task.Id)}
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
  );
};

export default TaskList;