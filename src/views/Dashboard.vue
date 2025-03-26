<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            <h3>Welcome to Your Productivity App!</h3>
            <p>You are now logged in.</p>
            <button
              @click="logout"
              class="btn btn-danger"
              :disabled="useAuthStore.loading"
            >
              <span
                v-if="useAuthStore.loading"
                class="spinner-border spinner-border-sm"
                ></span
              >
              <span v-else><i class="bi bi-box-arrow-right"></i> Logout</span>
            </button>
           <div v-if="errors?.general" class="alert alert-danger m-2">
              {{ errors.general[0] }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";



const authStore = useAuthStore();
const router = useRouter();

const { errors } = storeToRefs(authStore); // 🔥 Get errors from store

const logout = async () => {
  try {
    await authStore.logout();
    router.push("/login");
    console.log("Logout Success:");
  } catch (error) {
 
    console.log( error);

  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>