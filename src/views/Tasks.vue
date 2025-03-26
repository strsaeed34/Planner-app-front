<template>
 <div class="container ">
   <div class="row m-1">
    <div class="col-sm mycard m-1 p-2">
      <h1 class="header m-1">Goals</h1>
      <goals
        :goals="goals"
        @addGoal="handleCreateGoal"
        @removeGoal="handleDeleteGoal"
        @editGoal="handleUpdateGoal"
        @handleSelect="handleSelectedGoal"
      />
      
    </div>

    <div class="col-sm mycard m-1">
      <h1 class="header">Tasks</h1>
      <div class="task-list">
        <task
          v-for="task in tasks"
          :task="task"
          :key="task.id"
          @remove="handleDeleteTask(task)"
            @completeTask="handleUpdateTask"
          @showEditor="openTaskEditor"
        />

        <AddTasks
          v-show="isAddShow"
          @toggleAddShow="ShowAddTask"
          @addTask="handleCreateTask"
          class="mb-2"
          :goals="goals"
        />
        <div class="addTask mb-2" @click="ShowAddTask" v-show="!isAddShow">
          <i class="bi bi-plus"></i>
        </div>
      </div>
    </div>
  </div>

  <!-- Floating Action Button (FAB) -->
  <button class="fab" v-if="taskStore.loading" :disabled="taskStore.loading">
    <span  class="spinner-border spinner-border-sm">
    </span>
   
  </button>
 </div>

 <!-- Task Editor Modal -->
    <TaskEditor
      v-if="isModalOpen"
      :goals="goals"
      :task="selectedTask"
      @closeModal="closeModal"
      @updateTask="handleUpdateTask"
    
    />
  
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import Task from "../components/Task.vue";
import { useTaskStore } from "../stores/taskStore.js";
import Goals from "../components/Goals.vue";
import { useGoalStore } from "../stores/goalStore.js";
import AddTasks from "../components/AddTask.vue";
import TaskEditor from "../components/TaskEditor.vue";
import toggler from "@/components/toggler.vue";

const taskStore = useTaskStore();
const goalStore = useGoalStore();
const { fetchTasks, createTask, deleteTask,updateTask } = taskStore;
const { fetchGoals, createGoal, deleteGoal, updateGoal } = goalStore;
const tasks = ref([]);
const goals = ref([]);
const isAddShow = ref(false);
const selectedGoal = ref(null);

const isModalOpen = ref(false);
const selectedTask = ref(null);



const ShowAddTask = async () => {
  await fetchGoals();
  goals.value = goalStore.goals;
  isAddShow.value = !isAddShow.value;
};

const openTaskEditor = (task) => {
  selectedTask.value = task;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedTask.value = null;
};

const handleUpdateTask = async (updatedTask) => {
   console.log("Updated Task:", updatedTask);
  await updateTask(updatedTask);

  await fetchTasks();
  tasks.value = taskStore.tasks;

  closeModal();
};


onMounted(async () => {
  console.log("Mounted");
  await fetchTasks();
  await fetchGoals();
  tasks.value = taskStore.tasks;
  goals.value = goalStore.goals;
  // console.log(tasks);
  // console.log(goals);
  // selectedGoal.value = null;
});

const handleCreateTask = async (newTask) => {
  console.log("tasks", newTask.value);
  await createTask(newTask.value);

  await fetchTasks();
  tasks.value = taskStore.tasks;
};

const handleDeleteTask = async (task) => {
  try {
    tasks.value = tasks.value.filter((t) => t.id !== task.id);
    await deleteTask(task.id);
    await fetchTasks();
    //tasks.value = taskStore.tasks;
  } catch (error) {
    console.log(error);
  }
};

const handleShowTaskEditor=()=>{

}

//goal
const handleCreateGoal = async (newGoal) => {
  try {
    console.log(newGoal);
    await createGoal(newGoal);

    await fetchGoals();
    goals.value = goalStore.goals;
  } catch (error) {
    console.log(error);
  }
};

const handleDeleteGoal = async (id) => {
  try {
    goals.value = goals.value.filter((t) => t.id !== id);
    await deleteGoal(id);
    await fetchGoals();

    goals.value = goalStore.goals;
  } catch (error) {
    console.log(error);
  }
};

const handleUpdateGoal = async (goal) => {
  try {
    // goals.value = goals.value.filter((t) => t.id !== goal);
    await updateGoal(goal.id, goal);
    await fetchGoals();

    goals.value = goalStore.goals;
  } catch (error) {
    console.log(error);
  }
};

const handleSelectedGoal = (id) => {
  //selectedGoal.value = id;
  if (id != 0) {
    tasks.value = taskStore.tasks;
    // console.log("Filtering tasks by goal_id:", id);
    // console.log("Tasks before filtering:", tasks.value);

    // Filter the tasks
    tasks.value = tasks.value.filter((t) => t.goal_id === id);

    // Debugging: Log the tasks after filtering
    // console.log("Tasks after filtering:", tasks.value);
  } else if (id != -1) {
    tasks.value = taskStore.tasks;
  }
};
</script >

<style  scoped>

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

/* Floating Action Button (FAB) */
.addTask {
  /* width: 24;
  height: 24; */
  border-radius: 10px;
  opacity: 30%;
  background-color: #4a90e2;
  color: white;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.addTask:hover {
  opacity: 100%;
}


 .fab {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #4a90e2;
  color: white;
  border: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
} 

.fab:hover {
  background-color: #34495e;
}
</style>