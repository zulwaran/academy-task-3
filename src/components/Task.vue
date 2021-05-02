<template>
  <input type="checkbox" @click="taskCompleted(task.id)" :checked="task.completed" />
  <div class="task">
    <i :class="[task.urgently ? 'fas fa-circle' : '']"></i>
    <div class="text">{{ task.title }}</div>
    <div class="data">{{ task.day }}</div>
    <i @click="onDelete(task.id)" class="fas fa-times"></i>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    ...mapActions(["DELETE_TASK", "CHANGE_TASK_COMPLITED", "DEC_COUNT_TASKS"]),
    onDelete(id) {
      this.DELETE_TASK(id);
      this.DEC_COUNT_TASKS()
    },
    taskCompleted(id) {
      this.CHANGE_TASK_COMPLITED(id);
    },
  },
};
</script>