<template>
  <div>
    <h1>{{ App.details.name }}</h1>
    <img :src="App.details.image_url" alt="">
    <h2>Detail</h2>
    <p class="detail">{{App.details.general_indication}}</p>
    <h2>Deskripsi</h2>
    <p class="detail">{{ App.details.description }}</p>
    <!-- <p>Slug: {{ $route.query.slug }}</p> -->
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