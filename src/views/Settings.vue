<script setup>
import { ref, computed } from "vue";
// import { VueDraggableNext } from "vue-draggable-next";

// Sample tasks list
const tasks = ref([
  { id: 1, title: "Task A", startTime: null },
  { id: 2, title: "Task B", startTime: null },
]);

// Timeline slots (9 AM - 12 PM)
const timeline = ref([
  { time: "09:00", task: null },
  { time: "10:00", task: null },
  { time: "11:00", task: null },
  { time: "12:00", task: null },
]);

// Handles dropping a task into a time slot
const onDrop = (event, slot) => {
  const taskId = event.dataTransfer.getData("taskId");
  const task = tasks.value.find((t) => t.id == taskId);

  if (!task) return;

  // Check if slot is free
  if (slot.task) {
    // Find next free slot
    const nextSlot = timeline.value.find((s) => !s.task);
    if (nextSlot) {
      nextSlot.task = task;
      task.startTime = nextSlot.time;
      alert(`Slot taken! Moving task to ${nextSlot.time}`);
    } else {
      alert("No free slots available!");
    }
  } else {
    // Assign task to this slot
    slot.task = task;
    task.startTime = slot.time;
  }
};

// Handles drag start event
const onDragStart = (event, task) => {
  event.dataTransfer.setData("taskId", task.id);
};
</script>

<template>
  <div class="container mt-4">
    <!-- Task List -->
    <div class="task-list">
      <h5>Tasks</h5>
      <div v-for="task in tasks" :key="task.id" class="task-item" draggable="true"
        @dragstart="onDragStart($event, task)">
        {{ task.title }}  {{ task.startTime }}
      </div>
    </div>

    <!-- Timeline -->
    <div class="timeline mt-3">
      <h5>Timeline</h5>
      <div class="time-slot" v-for="slot in timeline" :key="slot.time" @dragover.prevent
        @drop="onDrop($event, slot)">
        {{ slot.time }} - {{ slot.task ? slot.task.title : "Empty" }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  background: lightblue;
  padding: 8px;
  margin: 5px;
  cursor: grab;
  border-radius: 4px;
}

.time-slot {
  background: #f8f9fa;
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px 0;
}
</style>
