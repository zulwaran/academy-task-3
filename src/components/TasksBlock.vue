<template>
  <div class="tasks">
    <div class="tasks__title">{{currentList.text}}</div>
    <div class="tasks__items" :key="task.id" v-for="task in currentTasks">
      <Task :task="task" />
    </div>
    <AddTask />
  </div>
</template>

<script>
import Task from "./Task";
import AddTask from "./AddTask";
export default {
  name: "TasksBlock",
  props: {
    tasks: Object,
    currentList: Object,
    currentTasks: Object,
  },
  components: {
    Task,
    AddTask,
  },
  methods: {},
};
</script>