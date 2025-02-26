


import { defineStore } from 'pinia';
import { useBaseStore } from './baseStore';

export const useNoteStore = defineStore('note', {
  state: () => ({
    notes: [], // Store notes locally
  }),
  actions: {
    

    async fetchNotes() {
      const baseStore = useBaseStore(); 
      try {
        this.notes = await baseStore.get('/notes'); // Fetch notes from the backend
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      }
    },

    async createNote(note) {
      const baseStore = useBaseStore(); 
      try {
        const newNote = await baseStore.post('/notes', note); // Create a new note
        this.notes.push(newNote); // Add the new note to the local state
        this.fetchNotes()
      } catch (error) {
        console.error('Failed to create note:', error);
      }
    },

    async updateNote(id, updatedNote) {
      const baseStore = useBaseStore(); 
      try {
        const note = await baseStore.put(`/notes/${id}`, updatedNote); // Update the note
        const index = this.notes.findIndex((n) => n.id === id);
        if (index !== -1) {
          this.notes[index] = note; // Update the note in the local state
        }
      } catch (error) {
        console.error('Failed to update note:', error);
      }
    },

    async deleteNote(id) {
      const baseStore = useBaseStore(); 
      try {
        await baseStore.delete(`/notes/${id}`); // Delete the note
        //this.notes = this.notes.filter((note) => note.id !== id); // Remove the note from the local state
        this.fetchNotes()
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    },
  },
});

