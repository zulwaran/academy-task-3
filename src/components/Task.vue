<template>
  <input type="checkbox" :checked="task.completed" />
  <div class="task">
    <i :class="[task.urgently ? 'fas fa-circle' : '']"></i>
    <div class="text">{{ task.title }}</div>
    <div class="data">{{ task.day }}</div>
    <i @click="onDelete(task.id)" class="fas fa-times"></i>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    onDelete(id) {
      this.$store.commit("DELETE_TASK", id);
    },
  },
};
</script>