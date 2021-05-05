<template>
  <div class="text">{{ list.text }}</div>
  <i @click="onDelete(list.id)" class="fas fa-times"></i>
</template>

<script>
export default {
  name: "List",
  props: {
    list: Object,
  },
  methods: {
    async onDelete(id) {
      //Удаляем список дел
      if (confirm("Вы действительно хотите удалить список?")) {
        const ref = await fetch(process.env.VUE_DB_URL + `/lists/${id}`, {
          method: "DELETE",
        });
        if (ref.status === 200) {
          this.$store.state.lists = this.$store.state.lists.filter(
            (list) => list.id !== id
          );
          this.$store.state.tasks = this.$store.state.tasks.filter(
            (task) => task.listId !== id
          );
          this.$store.state.currentTasks = [];
          if (
            this.$store.state.currentList &&
            this.$store.state.currentList.id === id
          ) {
            this.$store.state.showAddTask = false;
            this.$store.state.showListName = false;
            this.$store.state.showTasks = false;
          }
        } else {
          alert("Error");
        }

        //Фильтруем новый список дел
        if (this.$store.state.selectedOption == "all") {
          this.$store.state.visibleLists = this.$store.state.lists;
        }
        if (this.$store.state.selectedOption == "done") {
          this.$store.state.visibleLists = this.$store.getters.doneLists;
        }
        if (this.$store.state.selectedOption == "works") {
          this.$store.state.visibleLists = this.$store.getters.workLists;
        }
      }
    },
  },
};
</script>