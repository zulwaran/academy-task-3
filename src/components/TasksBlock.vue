<template>
  <div class="tasks">
    <div class="tasks__title">{{ list.text }}</div>
    <div class="tasks__items" :key="task.id" v-for="task in listTasks">
      <Task :task="task" @delete-task="$emit('delete-task', task.id)" />
    </div>

    <AddTask @add-task="addTask" :list="list" />
  </div>
</template>

<script>
import Task from "./Task";
import AddTask from "./AddTask";
export default {
  name: "TasksBlock",
  props: {
    listTasks: Object,
    list: Object,
  },
  components: {
    Task,
    AddTask,
  },
  methods: {
    addTask(newTask) {
      this.$emit("add-task", newTask);
    },
  },
  emits: ["delete-task", "add-task"],
  data() {
    return {};
  },
};
</script>