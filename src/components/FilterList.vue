<template>
  <select v-model="selectedOption" @change="filterLists">
    <option value="all">Все</option>
    <option value="done">Исполненные</option>
    <option value="works">Не исполненные</option>
  </select>
</template>


<script>
export default {
  name: "FilterList",
  data() {
    return {
      selectedOption: "done",
    };
  },
  methods: {
    //Получаем опцию из селекта
    async filterLists({ selectedOption = this.selectedOption }) {
      this.$store.state.selectedOption = selectedOption;

      //При перключении опции, отключаем видимость задач
      this.$store.state.showListName = false;
      this.$store.state.showAddTask = false;
      this.$store.state.showTasks = false;

      this.filter();
      this.listStatus();
    },

    //Статус завершенности списков дел
    async listStatus() {
      for (let list in this.$store.state.visibleLists) {
        let count = 0;
        for (let task in this.$store.state.tasks) {
          if (
            this.$store.state.visibleLists[list].id ===
              this.$store.state.tasks[task].listId &&
            this.$store.state.tasks[task].is_completed === true
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

    //Фильтруем списки дел
    async filter() {
      if (this.$store.state.selectedOption == "all") {
        this.$store.state.visibleLists = this.$store.state.lists;
      }
      if (this.$store.state.selectedOption == "done") {
        this.$store.state.visibleLists = this.$store.getters.doneLists;
      }
      if (this.$store.state.selectedOption == "works") {
        this.$store.state.visibleLists = this.$store.getters.workLists;
      }
    },
  },
};
</script>