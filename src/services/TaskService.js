import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class TaskService {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_URL}/tasks`,
    });
  }

  async getAllTasks() {
    try {
      const response = await this.api.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  }

  async createTask(task) {
    try {
      const response = await this.api.post('/', task);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  }

  async updateTask(id, task) {
    try {
      const response = await this.api.patch(`/${id}`, task);
      return response.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      const response = await this.api.delete(`/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}

export default new TaskService();
