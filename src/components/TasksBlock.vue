<template>
  <div>
    <div class="tasks__title">Список 1</div>
    <div class="tasks__add">
      <div class="tasks__items" :key="task.id" v-for="task in tasks">
        <div>{{ task.text }}</div>
      </div>
      <input type="text" />
      <input type="checkbox" value="Срочное?" /> Срочное
      <Button text="Добавить дело" />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "TasksBlock",
  components: {
    Button,
  },
  data() {
    return {
      lists: [],
      tasks: [],
    };
  },
  created() {
    this.lists = [
      {
        id: 1,
        text: "List 1",
        task: [
          { id: 1, text: "Doctor", day: "1 march", reminder: true },
          { id: 2, text: "Teacher", day: "2 march", reminder: true },
          { id: 3, text: "Shopping", day: "3 march", reminder: true },
        ],
      },
      {
        id: 2,
        text: "List 2",
        task: [
          { id: 1, text: "Teacher", day: "1 march", reminder: true },
          { id: 2, text: "Teacher", day: "2 march", reminder: true },
          { id: 3, text: "Teacher", day: "3 march", reminder: true },
        ],
      },
      {
        id: 3,
        text: "List 3",
      },
      {
        id: 4,
        text: "List 4",
      },
    ];
    this.tasks = this.lists[0].task;
  },
};
</script>