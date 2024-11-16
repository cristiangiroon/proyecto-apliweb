<template>
    <div class="max-w-md mx-auto p-4">
        <h1 class="text-2xl font-bold mb-4">Editar Contacto</h1>
        <form @submit.prevent="editContact" class="bg-white shadow-md rounded px-8 py-6">
            <input v-model="contact.nombre" placeholder="Name" required
                class="border border-gray-300 p-2 mb-4 w-full rounded" />
            <input v-model="contact.email" placeholder="Email" required
                class="border border-gray-300 p-2 mb-4 w-full rounded" />
            <input v-model="contact.telefono" placeholder="Phone" required
                class="border border-gray-300 p-2 mb-4 w-full rounded" />
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Guardar Cambios</button>
            <button @click="$router.push('/')" class="bg-gray-500 text-white px-4 py-2 rounded ml-2">
                Cancelar
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useContactStore } from '../store/contacts';

export default defineComponent({
    setup() {
        const contactStore = useContactStore();
        const route = useRoute();
        const router = useRouter();
        const contact = ref({ nombre: '', email: '', telefono: '' });

        onMounted(() => {
            const id = parseInt(route.params.id as string);
            const existingContact = contactStore.contacts.find(c => c.id === id);
            if (existingContact) {
                contact.value = { ...existingContact };
            }
        });

        const isEmailValid = (email: string) => /\S+@\S+\.\S+/.test(email);
        const isPhoneValid = (phone: string) => phone.length >= 10 && /^\d+$/.test(phone);

        const editContact = () => {
            if (!isEmailValid(contact.value.email)) {
                alert('Por favor, introduce un email válido.');
                return;
            }
            if (!isPhoneValid(contact.value.telefono)) {
                alert('El teléfono debe ser numérico y tener al menos 10 dígitos.');
                return;
            }
            const id = parseInt(route.params.id as string);
            contactStore.editContact(id, contact.value);
            router.push('/');
        };


        return { contact, editContact };
    },
});
</script>