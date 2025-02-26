import { defineStore } from 'pinia';
import apiClient from '@/api/axios';

export const useBaseStore = defineStore('base', {
  actions: {
    async get(url) {
      try {
        const response = await apiClient.get(url);
        return response.data;
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
        throw error;
      }
    },

    async post(url, data) {
      try {
        const response = await apiClient.post(url, data);
        return response.data;
      } catch (error) {
        console.error(`Error posting data to ${url}:`, error);
        throw error;
      }
    },

    async put(url, data) {
      try {
        const response = await apiClient.put(url, data);
        return response.data;
      } catch (error) {
        console.error(`Error updating data at ${url}:`, error);
        throw error;
      }
    },

    async delete(url) {
      try {
        const response = await apiClient.delete(url);
        return response.data;
      } catch (error) {
        console.error(`Error deleting data at ${url}:`, error);
        throw error;
      }
    },
  },
});