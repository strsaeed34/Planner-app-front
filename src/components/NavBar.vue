<template>
  <nav class="top-navbar navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <button
        @click="toggleSidebar"
        class="navbar-toggler"
        type="button"
        aria-label="Toggle sidebar"
      >
        <i class="bi bi-list"></i> <!-- Toggler icon -->
      </button>
      <router-link to="/" class="navbar-brand">Second Brain</router-link>
      <div class="navbar-items">
        <div class="user-profile">
          <div class="dropdown">
            <button
              class="dropdown-toggle"
              id="userDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle"></i>
              <span v-if="!isMobile">{{ userEmail }}</span> <!-- Hide email on mobile -->
            </button>
           <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <router-link to="/profile" class="dropdown-item">
                  <i class="bi bi-person"></i> Profile
                </router-link>
              </li>
              <li>
                <button @click="logout" class="dropdown-item">
                  <i class="bi bi-box-arrow-right"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { computed, ref, onMounted, onUnmounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const isMobile = ref(window.innerWidth <= 767.98);

const userEmail = computed(() => authStore.user?.email || 'Profile');

const toggleSidebar = () => {
  authStore.toggleSidebar();
};

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};

// Watch for window resize to update isMobile
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 767.98;
};

onMounted(() => {
  window.addEventListener('resize', updateIsMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
});
</script>

<style scoped>
.top-navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-weight: bold;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.dropdown-toggle {
  background: none;
  border: none;
  color: inherit;
}

.dropdown-menu {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>