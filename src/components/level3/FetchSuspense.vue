<script setup>
import { ref } from 'vue';
const response = ref({});

console.log('prefetch');
const res = await fetch('https://yesno.wtf/api');
console.log('post fetch', res);
if (!res.ok) {
  throw new Error('load');
}
response.value = await res.json();
</script>

<template>
  <div style="min-height: 192px">
    <img style="height: 192px" :src="response.image" alt="image from api" />
  </div>
</template>
