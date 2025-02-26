<template>
  <div
    class="sidebar"
    :class="{ 'sidebar-collapsed': isCollapsed, 'sidebar-mobile-hidden': !isSidebarVisible }"
  >
    <div class="sidebar-header">
      <button @click="toggleCollapse" class="btn btn-link">
        <i class="bi bi-list"></i> <!-- Toggler icon -->
      </button>
      <span v-if="!isCollapsed">Second Brain</span>
    </div>
    <ul class="sidebar-nav">

      <li>
        <router-link to="/dashboard" class="nav-link" :class="{ active: isActive('/dashboard') }">
          <i class="bi bi-house"></i>
          <span v-if="!isCollapsed">Dashboard</span>
        </router-link>
      </li>
         <li>
        <router-link to="/notes" class="nav-link" :class="{ active: isActive('/notes') }">
          <i class="bi bi-journal-text"></i>
          <span v-if="!isCollapsed">Notes</span>
        </router-link>
      </li>
      <li>
        <router-link to="/settings" class="nav-link" :class="{ active: isActive('/settings') }">
          <i class="bi bi-gear"></i>
          <span v-if="!isCollapsed">Settings</span>
        </router-link>
      </li>
      <li>
        <router-link to="/contact-support" class="nav-link" :class="{ active: isActive('/contact-support') }">
          <i class="bi bi-headset"></i>
          <span v-if="!isCollapsed">Contact Support</span>
        </router-link>
      </li>
      <li>
        <router-link to="/profile" class="nav-link" :class="{ active: isActive('/profile') }">
          <i class="bi bi-person"></i>
          <span v-if="!isCollapsed">Profile</span>
        </router-link>
      </li>
      <li>
        <button @click="logout" class="nav-link">
          <i class="bi bi-box-arrow-right"></i>
          <span v-if="!isCollapsed">Logout</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const isCollapsed = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const isSidebarVisible = computed(() => authStore.isSidebarVisible);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

const isActive = (path) => {
  return route.path === path;
};

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background-color: #f8f9fa; /* Light background */
  color: #212529; /* Dark text */
  transition: transform 0.3s, width 0.3s;
  position: fixed;
  z-index: 1000;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-mobile-hidden {
  transform: translateX(-100%);
}

.sidebar-header {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #e9ecef; /* Slightly darker background for header */
}

.sidebar-nav {
  list-style: none;
  padding: 0;
}

.sidebar-nav li {
  margin: 10px 0;
}

.sidebar-nav .nav-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: #212529; /* Dark text */
  text-decoration: none;
}

.sidebar-nav .nav-link:hover,
.sidebar-nav .nav-link.active {
  background-color: #e9ecef; /* Slightly darker background for active/hover */
}

.sidebar-nav .nav-link i {
  font-size: 1.2rem;
}

@media (min-width: 768px) {
  .sidebar-mobile-hidden {
    transform: translateX(0);
  }
}
</style>