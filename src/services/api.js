const API_BASE_URL = 'http://localhost:8080';

class ApiError extends Error {
  constructor(message, status, errors = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      throw new ApiError(`HTTP error! status: ${response.status}`, response.status);
    }
    
    const errors = errorData.errors || [];
    const message = errors.length > 0 ? errors[0].message : `HTTP error! status: ${response.status}`;
    throw new ApiError(message, response.status, errors);
  }
  
  return response.json();
};

export const taskService = {
  async getAllTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`);
      return await handleResponse(response);
    } catch (error) {
      if (error instanceof ApiError && error.status === 400) {
        return [];
      }
      throw error;
    }
  },

  async createTask(taskData) {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    
    return await handleResponse(response);
  }
};