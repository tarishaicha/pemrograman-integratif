<template>
  <div class="container">
    <h1>
      <div>
        <i
          class="fa fa-user-md"
          :style="{ fontSize: '48px', color: 'black' }"
        ></i>
        <br />
      </div>
      Speech to Text
    </h1>
    <div class="card">
      <div class="card-header">
        <button class="btn-primary" @click="App.startRecording">
          Start Recording
        </button>
        <button class="btn-secondary" @click="App.clearTranscript">Clear</button>
      </div>
      <div class="card-body">
        <input class="form-control" type="text" v-model="App.transcript" />
        <button class="button-name" @click="App.recommendationTranscript()">Search</button>
      </div>
    </div>
    <div v-if="App.transcript">
      <p class="mb-2"><strong>Rekomendasi:</strong></p>
      <ul class="output">
        <li v-for="(item, index) in App.items" :key="index">
          <div class="theitem">
            {{ item.name }} - {{ item.base_price }} {{ item.selling_unit }}
          </div>
          <img :src="item.image_url" />
          <!-- <child-component :slug="item.slug"></child-component> -->
          <!-- {{ item.slug }} -->
          <router-link class="button-name" :to="{path: '/about', query:{slug: item.slug}}">Detail</router-link>
          <!-- <button class="button-name" @click="App.detailTranscript(item.slug), App.selectedSlug = item.slug, App.detail = true">Detail</button> -->
          <!-- <div v-if="App.selectedSlug === item.slug">
            <p class="detail">Detail : {{App.details.general_indication}}</p>
          </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {useApp} from '../stores/index';
export default {
  data() {
    return {
      
    }
  }, 
  setup() {
    const App = useApp();
    return {
      App,
    }
  },
  mounted() {
    //this.App.recommendationTranscript();
  }
}
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
h1 {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: #000000;
  margin-bottom: 50px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.container {
  max-width: 800px;
  margin: auto;
  padding-top: 50px;
  font-family: sans-serif;
}

.card {
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.card-header {
  background-color: #007bff;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.card-header button {
  border: none;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.card-header .btn-primary {
  background-color: #007bff;
}

.card-header .btn-primary:hover {
  background-color: #0069d9;
}

.card-header .btn-secondary {
  background-color: #6c757d;
  margin-left: 10px;
}

.card-header .btn-secondary:hover {
  background-color: #5a6268;
}

.card-body {
  padding: 20px;
}

.form-control {
  border-radius: 5px;
  border: 1px solid gray;
  padding: 10px;
  font-size: 16px;
  width: 97%;
}

.output {
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  color: #000000;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.output li {
  width: calc(33.33% - 10px);
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.output li:hover {
  transform: translateY(-5px);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}

.output li img {
  max-width: 100%;
  height: auto;
}

.output li p {
  margin: 10px;
  font-size: 16px;
  color: #555;
}

.theitem {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  font-family: "Poppins", sans-serif;
  background-image: linear-gradient(to bottom right, #007bff, #00bcd4);
}

/* tambahan */
.button-name {
 align-items: center;
 appearance: none;
 background-color: #FCFCFD;
 border-radius: 4px;
 border-width: 0;
 box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px,rgba(45, 35, 66, 0.15) 0 7px 13px -3px,#D6D6E7 0 -3px 0 inset;
 box-sizing: border-box;
 color: #36395A;
 cursor: pointer;
 display: inline-flex;
 font-family: "Poppins", sans-serif;
 height: 36px;
 justify-content: center;
 line-height: 1;
 list-style: none;
 overflow: hidden;
 padding-left: 16px;
 padding-right: 16px;
 position: relative;
 text-align: left;
 text-decoration: none;
 transition: box-shadow .15s,transform .15s;
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
 white-space: nowrap;
 will-change: box-shadow,transform;
 font-size: 13px;
}

.button-name:focus {
 box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.button-name:hover {
 box-shadow: rgba(45, 35, 66, 0.3) 0 4px 8px, rgba(45, 35, 66, 0.2) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
 transform: translateY(-2px);
}

.button-name:active {
 box-shadow: #D6D6E7 0 3px 7px inset;
 transform: translateY(2px);
}

.detail {
  font-family: "Poppins", sans-serif;
  font-size: 15px;
  font-weight: normal;
}

</style>