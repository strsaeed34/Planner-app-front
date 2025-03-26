<template>
  <div
    :class="custom"

    :style="{ backgroundColor: goal.color }"
    @dblclick="setEditableGoal(goal.id)"
    @click="selectGoal(goal.id)"
  
  >
    <div class="insert" v-if="editableId === goal.id" @click="preventSelect">
      <input
        type="text"
        v-model="goal.name"
        @blur="handleBlur"
        @keydown.enter="update"
        @keyup.esc="cancelEditable"
      
        class="goal-input"
        v-focus
      />
      <div class="remove" @mousedown="remove(goal.id)">
        <i class="bi bi-trash"></i>
      </div>
      <ColorPicker
        @color-selected="setSelectedColor"
        @mousedown="handleColorPickerClick"
        :defaultColor="goal.color"
      />
      <div class="close" @mousedown="handleCloseClick">
        <i class="bi bi-x"></i>
      </div>
    </div>

    <span v-else>{{ goal.name }}</span>
  </div>
</template>

<script setup>

import { computed, onMounted, onUnmounted ,ref, watch } from "vue";
import ColorPicker from "./ColorPicker.vue";

const isEdit = ref(false);
const selectedColor = ref("#6C5CE7");
const editableId = ref(null);
const dontBlure = ref(false); // Track if ColorPicker is clicked


const props = defineProps({
  goal: Object,
  selectedGoal: Number, // Add selectedGoal here correctly
});

const emit = defineEmits(["remove", "edit","selectGoal"]);

//Goal Operations
const remove = (id) => {
  dontBlure.value = true;
  emit("remove", id);
};
const update = () => {
  props.goal.color = selectedColor.value;
  props.goal.description = "test";
  //console.log(props.goal)
  emit("edit", props.goal);
  cancelEditable();
};


const custom = computed(() => {
  if (props.selectedGoal && props.selectedGoal=== props.goal.id) {
    return "selected";
  }
    return editableId.value ? "insert" : "goal-item";
});

const selectGoal = (id) => {
  if (editableId.value === id) {
    return; // Prevent selection if goal is in edit mode
  }

  if (props.selectedGoal === id) {
    // emit("selectGoal", null); // Uncomment if you want to allow deselection
  } else {
    emit("selectGoal", id);
  }

};




const setSelectedColor = (color) => {
  selectedColor.value = color;
  dontBlure.value = true;
};

const handleBlur = () => {
  console.log(dontBlure.value == false);
  if (dontBlure.value == false) {
    console.log(dontBlure == false);
    cancelEditable();
  }
  dontBlure.value = false;
};

const handleColorPickerClick = () => {
  dontBlure.value = true;
};

const handleCloseClick = () => {
  dontBlure.value = true;
  cancelEditable();
};

const cancelEditable = () => {
  editableId.value = null;
  console.log(editableId.value);
};

const setEditableGoal = (id) => {
  if (id!=0)
  {
    emit("selectGoal",-1)
    editableId.value = id;
    dontBlure.value = false;
    console.log(dontBlure.value);
  }
  
};

const vFocus = {
  mounted(el) {
    el.focus();
  },
};
</script>

<style scoped>
.insert {
  display: flex;
  align-items: center;
  border-radius: 10px;

  justify-content: flex-end;
}
.goal-input {
  padding: 8px 0px;
  border: none;
  width: 145px;
  color: #222;
  font-weight: bold;
  font-size: 12px;
  text-align: center;

  outline: none;
  background-color: transparent;
}
.goal-item {

  padding: 8px 10px;
  border-radius: 10px;
  color: #222;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap; /* Prevent text from wrapping */
  min-width: 70px; /* Set a minimum width (adjust as needed) */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis if text overflows */
}

.selected{
  
  padding: 8px 10px;
  border-radius: 10px;
  color: #222;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap; 
  min-width: 70px; 
  overflow: hidden; 
  text-overflow: ellipsis; 
  border: 1px solid #4b4a4a; 
  border-radius: 8px;

}
.goal-item:hover {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  color: #fff;
}

.close {
  font-size: 20px;
  font-weight: bold;
}
.close:hover {
  color: white;
}

.remove {
  font-size: 20px;

  color: white;
}
.remove:hover {
  color: #d63031;
}
</style>