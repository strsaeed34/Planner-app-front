import axios from 'axios';

// Vite loads the matching environment file:
// .env.development for local development
// .env.production for production builds
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Attach the Sanctum personal access token to API requests.
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Keep the existing response behavior unchanged.
export default apiClient;
