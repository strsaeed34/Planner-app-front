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
                  {{ errors.name && errors.name[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input
                  type=""
                  class="form-control"
                  id="email"
                  v-model="form.email"
                  :class="{
                    'is-invalid':
                      (errors.email && errors.email[0])  
                  }"
                  placeholder="Your Email"
                />
                <div
                  id="feedbackEmail1"
                  class="invalid-feedback"
                  v-if="errors.email && errors.email[0]"
                >
                  {{ errors.email && errors.email[0] }}
                  {{ errors.email && errors.email[1] }}
                </div>
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
                <span v-else>Update Profile</span>
              </button>
            </form>
            <button
              @click="router.push('/changepassword')"
              class="btn btn-danger mt-2"
            >
              changePassword
            </button>
            <div v-if="errors?.success" class="alert alert-success m-2">
              {{ errors.success[0] }}
            </div>
            <div v-if="errors?.general" class="alert alert-danger m-2">
              {{ errors.general[0] }}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const userStore = useUserStore();
const router = useRouter();

const form = ref({
  name: authStore.user?.name || "",
  email: authStore.user?.email || "",
  password: "",
  password_confirmation: "",
});

const { errors } = storeToRefs(userStore); // 🔥 Get errors from store

// Fetch profile data when the component mounts
onMounted(async () => {
  await userStore.fetchProfile();
  form.value = { ...authStore.user, ...userStore.profile };
  errors.value = {};
});

const updateProfile = async () => {
  try {
    await userStore.updateProfile(form.value);
    console.log("Profile updated successfully!");
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<style scoped>
/* Add your custom styles here */
</style>
