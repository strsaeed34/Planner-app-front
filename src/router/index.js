import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/UserAuth/Login.vue';
import Register from '@/views/UserAuth/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Profile from '@/views/UserAuth/Profile.vue';
import ChangePassword from '@/views/UserAuth/ChangePassword.vue';
import Notes from '@/views/Notes.vue'; 
import Tasks from '@/views/Tasks.vue'; 
import TaskPlanner from '@/views/TaskPlanner.vue'; 
import Home from '@/views/Home.vue'; 
import Settings from '@/views/Settings.vue'; 
import NoteEditor from '@/views/NoteEditor.vue'; 
import ContactSupport from '@/views/Contact-Support.vue'; 

import { useAuthStore } from '@/stores/authStore';


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/notes', component: Notes, meta: { requiresAuth: true } },
  { path: '/tasks', component: Tasks, meta: { requiresAuth: true } },
  { path: '/taskplanner', component: TaskPlanner, meta: { requiresAuth: true } },
  { path: '/Home', component: Home, meta: { requiresAuth: true } },
  { path: '/noteeditor', component: NoteEditor, meta: { requiresAuth: true } },
  { path: '/settings', component: Settings, meta: { requiresAuth: true } },
  { path: '/contact-support', component: ContactSupport, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } }, // Add the profile route
  { path: '/changepassword', component: ChangePassword, meta: { requiresAuth: true } }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) {
    next('/login'); // Redirect to login if not authenticated
  } else if ((to.path === '/login' || to.path === '/register') && authStore.token) {
    next('/dashboard'); // Redirect to dashboard if already logged in
  } else {
    next(); // Proceed to the requested route
  }
});

export default router;