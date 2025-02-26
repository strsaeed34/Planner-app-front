import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useBaseStore } from './baseStore'; // Ensure this store is correctly defined

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    isSidebarVisible: false, // Add this line to track sidebar visibility
    errors: ref({}) || null,
    loading:ref(false),
  }),

  actions: {


    // Clear errors
    clearErrors () {() => {
      this.errors.value = {}; // Reset errors
    }},
    async login(credentials) {
      this.loading=true;
      try {
        const baseStore = useBaseStore(); // Get base store inside the function
        const response = await baseStore.post('/login', credentials);

        this.token = response.access_token;
        this.user = { email: credentials.email };

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.errors = {}
      } catch (error) {
        if (error.response && error.response.status === 422) {
        
          this.errors = error.response.data.errors; // Store errors in state
        } else if (error.response && error.response.status === 401) {
          
          this.errors = { general: ["Invalid Email or Password."] };
        }else {
          // Other server errors
          this.errors={general : ["An unexpected error occurred. Please try again later."]};
        }
        throw error;
      }
      finally{
        this.loading=false;
      }
    },

    async register(userData) {
      this.loading=true
      try {
        const baseStore = useBaseStore(); // Get base store inside the function
        const response = await baseStore.post('/register', userData);

        this.token = response.access_token;
        this.user = { email: userData.email };

        localStorage.setItem('token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        this.clearErrors ()
      } catch (error) {
        if (error.response && error.response.status === 422) {
         
          this.errors = error.response.data.errors; // Store errors in state
        } else {
          this.errors = { general: ["Registration failed. Please try again."] };
          
         
        }
        throw error;
      }
      finally{
        this.loading=false;
      }
    },

    logout(router) { // Accept router as an argument
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      if (router) {
        router.push('/login'); // Redirect to login after logout
      }
    },

    // Add the toggleSidebar action
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Toggle sidebar visibility
    },
  },
});
