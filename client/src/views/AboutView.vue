<template>
  <div class="product-details">
    <h1>{{ App.details.name }}</h1>
    <div class="image">
      <img :src="App.details.image_url" alt="" >
    </div>
    <div class="details-container">
    
       <div class="detail-section">
      <h2 class="judul">
        <i class="fa fa-money" :style="{ fontSize: '20px', color: 'black', marginRight: '10px' }"></i>
        Harga
      </h2>
      <p class="detail">Rp.{{ App.details.min_price }} - Rp.{{ App.details.base_price }}</p>
    </div>
    
    <div class="detail-section">
      <h2 class="judul">
        <i class="fa fa-clipboard" :style="{ fontSize: '20px', color: 'black', marginRight: '10px' }"></i>
        Detail
      </h2>
      <p class="detail">{{App.details.general_indication}}</p>
    </div>

    <div class="detail-section">
      <h2 class="judul">
        <i class="fa fa-map-o" :style="{ fontSize: '20px', color: 'black', marginRight: '10px' }"></i>
        Deskripsi
      </h2>
      <p class="detail">{{ App.details.description}}</p>
    </div>

    <div class="detail-section">
      <h2 class="judul">
        <i class="fa fa-balance-scale" :style="{ fontSize: '20px', color: 'black', marginRight: '10px' }"></i>
        Komposisi
      </h2>
      <p class="detail">{{ App.details.composition}}</p>
    </div>

    <div class="detail-section">
      <h2 class="judul">
        <i class="fa fa-flask" :style="{ fontSize: '20px', color: 'black', marginRight: '10px' }"></i>
        Dosis
      </h2>
      <p class="detail">{{ App.details.dosage}}</p>
    </div>

    <div class="detail-section">
      <h2 class="judul">
        <i class="fa fa-pencil-square-o" :style="{ fontSize: '20px', color: 'black', marginRight: '10px' }"></i>
        Pemakaian
      </h2>
      <p class="detail">{{ App.details.how_to_use}}</p>
    </div>
   
    <div class="detail-section">
      <h2 class="judul">
        <i class="fa fa-hourglass-3" :style="{ fontSize: '20px', color: 'black', marginRight: '10px' }"></i>
        Batasan Obat
      </h2>
      <p class="detail">{{ App.details.warning}}</p>
    </div>
   
    <div class="detail-section">
      <h2 class="judul">
        <i class="fa fa-thumbs-o-down" :style="{ fontSize: '20px', color: 'black', marginRight: '10px' }"></i>
        Efek Samping
      </h2>
      <p class="detail">{{ App.details.side_effects}}</p>
    </div>

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
    const slug = this.$route.query.slug
    this.App.detailTranscript(slug)
  }
}
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
.product-details {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  font-family: 'Open Sans', sans-serif;
}

.product-details h1 {
  font-size: 30px;
  font-weight: 700;
  color: #000000;
  position: relative;
  text-align: center;
}
.product-details h1::before {
  content: '';
  width: 100%;
  height: 5px;
  background: linear-gradient(to right, #007bff, #00bfff);
  position: absolute;
  bottom: -10px;
  left: 0;
  transform: scaleX(0);
  transition: transform 30s ease-out;
  animation: underline-grow 1s forwards infinite; /* add infinite iteration count */
}

@keyframes underline-grow {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.image {
  text-align: center;
}

.image img {
  max-width: 100%;
  height: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.details-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 50px;
}

.detail-section {
  border: none;
  background-color: #f8f9fa;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.detail-section h2.judul {
  margin-top: 0;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  background: linear-gradient(to right, #007bff, #00bfff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.detail {
  font-size: 18px;
  margin: 0;
  line-height: 1.5;
  color: #555;
}

@media (max-width: 767px) {
  .details-container {
    grid-template-columns: 1fr;
  }
}

</style>
