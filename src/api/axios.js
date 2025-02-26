import axios from 'axios';

// Create a reusable Axios instance
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle errors globally
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized errors (e.g., redirect to login)
//       //console.error('Unauthorized: Redirecting to login...');
//       localStorage.removeItem('token'); // Clear the token
//       //window.location.href = '/login'; // Redirect to login
//     }
//     return Promise.reject(error);
//   }
// );

export default apiClient;