<template>
  <div class="tasks">
    <div class="tasks__title" v-show="$store.state.showListName">{{ currentList.name }}</div>
    <div class="tasks__items">
      <div class="tasks__item" v-show="$store.state.showTasks" :key="task.id" v-for="task in currentTasks">
        <Task :task="task" />
      </div>
    </div>
    <AddTask v-show="$store.state.showAddTask" />
  </div>
</template>

<script>
import Task from "./Task";
import AddTask from "./AddTask";
export default {
  name: "TasksBlock",
  props: {
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