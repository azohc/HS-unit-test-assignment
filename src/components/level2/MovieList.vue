<script setup>
import MovieCard from './MovieCard.vue';
import { ref } from 'vue';
import dataService from './utils/dataService';

const movies = dataService.getMovies();

const favoriteMovieId = ref('');

function setFavoriteMovieId(id) {
  console.log('sfm', id);
  favoriteMovieId.value = id;
  // TODO what tf do i do to make select's option :checked?
}
</script>

<template>
  <div class="movie-list">
    <MovieCard
      v-for="movie in movies"
      :movie="movie"
      :key="movie.id"
      :favorite-movie="favoriteMovieId"
      @favorite-selected="setFavoriteMovieId"
    />
  </div>
  <div class="controls">
    Favorite Selector
    <select v-model="favoriteMovieId">
      <option v-for="movie in movies" :key="movie.id" :value="movie.id">
        {{ movie.title }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.movie-list {
  margin: 20px;
  display: flex;
  padding: 15px;
  border-bottom: 1px solid white;
}
</style>
