import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  id: number;
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null); // Usuario autenticado
  const isAuthenticated = ref<boolean>(false); // Estado de autenticación

  // Cargar usuarios desde un archivo JSON simulado
  const loadUsers = async () => {
    const response = await fetch('/usuarios.json');
    return await response.json();
  };

  // Función para login
  const login = async (username: string, password: string) => {
    const users = await loadUsers();
    const foundUser = users.find(
      (user: User) => user.username === username && user.password === password
    );

    if (foundUser) {
      user.value = foundUser;
      isAuthenticated.value = true;
      return true;
    }

    return false; // Si no se encuentra el usuario
  };

  // Función para logout
  const logout = () => {
    user.value = null;
    isAuthenticated.value = false;
  };

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
});
