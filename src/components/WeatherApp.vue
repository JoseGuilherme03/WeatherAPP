<template>
  <div
    class="bg-indigo-600 p-8 text-white rounded-xl shadow-md max-w-md w-full"
  >
    <div class="form">
      <h3 class="mb-4 text-lg">Confira o clima de uma cidade</h3>
      <div class="form-input-container flex">
        <input
          v-model="city"
          type="text"
          placeholder="Digite o nome da cidade"
          @keyup.enter="fetchWeatherData"
          class="p-2 flex-1 rounded-md text-black"
        />
        <button
          @click="fetchWeatherData"
          class="px-5 bg-blue-400 ml-2 rounded-md"
        >
          <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center mt-4">
      <font-awesome-icon :icon="['fas', 'spinner']" class="animate-spin" />
    </div>

    <div v-if="error" class="text-center mt-4 text-red-400">
      <p>Não foi possível encontrar o clima de uma cidade com este nome</p>
    </div>

    <div v-if="weatherData && !loading && !error" class="mt-6 border-t border-white pt-6">
      <h2 class="flex justify-center items-center mb-2">
        <font-awesome-icon :icon="['fas', 'location-dot']" class="mr-2" />
        <span class="text-xl">{{ weatherData.name }}</span>
        <img :src="countryFlagUrl" alt="Bandeira do país" class="w-10 ml-2" />
      </h2>
      <p class="text-6xl text-center p-2">
        {{ parseInt(weatherData.main.temp) }}&deg;C
      </p>
      <div class="flex justify-center items-center mt-2">
        <p class="font-bold capitalize">
          {{ weatherData.weather[0].description }}
        </p>
        <img :src="weatherIconUrl" alt="Condições do tempo" class="ml-2" />
      </div>
      <div class="flex justify-center items-center mt-4">
        <p class="border-r border-white pr-4">
          <font-awesome-icon :icon="['fas', 'droplet']" class="mr-1" />
          {{ weatherData.main.humidity }}%
        </p>
        <p class="pl-4">
          <font-awesome-icon :icon="['fas', 'wind']" class="mr-1" />
          {{ weatherData.wind.speed }}km/h
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "",
      weatherData: null,
      loading: false,
      error: false,
      apiKey: "447954334ef4e0c591d2ef05536ccc95",
    };
  },
  computed: {
    weatherIconUrl() {
      return `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}.png`;
    },
    countryFlagUrl() {
      return `https://flagsapi.com/${this.weatherData.sys.country}/flat/64.png`;
    },
  },
  methods: {
    fetchWeatherData() {
      if (!this.city) {
        window.alert("Digite o nome de uma cidade");
        return;
      }

      this.loading = true;
      this.error = false;

      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.apiKey}&lang=pt_br`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === "404") {
            this.error = true;
          } else {
            this.weatherData = data;
          }
        })
        .catch(() => {
          this.error = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped></style>
