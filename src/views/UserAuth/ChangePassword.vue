<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">Change Password</div>
          <div class="card-body">
            <form @submit.prevent="changePassword">
              
               <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="form.password"
               :class="{
                    'is-invalid': errors.password && errors.password[0]
                  }"
                  placeholder="Password"
                />
                <div id="passwordfeedback" class="invalid-feedback" v-if="errors.password && errors.password[0]">
                {{ errors.password && errors.password[0] }}
              </div>
              </div>
              <div class="mb-3">
                <label for="password_confirmation" class="form-label"
                  >Confirm Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="password_confirmation"
                  placeholder="Password_confirmation"
                  v-model="form.password_confirmation"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary w-50 ml-4"
                :disabled="userStore.loading"
              >
                <span
                  v-if="userStore.loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span v-else>Change Password</span>
              </button>
            </form>
            <div v-if="errors?.success" class="alert alert-success m-2">
              {{ errors.success[0] }}
            </div>
            <div v-if="errors?.general" class="alert alert-danger m-2">
              {{ errors.general[0] }},
             
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";


const userStore = useUserStore();
 
const form = ref({ 
  password:"",
  password_confirmation:"",
});

const { errors } = storeToRefs(userStore); // 🔥 Get errors from store

// Fetch profile data when the component mounts
onMounted(async () => {
 errors.value = {}; // Clear errors when entering the login page

});

const changePassword = async () => {
  try {
    await userStore.updateProfile(form.value);
    console.log("Password Changed successfully!");
  } catch (error) {
      console.log("Password is not Changed !", error.message);
      console.log(errors);
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
