<template>
  <div
    :class="minimalstyle"
    :style="{ '--after-bg-color': priorityColor }"
    @dragstart="onDragStart($event, task)"
    draggable="true"
  >
    <!-- Task Details -->
    <div class="task-details">
      <span class="task-title">{{ task.title }}</span>
      <div class="props">
        <!-- Status Icon -->
        <i :class="statusIcon" :style="{ color: statusColor }"></i>

        <!-- Recursive Icon -->

        <i class="bi bi-repeat" :class="isRecursive"></i>
      </div>
      <div class="task-time" v-if="!props.is_minimal">
        
        {{ formatTime(task.start_time) }}
        <span v-if="task.end_time">-</span>
        {{ formatTime(task.end_time) }}
        <!-- {{task.end_time}} -->
      </div>
    </div>

    <button
      class="add-btn"
      @click="addTaskToTimebox(task.id)"
      v-if="!props.is_minimal"
    >
      <i class="bi bi-plus-lg"></i>
    </button>

    <div class="task-complete" v-if="props.is_minimal">
      <input
        type="checkbox"
        :checked="task.status === 'completed'"
        @change="completeTask(task)"
      />
      <div class="" v-if="props.is_minimal" @click="removeTask(task.id)">
        <i class="bi bi-x remove-task"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";

const props = defineProps({
  task: {
    type: Object,
    required: true, // or false, depending on your use case
  },
  is_minimal: {
    type: Boolean,
    default: false,
  },
});

const minimalstyle = computed(() => {
  return props.is_minimal ? "minimal-task" : "task";
});
const statusIcon = computed(() => {
  switch (props.task.status) {
    case "completed":
      return "bi bi-check-circle-fill";
    case "pending":
      return "bi bi-clock-history";
    case "in_progress":
      return "bi bi-segmented-nav";
    case "canceled":
      return "bi bi-x-circle-fill";
    default:
      return "bi bi-question-circle-fill"; // Fallback icon
  }
});

const statusColor = computed(() => {
  switch (props.task.status) {
    case "completed":
      return "#ffff"; // Green
    case "pending":
      return "#fff"; // Yellow
    case "in_progress":
      return "#2196f3"; // Blue
    case "canceled":
      return "#f44336"; // Red
    default:
      return "#666"; // Fallback color
  }
});

const priorities = [
  { value: "low", text: "Low", color: "#636E72" }, // Green
  { value: "medium", text: "Medium", color: "#00B894" }, // Yellow
  { value: "high", text: "High", color: "#FF7675" }, // Red
];

// Handles drag start event
const onDragStart = (event, task) => {
  event.dataTransfer.setData("taskId", task.id);
};

const emit = defineEmits([
  "removeTaskTimeline",
  "addTaskToTimebox",
  "completeTask",
]);

const removeTask = (id) => {
  console.log(id);
  emit("removeTaskTimeline", id);
};

const addTaskToTimebox = (id) => {
  console.log(id);
  emit("addTaskToTimebox", id);
};

const remove = () => {
  emit("remove", props.task);
};

const formatTime = (timeString) => {
  try {
    // If the input is empty or invalid, return an empty string
    if (!timeString || typeof timeString !== "string") {
      return "";
    }

    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(":").map(Number);

    // Validate hours and minutes
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      return "";
    }

    // Convert to 12-hour format
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two digits

    return `${formattedHours}:${formattedMinutes} ${period}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "";
  }
};

const showEditor = (task) => {
  console.log(task);
  emit("showEditor", task);
};

const completeTask = (task) => {
  if (task.status === "canceled") {
    task.status = "pending";
  } else {
    task.status = task.status === "completed" ? "pending" : "completed";
  }

  // Emit an event or call an API to update the task status
  emit("completeTask", task);
  console.log("Task Status Updated:", task.status);
};

onMounted(async () => {
  console.log("onmounter", props.task.priority);
});

const isRecursive = computed(() =>
  props.task.is_recursive ? "is-recursive" : "not-recursive"
);

const priorityindex = computed(() => {
  const index = priorities.findIndex((p) => p.value === props.task.priority);
  console.log("Priority Index:", index); // Debugging
  return index !== -1 ? index : 0; // Fallback to the first priority (e.g., "low")
});

const priorityColor = computed(() => {
  const index = priorities.findIndex((p) => p.value === props.task.priority);
  const color = index !== -1 ? priorities[index].color : priorities[0].color;
  console.log("Computed Color:", color); // Debugging
  return color;
});
</script>

<style scoped>
.minimal-task {
  display: flex;
  position: relative;
  min-width: 70px;
  justify-content: flex-start;
  align-items: flex-start;
  align-items: center;
  margin: 5px 0px;
  padding: 0px 5px;
  background-color: var(--after-bg-color);
  color: #222;
  border-radius: 4px;
  height: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* border: 1px solid #666; */
}
.task {
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: flex-start;
  align-items: center;
  margin: 5px 0;
  padding: 0px 5px;
  background-color: var(--after-bg-color);
  color: #222;
  border-radius: 4px;
  height: 40px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* border: 1px solid #666; */
}
.task:hover {
}
.task-details {
  display: flex;
  padding: 0px;
}

.task-complete {
  display: flex;
  position: absolute;
  gap: 0px;
  right: -45px;
  align-items: center;
}

.task-complete input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.task-status i {
  font-size: 20px; /* Adjust size as needed */
}
.task-description {
  font-size: 14px;
  color: #444;
  line-height: 1.4;
}
.task-title {
  min-width: 144px;
  font-size: 14px;
  color: #fffcfc;
  /* line-height: 1.4; */
}

.remove-task {
  font-size: 26px;
  color: #6c5ce7;
}

.remove-task:hover {
  cursor: pointer;
  color: #5749c4;
}

.dots {
  color: #444;
}
.dots:hover {
  color: #222;
}

.dropdown {
  position: absolute;

  transform: translate(-50%, -50%);
  top: 50%;
}

.props {
  display: flex;
  min-width: 50px;

  align-items: flex-start;
  gap: 10px;
}

.is-recursive {
  color: #ffffff;
}

.not-recursive {
  display: none;
}

.task-time {
  /* min-width: 40px; */
  font-size: 12px;
  color: #ffffff; /* Light gray for subtlety */
  /* Spacing from the description */
}

.task-time i {
  margin-right: 4px; /* Spacing between icon and text */
}

.add-btn {
  font-size: 24px;
  color: #6c5ce7;
}
.add-btn:hover {
  color: #5749c4;
}

.add-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}
</style>


