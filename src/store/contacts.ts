import { defineStore } from 'pinia';
import { ref } from 'vue';

interface Contact {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
}

export const useContactStore = defineStore('contacts', () => {
  const contacts = ref<Contact[]>([]); // Tipo explícito

  const loadContacts = async () => {
    const response = await fetch('/contacts.json');
    contacts.value = await response.json();
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    contacts.value.push({ id: contacts.value.length + 1, ...contact });
  };

  const editContact = (id: number, updatedContact: Partial<Contact>) => {
    const index = contacts.value.findIndex(contact => contact.id === id);
    if (index !== -1) {
      contacts.value[index] = { ...contacts.value[index], ...updatedContact };
    }
  };

  const deleteContact = (id: number) => {
    contacts.value = contacts.value.filter(contact => contact.id !== id);
  };

  return { contacts, loadContacts, addContact, editContact, deleteContact };
});
