<script setup>
// TDD Exercise: complete the implementation of this component
// to pass all the tests defined in its companion .test.js file

import { ref, onMounted } from 'vue';
const response = ref({});
const loading = ref(true);
const error = ref(false);

onMounted(async () => {
  try {
    const res = await fetch('https://yesno.wtf/api');
    if (res && res.ok) {
      response.value = await res.json();
    } else {
      error.value = true;
    }
  } catch (err) {
    console.error(err);
    error.value = err;
  }
  loading.value = false;
});
</script>

<template>
  <div v-if="loading">loading...</div>
  <div v-else-if="error">error!</div>
  <img v-else :src="response.image" alt="yes or no img" />
</template>
