<template>
  <div class="notes-section">
    <h1 class="notes-header">Notes</h1>
    <div class="notes" id="notes">
      <div
        class="note"
        v-for="note in notes"
        :key="note.id"
      >
        <div class="note-title" contenteditable="true" @blur="updateNoteTitle(note, $event)">
          {{ note.title }}
        </div>
        <div class="note-content" contenteditable="true" @blur="updateNoteContent(note, $event)">
          {{ note.content }}
        </div>

        <!-- Dropdown menu here -->
        <div class="dropdown" style="position: absolute; top: 5px; right: 2px">
          <button
            class="btn btn-link"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-three-dots-vertical"></i>
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <router-link to="/noteeditor" class="dropdown-item"  
                ><i class="bi bi-clipboard menu-icon"></i>Editor</router-link
              >
            </li>
            <li>
              <a class="dropdown-item" href="#"
                ><i class="bi bi-clipboard-check menu-icon"></i>Copy</a
              >
            </li>
            <li>
              <a class="dropdown-item" @click.prevent="handleDeleteNote(note)" href="#"
                ><i class="bi bi-trash menu-icon"></i>Move To Trash</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#"
                ><i class="bi bi-arrow-counterclockwise menu-icon"></i>Undo</a
              >
            </li>
            <li>
              <a class="dropdown-item" href="#"
                ><i class="bi bi-arrow-clockwise menu-icon"></i>Redo</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Floating Action Button (FAB) -->
    <button class="fab" @click="handleCreateNote">
      <i class="bi bi-plus"></i>
    </button>
  </div>
</template>

<script setup>
import { useNoteStore } from '@/stores/noteStore';
import { ref } from 'vue';
import { onMounted  , watch} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const noteStore = useNoteStore();
const notes=ref([])
notes.value=noteStore.notes
const {  fetchNotes, createNote, updateNote, deleteNote } = noteStore;


// // Fetch notes when the component mounts
onMounted(async () => {
  console.log('onmounter')
  await fetchNotes();
  notes.value=noteStore.notes
});





const updateNoteTitle = (note, event) => {
  updateNote(note.id, { title: event.target.innerText });

};

const updateNoteContent = (note, event) => {
  updateNote(note.id, { content: event.target.innerText });
};

// Rename the function to avoid conflict with the destructured `createNote`
const handleCreateNote = async(note) => {
  await createNote({ title: 'New Note', content: 'Write something here...' });
  
  
      await fetchNotes();
      notes.value=noteStore.notes
 
};

const handleDeleteNote=async (note)=>{
    try{
      
    await deleteNote(note.id)     
    await fetchNotes();
    notes.value=noteStore.notes
    } catch(error){
        console.log(error)
    }
    
    
    
}
</script>

<style scoped>
.notes-section {
  margin: 20px;
  padding: 10px;
}

.notes-header {
  font-size: 24px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
}

.notes {
  column-count: 2;
  column-gap: 10px;
  padding: 15px;
}

.note {
  position: relative;
  background-color: #fffae6;
  padding: 10px;
  border-radius: 10px;
  /* box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); */
  border: 1px solid #bbb;
  cursor: grab;
  user-select: none;
  transition: transform 0.2s ease-in-out;
  top: 5px;
  margin: 0 0 15px;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
}

.note:active {
  cursor: grabbing;
}

.note:hover {
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
}

.note-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #665c1e;
}

.note-content {
  font-size: 14px;
  color: #6b6b6b;
  line-height: 1.4;
}

/* Floating Action Button (FAB) */
.fab {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #2c3e50;
  color: white;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.fab:hover {
  background-color: #34495e;
}
</style> 