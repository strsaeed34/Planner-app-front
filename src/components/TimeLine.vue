<template>
  <div class="vertical-timeline">
    <div
      v-for="time in times"
      :key="time"
      class="time-slot"
      :class="{ 'current-time': isCurrentTime(time) }"
    >
      <span class="time-label">{{ time }}</span>
      <div class="task-slot"
       @dragover.prevent
        @drop="onDrop($event, time)"
        :class="['task-slot', { 'occupied-slot': isSlotOccupied(time) }]"
        >
        <p-task
          v-for="task in getTasksForTime(time)"
          :key="task.id"
          :task="task"
          :is_minimal="true"
          @removeTaskTimeline="removeTaskFromTimebox"

          @completeTask="completeTask"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import pTask from "./pTask.vue";

// Time slots
const times = ref([]);
const currentTimeInterval = ref(null);
const taskSlotStyle = {};

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const emit = defineEmits(["taskDrop", "removeTaskFromTimebox","completeTask"]);

const completeTask=(task)=>{
  emit("completeTask", task)
}

const removeTaskFromTimebox = (id) => {
  emit("removeTaskFromTimebox", id);
};



// Get current time in the same format as time slots
const currentFormattedTime = computed(() => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
});

// Check if this time slot should be highlighted as current time
const isCurrentTime = (time) => {
  const current = parseTime(currentFormattedTime.value);
  const slot = parseTime(time);

  // Highlight if it's the same hour (you can adjust this logic)
  return current.hours === slot.hours;
};

// Handles dropping a task into a time slot
const onDrop = (event, slot) => {
  const taskId = event.dataTransfer.getData("taskId");

  // Check if the time slot is already taken
  const isSlotTaken = props.tasks.some((task) => {
    return formatTime(parseTime(task.start_time)) === slot;
  });

  if (isSlotTaken) {
    alert("This time slot is occupied. Choose another time.");
    return;
  }

  emit("taskDrop", taskId, slot);
};

// Generate time slots
const generateTimeSlots = (startTime, endTime) => {
  const times = [];
  let currentTime = parseTime(startTime);
  const end = parseTime(endTime);

  while (
    currentTime.hours < end.hours ||
    (currentTime.hours === end.hours && currentTime.minutes <= end.minutes)
  ) {
    times.push(formatTime(currentTime));
    currentTime = addHour(currentTime);
  }

  return times;
};

// Parse time string into an object
const parseTime = (timeStr) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");
  if (modifier === "PM" && hours !== "12") {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === "AM" && hours === "12") {
    hours = "00";
  }
  return { hours: parseInt(hours, 10), minutes: parseInt(minutes || 0, 10) };
};

// Format time object into a string
const formatTime = (time) => {
  const hours = time.hours % 12 || 12;
  const minutes = time.minutes.toString().padStart(2, "0");
  const ampm = time.hours >= 12 ? "PM" : "AM";
  return `${hours}:${minutes} ${ampm}`;
};

// Add an hour to the time object
const addHour = (time) => {
  let hours = time.hours + 1;
  let minutes = time.minutes;
  if (hours > 23) {
    hours = 0;
  }
  return { hours, minutes };
};

// Get tasks for a specific time slot
const getTasksForTime = (time) => {

  return props.tasks.filter((task) => {
    const taskStartTime = formatTime(parseTime(task.start_time));

    return taskStartTime === time;
  });
};


const isSlotOccupied = (time) => {
  return props.tasks.some(task => 
    formatTime(parseTime(task.start_time)) === time
  );
};
// // Calculate task style (position and height)
// const getTaskStyle = (task) => {
//   const height = calculateDuration(task.start_time, task.end_time) * 40; // 40px per hour
//   return {
//     height: `${height}px`,
//     backgroundColor: getRandomColor(),
//   };
// };

// // Helper function to generate random colors
// const getRandomColor = () => {
//   const colors = ['#FFCC99', '#99CCFF', '#99FF99', '#FF9999', '#CC99FF'];
//   return colors[Math.floor(Math.random() * colors.length)];
// };

// Generate time slots when the component is mounted
onMounted(() => {
  times.value = generateTimeSlots("01:00 AM", "10:00 PM");

  // Update current time every minute
  currentTimeInterval.value = setInterval(() => {
    // This will force recomputation of currentFormattedTime
  }, 60000);
});

// Clear interval when component is unmounted
onUnmounted(() => {
  if (currentTimeInterval.value) {
    clearInterval(currentTimeInterval.value);
  }
});
</script>

<style scoped>
.vertical-timeline {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px;
  --line-bg: #e0e0e0;
  --lh: 20px;
  --py: 10px;
}

.time-slot {
  display: flex;
  align-items: center;
  margin-bottom: 0px;
  position: relative;
  justify-content: flex-start;
  min-height: 45px;
}

.time-label {
  width: 65px;
  margin-right: 10px;
  font-size: 14px;
  color: #333;
  transition: all 0.3s ease;
}

.task-slot {
  min-width: 230px;
  min-height: 45px;
  padding: 2px;
  padding-right: 45px;
}


.occupied-slot{
    background-color: rgba(89, 89, 90, 0.05);
  border-radius: 4px;
}

.time-slot:not(:last-child)::after {
  content: "";
  position: absolute;
  width: 2px;
  border-radius: 1%;
  background: var(--line-bg);
  left: 64px;
  top: calc(var(--lh) / 2 + var(--py) + 10px);
  bottom: -14px;
}

.time-slot::before {
  position: absolute;
  content: "";
  display: block;
  width: 12px;
  height: 12px;
  left: 65px;
  transform: translate(-50%, -50%);
  top: 50%;
  border-radius: 50%;
  background-color: #7f8698;
  transition: all 0.3s ease;
}

/* Current time styles */
.time-slot.current-time .time-label {
  font-weight: bold;
  color: #0066ff;
  font-size: 15px;
}

.time-slot.current-time::before {
  background-color: #0066ff;
  width: 14px;
  height: 14px;
  box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.2);
}

.time-slot.current-time::after {
  background: linear-gradient(to bottom, #0066ff, var(--line-bg));
}

.time-slot.current-time .task-slot {
  background-color: rgba(0, 102, 255, 0.05);
  border-radius: 4px;
}
</style>