<template>
    <div class="max-w-md mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Añadir Contacto</h1>
        <form @submit.prevent="addContact" class="bg-white shadow-md rounded px-8 py-6">
            <input v-model="contact.nombre" placeholder="Nombre" required class="border border-gray-300 p-2 mb-4 w-full rounded" />
            <input v-model="contact.email" placeholder="Email" required class="border border-gray-300 p-2 mb-4 w-full rounded" />
            <input v-model="contact.telefono" placeholder="Teléfono" required class="border border-gray-300 p-2 mb-4 w-full rounded" />
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Añadir Contacto</button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useContactStore } from '../store/contacts';
import router from '../router';

export default defineComponent({
    setup() {
        const contactStore = useContactStore();
        const contact = ref({ nombre: '', email: '', telefono: '' });
        const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
        const isPhoneValid = (phone: string) => phone.length >= 10 && /^\d+$/.test(phone);


        const addContact = () => {
            if (!isEmailValid(contact.value.email)) {
                alert('Por favor, introduce un email válido.');
                return;
            }
            if (!isPhoneValid(contact.value.telefono)) {
                alert('El teléfono debe ser numérico y tener al menos 10 dígitos.');
                return;
            }
            contactStore.addContact(contact.value);
            contact.value = { nombre: '', email: '', telefono: '' }; // Reset form
            router.push('/');
        };

        return { contact, addContact };
    },
});
</script>