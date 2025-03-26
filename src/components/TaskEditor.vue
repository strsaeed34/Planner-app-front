<template>
  <div class="task-modal">
    <div class="task-container">
      <!-- Title Input -->
      <input
        type="text"
        v-model="editableTask.title"
        placeholder="Task Title"
        @keydown.enter="saveTask"
        class="task-input"
      />

      <!-- Description -->
      <textarea
        v-model="editableTask.description"
        placeholder="Task Description"
        class="task-textarea"        
      ></textarea>

      <!-- Goal Selection -->
      <div class="row">
        <label for="goal">Select Goal:</label>
        <select v-model="editableTask.goal_id" id="goal" class="task-select">
          <option v-for="goal in props.goals" :key="goal.id" :value="goal.id">
            {{ goal.name }}
          </option>
        </select>
      </div>

      <!-- Priority Selection -->
      <div class="row">
        <label for="priority">Priority:</label>
        <select v-model="editableTask.priority" id="priority" class="task-select">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <!-- Repeat Task Toggle -->
      <div class="row">
        <label for="repeat">Repeat Task:</label>
        <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
               v-model="editableTask.is_recursive"
       
              role="switch"
              id="flexSwitchCheck"
            />
          </div>
      </div>
    

      <!-- Date & Time Selection -->
      <div class="row">
        <label for="start">Start Time:</label>
        <input type="time" v-model="editableTask.start_time" id="start" class="task-input" />
      </div>
      <div class="row">
        <label for="end">End Time:</label>
        <input type="time" v-model="editableTask.end_time" id="end" class="task-input" />
      </div>

      <!-- Save/Add Task Button -->
      <button @click="updateTask" :disabled="!editableTask.title.trim()" class="task-btn">
        {{ isEditing ? 'Save Task' : 'Add Task' }}
      </button>
      <button @click="closeModal" class="close-btn">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";

const props = defineProps({
  goals: Array,
  task: Object, // Add a task prop for editing
});

const emit = defineEmits(["closeModal", "addTask", "updateTask"]);

const editableTask = ref({
  id:null,
  title: "",
  description: "",
  goal_id: null,
  priority: "medium",
  is_recursive: false,
  start_time: null,
  end_time: null,
});

// Check if we're editing an existing task
const isEditing = computed(() => !!props.task);

// Watch for changes in the task prop and populate the form
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      editableTask.value = {
        ...newTask,
        is_recursive: !!newTask.is_recursive, // Convert to boolean
      };
    } else {
      editableTask.value = {
        id: null,
        title: "",
        description: "",
        goal_id: null,
        priority: "medium",
        is_recursive: false, // Default to boolean
        start_time: null,
        end_time: null,
      };
    }
  },
  { immediate: true }
);

const updateTask = () => {
  if (!editableTask.value.title.trim()) return;

  if (isEditing.value) {
    // Emit a saveTask event if editing
    emit('updateTask', editableTask.value);
  } else {
    // Emit an addTask event if adding a new task
    emit("addTask", editableTask.value);
  }

  // Reset the form after saving/adding
  editableTask.value = {
    title: "",
    description: "",
    goal_id: null,
    priority: "medium",
    is_recursive: false,
    start_time: null,
    end_time: null,
  };

  // Close the modal
  closeModal();
};
onMounted(()=>{
  console.log(editableTask)
})
const closeModal = () => {
  
  emit("closeModal");
};
</script>


<style scoped>
.task-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.task-container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 350px;
}

.task-input,
.task-textarea,
.task-select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.task-btn {
  background: #007bff;
  color: white;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.close-btn {
  background: #ccc;
  color: black;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  margin-top: 5px;
  cursor: pointer;
}

.task-switch {
  transform: scale(1.2);
}
</style>
