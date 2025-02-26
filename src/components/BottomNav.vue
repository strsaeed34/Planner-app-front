<template>
  <div class="bottom-nav">
    <router-link to="/home" class="nav-link" :class="{ active: isActive('/home') }">
      <i class="bi bi-house"></i>
      <span>Home</span>
    </router-link>
    <router-link to="/notes" class="nav-link" :class="{ active: isActive('/notes') }">
      <i class="bi bi-journal-text"></i>
      <span>Notes</span>
    </router-link>
    <router-link to="/tasks" class="nav-link" :class="{ active: isActive('/tasks') }">
      <i class="bi bi-check2-square"></i>
      <span>Tasks</span>
    </router-link>
    <router-link to="/timeline" class="nav-link" :class="{ active: isActive('/timeline') }">
      <i class="bi bi-calendar-event"></i>
      <span>Timeline</span>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const isActive = (path) => {
  return route.path === path;
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f8f9fa; /* Light background */
  color: #212529; /* Dark text */
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  z-index: 1000;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.bottom-nav .nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #212529; /* Dark text */
  text-decoration: none;
}

.bottom-nav .nav-link.active {
  color: #0d6efd; /* Bootstrap primary color for active link */
}

.bottom-nav .nav-link i {
  font-size: 1.2rem;
}

.bottom-nav .nav-link span {
  font-size: 0.8rem;
}

@media (min-width: 768px) {
  .bottom-nav {
    display: none; /* Hide bottom nav on larger screens */
  }
}
</style>