
<template>
  <div class="color-dropdown" ref="dropdownRef">
    <!-- Dropdown toggle button -->
    <div class="dropdown-toggle" @click="toggleDropdown" >
      <div
        class="selected-color"
        :style="{ backgroundColor: selectedColor }"
      ></div>
    </div>

    <!-- Dropdown menu  v-if="isOpen" -->
    <div v-if="isOpen" class="dropdown-menu">
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="color-option"
        :style="{ backgroundColor: color }"
        @click="selectColor(color)"
      ></div>
    </div>
  </div>
</template>

<script setup >
import { ref, onMounted, onUnmounted } from "vue";

const colors = [
  "#6C5CE7",
  "#00B894",
  "#FF7675",
  "#74B9FF",
  "#FDCB6E",
  "#A29BFE",
  "#55EFC4",
  "#FFEAA7",
  "#D63031",
  "#636E72",
];

const props = defineProps({
  defaultColor: String, // Accept the default color as a prop
});
const selectedColor = ref(props.defaultColor || colors[0]); // Default selected color
const isOpen = ref(false); // Dropdown open/close state
const dropdownRef = ref(null);

// Toggle dropdown visibility
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const emit = defineEmits(["color-selected"]);
// Select a color
const selectColor = (color) => {
  selectedColor.value = color;
  emit("color-selected", color);
  isOpen.value = false; // Close dropdown after selection
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>


<style scoped>
.color-dropdown {
  position: relative;
  /* width: 50px; */
}

.dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 7px 2px;

  border-radius: 8px;
  cursor: pointer;
  background-color: transparent;
  width: 38px;
}
.dropdown-toggle:hover {
  color: e0e0e0;
}

.selected-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.arrow {
  font-size: 12px;
  color: #333;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: -100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  padding: 8px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 4px;
}

.color-option {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.color-option:hover {
  transform: scale(1.1);
}
</style>