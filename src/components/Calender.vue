<script setup>
import { ref, computed } from "vue";
import dayjs from "dayjs";

const today = dayjs(); // Current real-world date
const selectedDate = ref(dayjs()); // User-selected date
const startOfWeek = ref(selectedDate.value.startOf("week")); // Current week's start

// Generate week days (Sun-Sat)
const weekDays = computed(() => {
  return Array.from({ length: 7 }, (_, i) => startOfWeek.value.add(i, "day"));
});

// Change week
const changeWeek = (direction) => {
  startOfWeek.value = startOfWeek.value.add(direction * 7, "day");
};

// Change month
const changeMonth = (direction) => {
  startOfWeek.value = startOfWeek.value.add(direction, "month").startOf("week");
};

// Select a date
const selectDate = (date) => {
  selectedDate.value = date;
};
</script>

<template>
  <div class="calendar-container">
    <!-- Week Navigation -->
    <div class="week-nav">
      <button @click="changeMonth(-1)">«</button>
      <button @click="changeWeek(-1)">&lt;</button>

      <div class="days">
        <button
          v-for="day in weekDays"
          :key="day.format('YYYY-MM-DD')"
          :class="{
            today: day.isSame(today, 'day'),
            selected: day.isSame(selectedDate, 'day'),
          }"
          @click="selectDate(day)"
        >
          {{ day.format("ddd") }}
        </button>
      </div>

      <button @click="changeWeek(1)">&gt;</button>
      <button @click="changeMonth(1)">»</button>
    </div>

    <!-- Selected Date Display -->
    <div class="selected-date">
      {{ selectedDate.format("dddd, MMM D") }}
    </div>
  </div>
</template>

<style scoped>
.calendar-container {
  text-align: center;
  font-family: Arial, sans-serif;
}

.week-nav {
  display: flex;
  align-items: center;
  gap: 5px;
}

.days {
  display: flex;
  gap: 5px;
}

button {
  padding: 8px;
  border: none;
  background: #f0f0f0;
  cursor: pointer;
  border-radius: 5px;
  font-size: 14px;
}

button:hover {
  background: #ddd;
}

/* Highlight for today's date (green) */
.today {
  background: #28a745;
  color: white;
  font-weight: bold;
}

/* Highlight for selected date (blue) */
.selected {
  background: #007bff;
  color: white;
  font-weight: bold;
}

.selected-date {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
