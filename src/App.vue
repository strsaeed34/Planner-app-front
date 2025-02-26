<template>
  <div>
    <!-- Navbar (visible on all screens) -->
    <NavBar v-if="isAuthenticated" />

    <!-- Sidebar (visible on desktop, hidden on mobile) -->
    <SideBar v-if="isAuthenticated" />

    <!-- Main content area -->
    <div class="main-content" :class="{ 'with-sidebar': isAuthenticated && !isCollapsed }">
      <router-view></router-view>
    </div>

    <!-- Bottom navigation bar (visible only on mobile) -->
    <BottomNav v-if="isAuthenticated" />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import BottomNav from '@/components/BottomNav.vue';
import { useAuthStore } from '@/stores/authStore';
import { computed } from 'vue';

// Use the authStore to check authentication status
const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.token);
const isCollapsed = computed(() => authStore.isSidebarCollapsed);
</script>

<style>
.main-content {
  margin-left: 0;
  transition: margin-left 0.3s;
  background-color: #ffffff; /* Light background for main content */
}

.with-sidebar {
  margin-left: 60px; /* Adjust based on sidebar width */
}

@media (max-width: 767.98px) {
  .with-sidebar {
    margin-left: 0; /* Remove margin on mobile */
  }
}
</style>