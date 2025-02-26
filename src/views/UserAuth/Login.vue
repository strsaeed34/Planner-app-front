<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card">
          <div class="card-header">Login</div>
          <div class="card-body">
            <form @submit.prevent="login">
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
                    'is-invalid': errors.password && errors.password[0],
                  }"
                  placeholder="Password"
                />
                <div
                  id="passwordfeedback"
                  class="invalid-feedback"
                  v-if="errors.password && errors.password[0]"
                >
                  {{ errors.password && errors.password[0] }}
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100"
                :disabled="authStore.loading"
              >
                <span
                  v-if="authStore.loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span v-else>Login</span>
              </button>
            </form>
            <div v-if="errors?.general" class="alert alert-danger m-2">
              {{ errors.general[0] }}
            </div>
            <div class="text m-5">
              Dont hava an account?
              <router-link
                to="/register"
                class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const form = ref({
  email: "",
  password: "",
});

const authStore = useAuthStore();
const router = useRouter();
const { errors } = storeToRefs(authStore); // 🔥 Get errors from store

onMounted(() => {
  errors.value = {}; // Clear errors when entering the login page
});

const login = async () => {
  try {
    await authStore.login(form.value);
    router.push("/dashboard");
  } catch (error) {
    console.log("Login Failed");
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