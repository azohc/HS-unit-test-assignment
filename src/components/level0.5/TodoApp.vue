<script setup>
import { ref } from 'vue';

const todos = ref([
  {
    id: 1,
    text: 'Learn Vue.js 3',
    completed: false,
  },
]);
</script>
<template>
  <div data-test="todo">
    <div v-for="t in todos" :key="t.id">{{ t.text }}</div>
  </div>
</template>
