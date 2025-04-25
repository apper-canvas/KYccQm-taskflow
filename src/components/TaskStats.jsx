import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, ListTodo, ListChecks } from "lucide-react";
import Chart from "react-apexcharts";

const TaskStats = ({ stats }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "task-stats",
      type: "donut",
      fontFamily: "Inter, sans-serif",
    },
    labels: ["Completed", "In Progress", "Pending"],
    colors: ["#10B981", "#3B82F6", "#F59E0B"],
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "55%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [chartSeries, setChartSeries] = useState([0, 0, 0]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Update chart data when stats change
    setChartSeries([
      stats.completed,
      stats.inProgress,
      stats.pending,
    ]);
  }, [stats]);

  useEffect(() => {
    // Update chart theme based on dark mode
    const darkModeListener = (e) => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    // Check initial state
    setIsDarkMode(document.documentElement.classList.contains("dark"));

    // Listen for dark mode changes
    const observer = new MutationObserver(darkModeListener);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Update chart theme when dark mode changes
    setChartOptions((prev) => ({
      ...prev,
      theme: {
        mode: isDarkMode ? "dark" : "light",
      },
      stroke: {
        colors: [isDarkMode ? "#1F2937" : "#F9FAFB"],
      },
    }));
  }, [isDarkMode]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card p-4 lg:col-span-1"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-full bg-surface-100 dark:bg-surface-800 p-2">
            <ListChecks className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm text-surface-600 dark:text-surface-400">
            Total Tasks
          </span>
        </div>
        <div className="text-3xl font-bold">{stats.total}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="card p-4 lg:col-span-1"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-500" />
          </div>
          <span className="text-sm text-surface-600 dark:text-surface-400">
            Completed
          </span>
        </div>
        <div className="text-3xl font-bold">{stats.completed}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="card p-4 lg:col-span-1"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-2">
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-500" />
          </div>
          <span className="text-sm text-surface-600 dark:text-surface-400">
            In Progress
          </span>
        </div>
        <div className="text-3xl font-bold">{stats.inProgress}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="card p-4 lg:col-span-1"
      >
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-2">
            <ListTodo className="w-4 h-4 text-amber-600 dark:text-amber-500" />
          </div>
          <span className="text-sm text-surface-600 dark:text-surface-400">
            Pending
          </span>
        </div>
        <div className="text-3xl font-bold">{stats.pending}</div>
      </motion.div>

      {/* Chart will only be shown when there are tasks */}
      {stats.total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="card p-4 lg:col-span-4 mt-2"
        >
          <h3 className="text-lg font-medium mb-4">Task Distribution</h3>
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="donut"
            height={320}
          />
        </motion.div>
      )}
    </div>
  );
};

export default TaskStats;