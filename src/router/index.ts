import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import ContactList from '../components/ContactList.vue';
import AddContact from '../components/AddContact.vue';
import EditContact from '../components/EditContact.vue';
import Login from '../components/LoginUsuario.vue';
import { useAuthStore } from '../store/authStore';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: ContactList },
  { path: '/add', component: AddContact },
  { path: '/edit/:id', component: EditContact },
  { path: '/login', component: Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.path !== '/login' && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
