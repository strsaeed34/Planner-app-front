import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useBaseStore } from './baseStore';


export const useUserStore = defineStore('user', {
  state: () => ({
    profile: null,
    errors: ref({}),
    loading: ref(false),
  }),
  actions: {


    async fetchProfile() {
      try {
        const baseStore = useBaseStore(); // Get base store inside the function
        this.profile = await baseStore.get('/user'); // Fetch user profile
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    },

    async updateProfile(updatedProfile) {
      this.loading=true
      try {
        const baseStore = useBaseStore(); // Get base store inside the function
        this.profile = await baseStore.put('/user', updatedProfile); // Update profile
      } catch (error) {
        if (error.response && error.response.status === 422) {
          console.log(error.response.data.errors)
          this.errors.value = error.response.data.errors; // Store errors in state        
          console.log(this.errors)
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
  },
});