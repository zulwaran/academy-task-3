<template>
  <section class="container">
    <div class="todolist">
      <div class="list">
        <div class="list__filter">
          <select>
            <option value="all">all</option>
            <option value="done">done</option>
            <option value="works">works</option>
          </select>
        </div>
        <div
          class="list__items"
          :key="list.id"
          v-for="list in lists"
          @click="changeList(list.id)"
        >
          <div>{{ list.text }}</div>
        </div>
        <form @submit="addList" class="list__add">
          <input type="text" v-model="listText" />
          <button>Добавить список</button>
        </form>
      </div>
      <div class="tasks">
        <div class="tasks__title">Список 1</div>
        <div class="tasks__items" :key="task.id" v-for="task in tasks">
          <div>{{ task.text }} {{ task.day }}</div>
        </div>
        <form @submit="addTask" class="tasks__add">
          <input type="text" v-model="taskText" />
          <input type="checkbox" v-model="taskReminder" value="Срочное?" />
          Срочное
          <button>Добавить дело</button>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "App",
  components: {},
  props: {},
  methods: {
    changeList(id) {
      this.tasks = this.lists[id - 1].task;
    },
    addTask(e) {
      e.preventDefault();

      if (!this.taskText) {
        alert("Введите название задачи");
        return;
      }

      const newTask = {
        id: Math.floor(Math.random() * 100000),
        text: this.taskText,
        reminder: this.taskReminder,
      };
      console.log(newTask);

      (this.taskText = ""), (this.taskReminder = false);
      this.tasks = [...this.tasks, newTask];
    },
    addList(e) {
      e.preventDefault();

      if (!this.listText) {
        alert("Введите название списка");
        return;
      }

      const newList = {
        id: Math.floor(Math.random() * 100000),
        text: this.listText,
      };
      console.log(newList);

      (this.listText = ""), (this.lists = [...this.lists, newList]);
    },
  },
  data() {
    return {
      lists: [],
      tasks: [],
      taskText: "",
      taskReminder: false,
      listText: "",
    };
  },
  created() {
    this.lists = [
      {
        id: 1,
        text: "Список 1",
        task: [
          { id: 1, text: "Doctor", day: "1 march", reminder: true },
          { id: 2, text: "Teacher", day: "2 march", reminder: true },
          { id: 3, text: "Shopping", day: "3 march", reminder: true },
        ],
      },
      {
        id: 2,
        text: "Список 2",
        task: [
          { id: 1, text: "Teacher", day: "1 march", reminder: true },
          { id: 2, text: "Teacher", day: "2 march", reminder: true },
          { id: 3, text: "Teacher", day: "3 march", reminder: true },
        ],
      },
      {
        id: 3,
        text: "Список 3",
        task: [
          { id: 1, text: "Shopping", day: "1 march", reminder: true },
          { id: 2, text: "Shopping", day: "2 march", reminder: true },
          { id: 3, text: "Shopping", day: "3 march", reminder: true },
        ],
      },
      {
        id: 4,
        text: "Список 4",
        task: [
          { id: 1, text: "Doctor", day: "1 march", reminder: true },
          { id: 2, text: "Doctor", day: "2 march", reminder: true },
          { id: 3, text: "Doctor", day: "3 march", reminder: true },
        ],
      },
    ];
  },
};
</script>


































<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  position: relative;
  padding: 10px;
}
.todolist {
  display: flex;
  position: relative;
  border: 1px solid red;
}
</style>
