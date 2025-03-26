<template>
  <div class="priority-switch">
    <div class="toggle-track" @click="cyclePriority">
      <div
        class="toggle-thumb"
        :style="{
          transform: `translateX(${priorityIndex * 100}%)`,
          borderColor: priorities[priorityIndex].color,
        }"
      ></div>
      <span
        v-for="(level, index) in priorities"
        :key="index"
        class="toggle-label"
        :style="{
          color: level.color,
          fontWeight: modelValue === level.value ? 'bold' : 'normal',
        }"
      >
        {{ level.text }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const priorities = [
  { value: "low", text: "Low", color: "#636E72" }, // Green
  { value: "medium", text: "Medium", color: "#00B894" }, // Yellow
  { value: "high", text: "High", color: "#FF7675" }, // Red
];

const priorityIndex = computed(() =>
  priorities.findIndex((p) => p.value === props.modelValue)
);

const cyclePriority = () => {
  const newPriority =
    priorities[(priorityIndex.value + 1) % priorities.length].value;
  emit("update:modelValue", newPriority); // Emit the new priority value
};
</script>

<style scoped>
.priority-switch {
  display: flex;
  align-items: center;
  padding: 1px;
}

.toggle-track {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 147px;
  height: 29px;
  background: #fff;
  border-radius: 8px;
  cursor: pointer;
  padding: 4px;
  transition: 0.3s ease-in-out;
}

.toggle-thumb {
  position: absolute;
  top: 1px;
  left: 2px;
  width: 48px;
  height: 24px;
  border-radius: 8px;
  transition: transform 0.3s ease-in-out;
  background-color: #e0e0e0; /* Light gray on hover */
  display: inline-block;
}

.toggle-label {
  flex: 1;
  text-align: center;
  font-size: 12px;
  margin: 5px 0;
  color: #333;
  user-select: none;
  z-index: 1;
}
</style>