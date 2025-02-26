<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Profile</div>
          <div class="card-body">
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" v-model="form.name" >
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="form.email" >
              </div>
              <button type="submit" class="btn btn-primary w-50"
              
              
                :disabled="userStore.loading"
              >
                <span
                  v-if="userStore.loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span v-else>Update Profile</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const userStore = useUserStore();

const form = ref({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
});

const { errors } = storeToRefs(userStore); // 🔥 Get errors from store


// Fetch profile data when the component mounts
onMounted(async () => {
  await userStore.fetchProfile();
  form.value = { ...authStore.user, ...userStore.profile };
     
});

const updateProfile = async () => {
  try {
    await userStore.updateProfile(form.value);
    console.log('Profile updated successfully!');
  } catch (error) {

    console.log(errors);
   
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
