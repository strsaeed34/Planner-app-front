<template>
  <div class="page">
    <!-- Navbar (visible on all screens) -->
    <NavBar v-if="isAuthenticated" />

    <!-- Sidebar (visible on desktop, hidden on mobile) -->
    <SideBar v-if="isAuthenticated && authStore.isSidebarVisible " />

    <!-- Main content area -->
    <div
      class="main-content"
      :class="{ 'with-sidebar': isAuthenticated && authStore.isSidebarVisible  }"
    >
      <router-view></router-view>
    </div>

    <!-- Bottom navigation bar (visible only on mobile) -->
    <BottomNav v-if="isAuthenticated" />
  </div>
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import SideBar from "@/components/SideBar.vue";
import BottomNav from "@/components/BottomNav.vue";
import { useAuthStore } from "@/stores/authStore";
import { computed, onMounted } from "vue";


// Use the authStore to check authentication status
const authStore = useAuthStore();
const isAuthenticated = computed(() => !!authStore.token);


</script>

<style>

.page{
    
}
.main-content {
  margin-left: 0;
  margin-right: 0px;
  transition: margin-left 0.3s;
  background-color: #ffff; /* Light background for main content */
}

.with-sidebar {
  /* margin-left: 110px; */
  /* Adjust based on sidebar width */
}

@media (max-width: 767.98px) {
  .with-sidebar {
    margin-left: 0; /* Remove margin on mobile */
  }
}
</style>