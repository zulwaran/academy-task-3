<template>
  <div class="lists">
    <div class="lists__filter">
      <FilterList />
    </div>
    <div class="lists__items">
      <div
        :class="['lists__item', list.color]"
        :key="list.id"
        v-for="list in lists"
        @dblclick="getList(list)"
      >
        <List :list="list" />
      </div>
    </div>

    <AddList />
  </div>
</template>

<script>
import FilterList from "./FilterList";
import List from "./List";
import AddList from "./AddList";
export default {
  name: "ListBlock",
  props: {
    lists: Object,
  },
  components: {
    FilterList,
    List,
    AddList,
  },
  methods: {
    getList(list) {
      //Получаем текущий список дел
      this.$store.state.currentList = list;

      //Отображаем задачи текущего списка дел
      this.$store.state.showAddTask = true;
      this.$store.state.showListName = true;
      this.$store.state.showTasks = true;
      this.$store.state.currentTasks = this.$store.state.tasks.filter(
        (task) => task.listId === list.id
      );
    },
  },
};
</script>

<style scoped>
</style>