<template>
    <div class="max-w-4xl mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Lista de contactos</h1>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded mb-4">Cerrar sesión</button>

      <router-link to="/add" class="text-blue-500 mb-4 inline-block">Añadir contacto</router-link>
      <div v-if="loading" class="text-center">Cargando contactos...</div>
      <ul v-else class="border border-gray-200 rounded-md">
        <li v-for="contact in contacts" :key="contact.id" class="flex justify-between items-center p-4 border-b border-gray-200">
          <span>{{ contact.nombre }} - {{ contact.email }} - {{ contact.telefono }}</span>
          <div>
            <router-link :to="`/edit/${contact.id}`" class="text-blue-500 mr-2">Editar</router-link>
            <button @click="deleteContact(contact.id)" class="text-red-500">Eliminar</button>
          </div>
        </li>
      </ul>
    </div>
  </template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useContactStore } from '../store/contacts';
import router from '../router';
export default defineComponent({

    setup() {
        const contactStore = useContactStore();
        const loading = ref(true);  // Estado de carga


        onMounted(async () => {
            await contactStore.loadContacts().then(()=>{
                loading.value = false; // Termina el estado de carga


            });

        });

        const deleteContact = (id: number) => {
            if (confirm('¿Estás seguro de que deseas eliminar este contacto?')) {
                contactStore.deleteContact(id);
            }
        };
        const logout = () => {
      // Eliminar el estado de autenticación
      localStorage.removeItem('authenticated');
      router.push('/login');
    };

        return {
            contacts: contactStore.contacts,
            deleteContact,
            loading,
            logout
        };
    },
});
</script>