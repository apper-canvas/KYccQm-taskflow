import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  filteredTasks: [],
  activeTab: 'all',
  stats: {
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0
  },
  loading: false,
  error: null,
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = getFilteredTasks(action.payload, state.activeTab);
      state.stats = getTaskStats(action.payload);
      state.loading = false;
      state.error = null;
    },
    addTask: (state, action) => {
      state.tasks = [action.payload, ...state.tasks];
      state.filteredTasks = getFilteredTasks(state.tasks, state.activeTab);
      state.stats = getTaskStats(state.tasks);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map(task => 
        task.Id === action.payload.Id ? action.payload : task
      );
      state.filteredTasks = getFilteredTasks(state.tasks, state.activeTab);
      state.stats = getTaskStats(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.Id !== action.payload);
      state.filteredTasks = getFilteredTasks(state.tasks, state.activeTab);
      state.stats = getTaskStats(state.tasks);
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      state.filteredTasks = getFilteredTasks(state.tasks, action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const getFilteredTasks = (tasks, activeTab) => {
  if (activeTab === 'all') return tasks;
  return tasks.filter(task => task.Status === activeTab);
};

const getTaskStats = (tasks) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.Status === 'completed').length;
  const inProgress = tasks.filter(task => task.Status === 'in-progress').length;
  const pending = tasks.filter(task => task.Status === 'pending').length;
  
  return {
    total,
    completed,
    pending,
    inProgress
  };
};

export const { 
  setTasks, 
  addTask, 
  updateTask, 
  deleteTask, 
  setActiveTab,
  setLoading,
  setError
} = taskSlice.actions;

export default taskSlice.reducer;