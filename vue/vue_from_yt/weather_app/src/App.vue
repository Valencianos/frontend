<script>
import axios from "axios";

  export default {
    data() {
      return {
        city: "",
        error: "",
        info: null
      }
    },
    computed: {
      cityName() {
        return "<<" + this.city + ">>"
      },
      showTemp() {
        return "Temperature: " + this.info.main.temp
      },
      showFeelsLike() {
        return "Feels like: " + this.info.main.feels_like
      },
      showMinTemp() {
        return "Minimal temperature: " + this.info.main.temp_min
      },
      showMaxTemp() {
        return "Maximum temperature: " + this.info.main.temp_max
      }
    },
    methods: {
      getWeather() {
        if (this.city.trim().length < 2) {
          this.error = "Please enter a valid city"
          return false
        }
        this.error = ''
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=1a7b7bad3f0fe246abb3758280b5eda6`)
        .then(res => (this.info = res.data))
      }
    }
  }
</script>

<template>
  <div class="wrapper">
    <h1>Weather App</h1>
    <p>Weather forecast in {{ city === "" ? "in your city" : cityName }}</p>
    <input type="text" v-model="city" placeholder="City">
    <button v-if="city !== ''" @click="getWeather()">Get weather</button>
    <button disabled v-else>Enter city</button>
    <p class="error">{{ error }}</p>

    <div v-if="info !== null">
      <p>{{ showTemp }}</p>
      <p>{{ showFeelsLike }}</p>
      <p>{{ showMinTemp }}</p>
      <p>{{ showMaxTemp }}</p>
    </div>
  </div>

</template>

<style scoped>
  .wrapper {
    width: 900px;
    height: 500px;
    border-radius: 50px;
    padding: 20px;
    background: #1f0f24;
    text-align: center;
    color: #ffffff;
  }

  .wrapper h1 {
    margin-top: 50px;
  }

  .wrapper p {
    margin-top: 20px;
  }

  .wrapper input {
    margin-top: 30px;
    background: transparent;
    border: 0;
    border-bottom: 2px solid #110813;
    color: #fcfcfc;
    font-size: 14px;
    padding: 5px 8px;
    outline: none;
  }

  .wrapper input:focus {
    border-bottom-color: #6e2d7d;
  }

  .wrapper button {
    background: #e3bc4b;
    color: #ffffff;
    border-radius: 10px;
    border: 2px solid #b99935;
    padding: 10px 15px;
    margin-left: 20px;
    cursor: pointer;
    transition: transform 500ms ease;
  }

  .wrapper button:disabled {
    background: #746027;
    cursor: not-allowed;
  }

  .wrapper button:hover {
    transform: scale(1.1) translateY(-5px);
  }

  .error {
    color: #d03939;
  }
</style>
