<template>
  <div class="task-container">
    <div class="task-header">
      <input
        v-model="newTask.title"
        type="text"
        placeholder="What’s your task?"
        @keydown.enter="addTask"
        class="task-input"
      />
      <button class="add-btn" @click="addTask">
        <i class="bi bi-plus-lg"></i>
      </button>
      <button class="close-btn" @click="$emit('toggleAddShow')">
        <i class="bi bi-x"></i>
      </button>
    </div>
    <div class="caption">
      {{ showAdvanced ? "Hide Options" : "Show Options" }}
    </div>
    <div class="wrapper">
      <div class="separator"></div>
      <button @click="toggleAdvanced" class="toggle-btn">
        <span :class="{ rotate: showAdvanced }">▼</span>
      </button>
    </div>
    <transition name="fade-slide">
      <div v-if="showAdvanced" class="advanced-section">
        <div class="task-details">
          <div class="dropdown">
            <span>Goal:</span>

            <Goals
              :goals="goals"
              v-model="newTask.goal_id"
              class="dropdown-input"
            />
          </div>

          <div class="dropdown">
            <span>Priority:</span>

            <priority v-model="newTask.priority" class="dropdown-input" />
          </div>
        </div>

        <div class="task-datetime">
          <div class="Start">
            <label class="label">Start:</label>
            <input
              type="time"
              v-model="newTask.start_time"
              class="time-input"
            />
          </div>
          <div class="end">
            <label class="label">End:</label>
            <input
              type="time"
              v-model="newTask.end_time"
              class="time-input"
            />
          </div>
        </div>

        <div class="repeat-daily">
          <span>Repeat Daily:</span>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="newTask.is_recursive"
              :checked="newTask.is_recursive"
              role="switch"
              id="flexSwitchCheckDefault"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Goals from "./GoalsDropdown.vue";
import priority from "./Priority.vue";
import { useTaskStore } from "@/stores/taskStore";

const taskStore = useTaskStore();
const showAdvanced =ref(false)
const newTask = ref({
  title: "",
description:"Write Something ...",
  goal_id: null,
  priority: "medium",
  is_recursive: false,
  start_time: null, //new Date().toISOString().slice(0, 16),
  end_time: null, //new Date().toISOString().slice(0, 16),
});

const props = defineProps({
  goals: Array,
});

const emit = defineEmits(["addTask"]);
const addTask = () => {
  if (!newTask.value.title.trim()) return;
  newTask.value.goal_id = taskStore.selectedGoal;
  emit("addTask", newTask);
};

const toggleAdvanced = () => {
  showAdvanced.value = !showAdvanced.value;
  console.log(showAdvanced)
};
</script>

<style scoped>
.task-container {
  background: white;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.task-input {
  flex-grow: 1;
  padding: 8px;
  border: none;
  font-size: 14px;
  border-radius: 8px;
  background: #f5f5f5;
}

.add-btn,
.close-btn {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.add-btn {
  font-size: 24px;
  color: #6c5ce7;
}
.add-btn:hover {
  color: #5749c4;
}

.close-btn {
  font-size: 24px;
  color: gray;
}
.close-btn:hover {
  color: rgb(73, 73, 73);
}

.task-details {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 5px;
}

.dropdown {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dropdown-input {
  margin-left: 10px;
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.task-datetime {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.time-input {
  /* flex-grow: 1; */
  padding: 6px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.repeat-daily {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
}
.label {
  min-width: 50px;
}

.caption {
  font-size: 16px;
  font-weight: bold;

  color: #333;
}
.wrapper {
  position: relative;
  overflow: hidden; /* Prevents any extra scroll */
  height: 50px;
}
.separator {
  left: 50%;
  transform: translate(-50%, -50%); /* Centers without pushing it down */
  top: 50%;
  position: relative;
  width: 100%;
  height: 2px;
  background: #ccc;
}

.toggle-btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%); /* Centers without pushing it down */
  top: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  box-sizing: border-box; /* Ensures proper sizing */
}

.toggle-btn:hover {
  background: rgb(73, 73, 73);
}

.toggle-btn span {
  font-size: 18px;
  color: white;
  transition: transform 0.3s ease;
}

.rotate {
  transform: rotate(180deg);
}

.advanced-section {

 
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>