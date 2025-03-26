

<template>
  <div class="container-fluid">
    <div class="row m-1">
      <!-- Timeline Section -->
      <!-- <Calender /> -->
       <div v-if="typeof errors === 'string'" class="alert alert-danger m-2">
              {{ errors }}
            </div>
      <div class="date">
        <span class="timeline-date">{{ formattedDate }} </span>
        <!-- <br /> -->
        <!-- <span>timebox :{{ timebox.timebox.date }} </span> -->
        <input
          type="date"
          v-model="selectedDate"
          class="date-input"
          @input="updateFormattedDate"
          @change="updateTimebox"
        />
      </div>
      <div class="col-sm mycard col-12 m-1">
        <h1 class="timeline-header">Timeline</h1>

        <Timeslots
          :tasks="timebox.timebox.tasks"
          @taskDrop="handleAddTaskToTimebox"
          @removeTaskFromTimebox="handleRemoveTaskFromTimebox"
          @completeTask="handleUpdateTask"
        />
      </div>
      <div class="col-md mycard m-1">
        <div class="top">
          <h1 class="header m-1">Top Priorities</h1>
        </div>
        <div class="tasks">
          <h1 class="header m-1">Task list (Brain dump)</h1>
          <!-- Filter input -->
          <input
            type="text"
           class="filter-input with-icon" 
            v-model="filterText"
            @input="filterTasks"
            placeholder="Filter tasks by title"
          />

          <div class="task-list">
            <task
              v-for="task in allTasks"
              :task="task"
              :key="task.id"
              @addTaskToTimebox="handleAddTaskToTimebox"
              :is_minimal="false"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePlannerStore } from "@/stores/plannerStore";
import { computed, onMounted } from "vue";
import { ref } from "vue";
import Task from "../components/pTask.vue";
import Timeslots from "@/components/TimeLine.vue";
import { useTaskStore } from "@/stores/taskStore";
import { storeToRefs } from "pinia";

const taskStore = useTaskStore();
const { fetchTasks, createTask, deleteTask, updateTask } = taskStore;

const filterText = ref();
const timeBoxList = ref([]);
const timebox = ref({
  timebox: {
    date: null,
    tasks: [],
  },
});

const allTasks = ref([]);
const filteredTasks = ref([]);

const selectedDate = ref(new Date().toISOString().split("T")[0]);
const plannerStore = usePlannerStore();
const {
  fetchTimeBoxes,
  createTimeBox,
  getTimeBox,
  addTaskToTimebox,
  removeTaskTimebox,
} = plannerStore;
const { errors } = storeToRefs(plannerStore); // 🔥 Get errors from store
const formattedDate = ref("");


const newTimeBox = ref({
  date: selectedDate.value, // Use the selected date instead of a hardcoded value
});

onMounted(async () => {
  await updateTimebox();
  console.log("mount", selectedDate);
  //Fetch all Tasks
  await fetchTasks();
  allTasks.value = taskStore.tasks;
  errors.value= {};
});

const updateFormattedDate = () => {
  const date = new Date(selectedDate.value);
  formattedDate.value = date.toLocaleDateString("en-US", {
    weekday: "long", // Full day of the week (e.g., Thursday)
    year: "numeric", // Full year (e.g., 2023)
    month: "long", // Full month name (e.g., October)
    day: "numeric", // Day of the month (e.g., 5)
  });
};

const handleAddTaskToTimebox = async (id) => {
   errors.value = null;
  console.log(id);
  console.log(timebox.value.timebox);
  const task_id = { task_id: id };
  console.log(task_id);
  try {
    const result = await addTaskToTimebox(task_id, timebox.value.timebox.id);
    console.log(result);
    console.log(errors)
    if (result) {
      // Fetch the created timebox
      await getTimeBox(timebox.value.timebox.id);

      // Update the reactive variable
      timebox.value = plannerStore.timeBox;
    }
  } catch (error) {
    console.log(errors.value)
    console.log("faild to assign task", error);
  }
};

const handleRemoveTaskFromTimebox = async (id) => {
     errors.value = null;
  console.log(id);
  console.log(timebox.value.timebox);

  try {
    const result = await plannerStore.removeTaskTimebox(id, timebox.value.timebox.id);
    console.log(result);
    if (result) {
      // Fetch the created timebox
      await getTimeBox(timebox.value.timebox.id);

      // Update the reactive variable
      timebox.value = plannerStore.timeBox;
    }
  } catch (error) {
        console.log(errors.value)
    console.log("faild to remove task", error);
  }
};

const updateTimebox = async () => {
  try {
    // Ensure selectedDate is in the correct format (YYYY-MM-DD)
    //  const formattedDate = new Date(selectedDate.value).toISOString().split('T')[0];
    updateFormattedDate();
    newTimeBox.value.date = selectedDate.value; // Update newTimeBox with the selected date

    // Log the payload being sent to the API
    console.log("Sending to API:", newTimeBox.value);

    // Call createTimeBox from the store
    const result = await createTimeBox(newTimeBox.value);
    console.log("Create Result:", result);

    // Check if the result is valid and has an ID
    if (result && result.id) {
      // Fetch the created timebox
      await getTimeBox(result.id);

      // Update the reactive variable
      timebox.value = plannerStore.timeBox;
      console.log("Updated Timebox:", timebox.value);

      // Optionally, refresh the timebox list
      await fetchTimeBoxes();
      timeBoxList.value = plannerStore.timeBoxList;
      // console.log("Updated Timebox List:", timeBoxList.value);
    } else {
      console.error("Failed to create timebox or missing ID");
    }
  } catch (error) {
    console.error("Error in updateTimebox:", error);
  }
};

// Method to filter tasks based on the input text
const filterTasks = () => {

  console.log(allTasks);
  if (!filterText.value) {
    // If the filter text is empty, show all tasks
    allTasks.value = taskStore.tasks;
  } else {
    // Filter tasks based on the input text
    allTasks.value = allTasks.value.filter((task) =>
      task.title.toLowerCase().includes(filterText.value.toLowerCase())
    );
  }
};


const handleUpdateTask = async (updatedTask) => {
   console.log("Updated Task:", updatedTask);
  await updateTask(updatedTask); 

  
  await updateTimebox();
 
  //Fetch all Tasks
  await fetchTasks();
  allTasks.value = taskStore.tasks;


}

</script>

<style scoped>
.container {
  margin-bottom: 300px;
  overflow-x: hidden;
}
.header {
  font-size: 20px;
  font-weight: bold;
  color: #444;
}
.mycard {
  border: 2px dashed #ccc;
  border-radius: 8px;
  background-color: #fff;
}

/* Timeline Styling */

.timeline-container {
  margin: 20px;
}

.timeline-header {
  font-size: 24px;
  font-weight: bold;
  color: #444;
  margin-bottom: 15px;
}

/* .date-input {
  flex-grow: 1;
  padding: 6px;

  border: none;
  outline: none;

  width: 36px;
  height: 20px;

}

.date-input:hover{
    color: #0066ff;
} */

.date-input {
  /* General input styling */



 
   border: none;
  outline: none;

  width: 25px;
  height: 20px;
}

/* Style the calendar icon */
.date-input::-webkit-calendar-picker-indicator {
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  opacity: 0.8;
  transition: all 0.2s;
}

/* Hover effect */
.date-input::-webkit-calendar-picker-indicator:hover {
  opacity: 1;
  transform: scale(1.2);
  background-color: #f0f0f0;
   color: #0066ff;
}

.label {
  min-width: 50px;
}
.timeline-date{
  font-weight: bold;
    color: #0066ff;
    font-size: 15px;
}

.filter-input {
    padding: 5px 10px;
    font-size: 14px;
    border: 2px solid #ddd;
    border-radius: 8px;
    outline: none;
    transition: all 0.3s ease;
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
    background-color: #fff;
    color: #333;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.filter-input:focus {
    border-color: #4a90e2;
    box-shadow: 0 2px 10px rgba(74, 144, 226, 0.2);
}

.filter-input::placeholder {
    color: #aaa;
    font-style: italic;
}

/* Optional: Add a search icon */
.filter-input.with-icon {
    padding-left: 40px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23aaa"><path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>');
    background-repeat: no-repeat;
    background-position: 12px center;
    background-size: 18px;
}
</style>
