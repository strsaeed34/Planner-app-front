<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="name"
                  v-model="form.name"
                
                  :class="{ 'is-invalid': errors.name && errors.name[0] }"
                  placeholder="Your Name"
                />
                <div
                  id="feedbackname"
                  class="invalid-feedback"
                  v-if="errors.name && errors.name[0]"
                >
                  {{ errors.name && errors.name[0]}}
                </div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  :class="{ 'is-invalid': errors.email && errors.email[0] }"
                  placeholder="name@example.com"
                />
                <div
                  id="feedbackemail"
                  class="invalid-feedback"
                  v-if="errors.email && errors.email[0]"
                >
                  {{ errors.email && errors.email[0] }}
                </div>
              </div>
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
                  v-model="form.password_confirmation"
                />
              </div>
              <button type="submit" class="btn btn-primary w-100"
              :disabled="authStore.loading">
               <span
                  v-if="authStore.loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span v-else>Register</span>
              </button>
            </form>
            <div v-if="errors?.general" class="alert alert-danger m-2">
              {{ errors.general[0] }}
            </div>
            <div class="text m-5">
              Already hava an account?
              <router-link
                to="/login"
                class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Login
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref  , onMounted} from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const authStore = useAuthStore();
const router = useRouter();
const { errors } = storeToRefs(authStore); // 🔥 Get errors from store


onMounted(() => {
   errors.value={} // Clear errors when entering the register page
});


const register = async () => {
  try {
    await authStore.register(form.value);
    if (authStore.token) {
      router.push("/dashboard");
    }
  } catch (error) {
    console.log("Registration failed. Please try again.",errors);

  }
};
</script>



<style scoped>
/* Add custom styles for mobile */
@media (max-width: 767.98px) {
  .card {
    margin-top: 20px; /* Add spacing for mobile */
  }
}
</style>