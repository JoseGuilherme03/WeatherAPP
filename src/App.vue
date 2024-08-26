<template>
  <div class="min-h-screen flex justify-center items-center bg-gradient-to-b from-indigo-500 to-blue-300">
    <WeatherApp />
  </div>
</template>

<script>
import WeatherApp from './components/WeatherApp.vue';

export default {
  components: {
    WeatherApp,
  },
};
</script>

<style scoped></style>
