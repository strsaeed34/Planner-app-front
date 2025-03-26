<template>
  <div class="goal-list">
    <Goal    
      :goal="all"
      :selectedGoal="selectedGoal"    
      @selectGoal="handleSelect"
      
    />
    <Goal      
      v-for="(goal, index) in goals"
      :goal="goal"
      :selectedGoal="selectedGoal"
      :key="index"
      @remove="removeGoal"
      @edit="editGoal"
      @selectGoal="handleSelect"
      
    />
    <div class="insert" v-show="isAddShow" >
      <input
        type="text"
        value=""
        v-model="newGoal.name"
        placeholder="Add a Goal..."
        @keydown.enter="addGoal"
        class="goal-input"
      />

      <div class="enter" @click="addGoal"><i class="bi bi-arrow-return-left"></i></div>
      <ColorPicker @color-selected="setSelectedColor" />
      <div class="close" @click="isAddShow = false">
        <i class="bi bi-x"></i>
      </div>
    </div>

    <button class="fab" @click="ShowTextBox" v-show="!isAddShow">
      <i class="bi bi-plus"></i>
    </button>
  </div>
</template>

<script setup>
import { ref ,computed} from "vue";
import ColorPicker from "./ColorPicker.vue";
import Goal from "./Goal.vue";

const isAddShow = ref(false);
const all= { 
  id:0,
  name: "All",
  color: "#4a90e2",
}
const newGoal = ref({
  name: "",
  color: "",
});

const selectedColor = ref("#6C5CE7");
const selectedGoal = ref(null); // Track selected goal

const props = defineProps({
  goals: Object,
});


const ShowTextBox = () => {
  isAddShow.value = !isAddShow.value;
};
const emit = defineEmits(["addGoal", "removeGoal", "editGoal" ,"handleSelect"]);
// Add a new Goal
const addGoal = () => {
  console.log(newGoal.value.name);

  newGoal.value.color = selectedColor.value;

  emit("addGoal", newGoal.value);
  // isAddShow.value = !isAddShow.value;
  newGoal.value = {};
};

const removeGoal = (id) => {
  emit("removeGoal", id);
  console.log("removeid", id);
};

const editGoal = (goal) => {
  emit("editGoal", goal);
  console.log("Updated Goal", goal);
};

// Set the selected color
const setSelectedColor = (color) => {
  selectedColor.value = color;
};

const handleSelect=(id)=>{
  selectedGoal.value=id;
  emit("handleSelect", selectedGoal.value)
  console.log(selectedGoal.value)
}
</script>

<style scoped>
.goal-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.insert {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  width: 237px;
  justify-content: space-between;
}
.goal-input {
  padding: 8px;
  border: none;
  width: 150px;
  color: #222;
  font-weight: bold;
  font-size: 12px;
  text-align: center;

  outline: none;
  background-color: transparent;
}
/* .goal-item {

  padding: 8px 10px;
  border-radius: 10px;
  color: #222;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
} */

/* Floating Action Button (FAB) */
.fab {
  width: 24;
  height: 24;
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

.fab:hover {
  opacity: 100%;
}

.close {

  font-size: 24px;
  font-weight: bold;
  color: #919191;
}
.close:hover {
  color: #4b4b4b;
}

.enter {

  font-size: 24px;

  color: #919191;
}
.enter:hover {
  color: #4b4b4b;
}
</style>

