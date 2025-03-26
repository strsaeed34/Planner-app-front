<template>
  <div class="dropdown" ref="dropdownRef">
    <!-- Dropdown Button -->
    <button @click="toggleDropdown" class="dropdown-button">
      {{ selectedGoal || "#Goal" }}
      <span class="arrow" :class="{ rotated: isOpen }">▼</span>
    </button>

    <!-- Dropdown List -->
    <transition name="slide-fade">
      <ul v-if="isOpen" class="dropdown-list">
        <li
          v-for="goal in goals"
          :key="goal.id"
          @click="selectGoal(goal)"
          class="dropdown-item"
        >
          {{ goal.name }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { useTaskStore } from "@/stores/taskStore";
import { ref, onMounted, onUnmounted } from "vue";

const taskStore=useTaskStore();

const props = defineProps({
  goals: Array, // List of goals
 
});



const emit = defineEmits(["goal-selected"]);

const isOpen = ref(false); // Track dropdown visibility
const selectedGoal = ref(null); // Track selected goal
const dropdownRef = ref(null);


// Toggle dropdown visibility
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Select a goal and emit the selected goal
const selectGoal = (goal) => {
  selectedGoal.value = goal.name;
  taskStore.selectedGoal=goal.id
  console.log('selected goal id',taskStore.selectedGoal )
  isOpen.value = false; // Close the dropdown
  emit("goal-selected", goal); // Emit the selected goal
};


// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
   selectedGoal.value = null;
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style>
/* Dropdown Container */
.dropdown {
  position: relative;
  display: inline-block;
  min-width: 150px; /* Set a fixed width for the dropdown */
}

/* Dropdown Button */
.dropdown-button {
   min-width: 100px;
  padding: 5px 8px;
  background-color: #fff;
  color:  #222;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
   /* border: 1px solid #e0e0e0; */
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.dropdown-button:hover {
  background-color: #e0e0e0; /* Darker shade on hover */
}

/* Arrow Icon */
.dropdown-button .arrow {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.dropdown-button .arrow.rotated {
  transform: rotate(180deg); /* Rotate arrow when dropdown is open */
}

/* Dropdown List */
.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  list-style: none;
  padding: 8px 0;
  margin: 8px 0 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px; /* Limit height and add scroll if needed */
  overflow-y: auto;
}

/* Dropdown List Items */
.dropdown-item {
  padding: 10px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.3s ease;
  
}

.dropdown-item:hover {
  background-color: #f5f5f5; /* Light gray on hover */
}

/* Slide-fade Animation */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>