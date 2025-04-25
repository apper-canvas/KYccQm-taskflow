const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient("7qxCIbP7lC6DvSYy0kWsW0cRcXR8mfKY");
};

export const fetchTasks = async () => {
  try {
    const apperClient = getApperClient();
    const params = {
      fields: ["Id", "Title", "Description", "Priority", "Status", "DueDate", "CreatedAt", "CompletedAt"],
      pagingInfo: { limit: 100, offset: 0 },
      orderBy: [{ field: "CreatedAt", direction: "desc" }],
    };
    
    const response = await apperClient.fetchRecords("Tasks", params);
    
    if (!response || !response.data) {
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      record: {
        Title: taskData.title,
        Description: taskData.description || "",
        Priority: taskData.priority,
        Status: taskData.status,
        DueDate: taskData.dueDate || null,
        CreatedAt: new Date().toISOString(),
        CompletedAt: taskData.status === "completed" ? new Date().toISOString() : null
      }
    };
    
    const response = await apperClient.createRecord("Tasks", params);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, newStatus) => {
  try {
    const apperClient = getApperClient();
    
    const params = {
      record: {
        Status: newStatus,
        CompletedAt: newStatus === "completed" ? new Date().toISOString() : null
      }
    };
    
    const response = await apperClient.updateRecord("Tasks", taskId, params);
    return response.data;
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const deleteTaskById = async (taskId) => {
  try {
    const apperClient = getApperClient();
    await apperClient.deleteRecord("Tasks", taskId);
    return true;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};