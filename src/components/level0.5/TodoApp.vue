<script setup>
import { ref } from 'vue';

const todos = ref([
  {
    id: 1,
    text: 'Learn Vue.js 3',
    completed: false,
  },
]);

const addTodo = () =>
  todos.value.push({ id: nextId++, text: newTodoText, completed: false });
const newTodoText = ref('');

let nextId = 2;
</script>

<template>
  <div>
    <div
      data-test="todo"
      :class="{ completed: t.completed }"
      v-for="t in todos"
      :key="t.id"
    >
      {{ t.text }}
      <input
        v-model="t.completed"
        type="checkbox"
        name="todo-checkbox"
        id="checkbox"
        data-test="todo-checkbox"
      />
    </div>
  </div>
  <input
    v-model="newTodoText"
    type="text"
    name="new-todo-text"
    data-test="new-todo-input"
  />
  <button name="new-todo-btn" @click="addTodo" data-test="new-todo-btn">
    add todo
  </button>
</template>
