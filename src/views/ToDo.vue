<template>
  <section class="container">
    <div class="todolist">
      <ListBlock :lists="$store.state.visibleLists" />
      <TaskBlock
        :currentTasks="$store.state.currentTasks"
        :currentList="$store.state.currentList"
      />
    </div>
  </section>
</template>

<script>
import ListBlock from "../components/ListBlock";
import TaskBlock from "../components/TasksBlock";
export default {
  name: "ToDo",
  components: {
    ListBlock,
    TaskBlock,
  },
  methods: {},
  async created() {
    //Получаем из БД данные о списках дел
    const resList = await fetch("http://localhost:5000/lists");
    const dataList = await resList.json();
    this.$store.state.lists = dataList;
    this.$store.state.lists.sort((a, b) => a.text.localeCompare(b.text));
    this.$store.state.visibleLists = this.$store.state.lists;
    console.log();

    //Получаем из БД данные о задачах
    const resTasks = await fetch("http://localhost:5000/tasks");
    const dataTasks = await resTasks.json();
    this.$store.state.tasks = dataTasks;

    //Фильтруем списки дел
    this.$store.state.visibleLists = this.$store.getters.doneLists;

    //Задаем статус отфильтрованных списков дел
    for (let list in this.$store.state.visibleLists) {
      let count = 0;
      for (let task in this.$store.state.tasks) {
        if (
          this.$store.state.visibleLists[list].id ===
            this.$store.state.tasks[task].listId &&
          this.$store.state.tasks[task].completed === true
        ) {
          count++;
        }
      }
      if (this.$store.state.visibleLists[list].count_tasks === 0) {
        this.$store.state.visibleLists[list].color = "white";
      } else if (this.$store.state.visibleLists[list].count_tasks === count) {
        this.$store.state.visibleLists[list].color = "gray";
      } else {
        this.$store.state.visibleLists[list].color = "green";
      }
    }
  },
};
</script>