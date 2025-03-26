<template>
  <div class="task" :style="{ '--after-bg-color': priorityColor }">
    <div class="task-complete">
      <input
        type="checkbox"
        :checked="task.status === 'completed'"
        @change="completeTask(task)"
      />
    </div>

    <!-- Task Details -->
    <div class="task-details">
      <div class="task-title">{{ task.title }}</div>

      <div class="props">
        <!-- Status Icon -->
        <i :class="statusIcon" :style="{ color: statusColor }"></i>

        <!-- Recursive Icon -->

        <i class="bi bi-repeat pros" :class="isRecursive"></i>
        <div class="task-time">
          {{ formatTime(task.start_time) }} 
          <span v-if="task.end_time">-</span>
          {{ formatTime(task.end_time) }}
          <!-- {{task.end_time}} -->
        </div>
      </div>
    </div>

    <!-- Edit Icon -->
    <div class="editOption" @click="showEditor(task)">
      <i class="bi bi-pencil-square"></i>
    </div>

    <!-- Dropdown Menu -->
    <div class="dropdown">
      <button
        class="btn btn-link"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="dots bi bi-three-dots-vertical"></i>
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a class="dropdown-item" href="#"
            ><i class="bi bi-clipboard-check menu-icon"></i> Copy</a
          >
        </li>
        <li>
          <a class="dropdown-item" @click.prevent="cancelTask(task)" href="#"
            ><i class="bi bi-x-circle-fill menu-icon"></i> cancel</a
          >
        </li>
        <li>
          <a class="dropdown-item" @click.prevent="remove" href="#"
            >Move To <i class="bi bi-trash menu-icon"></i
          ></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";

const props = defineProps({
  task: Object,
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
      return "#4caf50"; // Green
    case "pending":
      return "#f5a022"; // Yellow
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

const emit = defineEmits(["remove", "showEditor", "completeTask"]);
const remove = () => {
  emit("remove", props.task);
};

const formatDate = (dateTime) => {
  try {
    const date = new Date(dateTime ?? "");
    if (isNaN(date.getTime())) {
      return "";
    }
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "AM" : "PM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure two digits
    return `${formattedHours}:${formattedMinutes} ${period}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "";
  }
};

const formatTime = (timeString) => {
  try {
    // If the input is empty or invalid, return an empty string
    if (!timeString || typeof timeString !== 'string') {
      return "";
    }

    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(':').map(Number);

    // Validate hours and minutes
    if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
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

const cancelTask = (task) => {
  task.status = "canceled";
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
.task {
  display: flex;
  position: relative;
  margin: 10px 0;
  padding: 5px 15px;
  background-color: rgb(248, 249, 250);
  color: #222;
  border-radius: 10px;
  height: 57px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* border: 1px solid #666; */
}
.task:hover {
}

.task-complete {
  display: flex;
  align-items: center;
  margin-right: 10px;
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
  font-size: 16px;
  color: #444;
  line-height: 1.4;
}
.dots {
  color: #444;
}
.dots:hover {
  color: #222;
}

.dropdown {
  position: absolute;
  top: 9px;
  right: -114px;
}

.props {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.status {
  /* position: absolute;
  transform: translate(-50%, -50%); /* Centers without pushing it down 
  top: 50%;
  right: 80px; */
}
.editOption {
  position: absolute;
  transform: translate(-50%, -50%); /* Centers without pushing it down */
  top: 50%;
  right: 25px;
  cursor: pointer;
  color: #444;
}
.editOption:hover {
  color: #222;
}

.task::before {
  display: inline-block;

  height: 100%;
  border-top-left-radius: 10px; /* Round top-left corner */
  border-bottom-left-radius: 10px; /* Round bottom-left corner */
  border-top-right-radius: 0; /* Keep top-right sharp */
  border-bottom-right-radius: 0; /* Keep bottom-right sharp */
  content: ""; /* Required for pseudo-elements */
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%); /* Centers vertically */
  width: 8px; /* Small div width */

  /* background-color: red; */
  /* Change to your preferred color */
  background-color: var(--after-bg-color); /* Use the CSS variable */
}

.is-recursive {
  color: #444;
}

.not-recursive {
  display: none;
}

.task-time {
  font-size: 12px;
  color: #4caf50; /* Light gray for subtlety */
  margin-top: 4px; /* Spacing from the description */
}

.task-time i {
  margin-right: 4px; /* Spacing between icon and text */
}
</style>


