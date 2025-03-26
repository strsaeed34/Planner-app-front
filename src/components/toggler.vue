<template>
  <div class="container">
    <div class="caption">
      {{ showAdvanced ? "Hide Advanced" : "Show Advanced" }}
    </div>
    <div class="wrapper">
      <div class="separator"></div>
      <button @click="toggleAdvanced" class="toggle-btn">
        <span :class="{ rotate: showAdvanced }">▼</span>
      </button>
    </div>

    <transition name="fade-slide">
      <div v-if="showAdvanced" class="advanced-section">
        <p>This is the advanced section with a smooth animation!</p>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAdvanced: false,
    };
  },
  methods: {
    toggleAdvanced() {
      this.showAdvanced = !this.showAdvanced;
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 20px;
}

.caption {
  font-size: 16px;
  font-weight: bold;

  color: #333;
}
.wrapper {
  position: relative;
  overflow: hidden; /* Prevents any extra scroll */
  height: 50px;
}
.separator {
  left: 50%;
  transform: translate(-50%, -50%); /* Centers without pushing it down */
  top: 50%;
  position: relative;
  width: 100%;
  height: 2px;
  background: #ccc;
  
}

.toggle-btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%); /* Centers without pushing it down */
  top: 50%;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: gray;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
  box-sizing: border-box; /* Ensures proper sizing */
}

.toggle-btn:hover {
  background: rgb(73, 73, 73)
}

.toggle-btn span {
  font-size: 18px;
  color: white;
  transition: transform 0.3s ease;
}

.rotate {
  transform: rotate(180deg);
}

.advanced-section {
  background: #f3f3f3;
  padding: 15px;
  border-radius: 8px;
  margin-top: 10px;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
