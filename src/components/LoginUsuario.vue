<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Iniciar sesión</h1>
    <form @submit.prevent="handleLogin" class="bg-white shadow-md rounded px-8 py-6">
      <input v-model="username" placeholder="Nombre de usuario" required class="border border-gray-300 p-2 mb-4 w-full rounded" />
      <input v-model="password" type="password" placeholder="Contraseña" required class="border border-gray-300 p-2 mb-4 w-full rounded" />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Iniciar sesión</button>
      <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuthStore } from '../store/authStore';
import router from '../router';

export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const handleLogin = async () => {
      const success = await authStore.login(username.value, password.value);

      if (success) {
        // Redirigir a la página principal
        router.push('/');
      } else {
        errorMessage.value = 'Usuario o contraseña incorrectos';
      }
    };

    return {
      username,
      password,
      handleLogin,
      errorMessage
    };
  }
});
</script>
