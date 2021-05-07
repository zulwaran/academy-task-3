<template>
  <div class="text">{{ list.name }}</div>
  <i @click="onDelete(list.id)" class="fas fa-times"></i>
</template>

<script>
import "firebase/firestore";
import { db } from "../firebase";
export default {
  name: "List",
  props: {
    list: Object,
  },
  methods: {
    //Удаляем список дел
    async deleteList(id) {
      const listsRef = await db.collection("lists");
      const snapshot = await listsRef.where("id", "==", id).get();
      await snapshot.forEach((doc) => {
        db.collection("lists").doc(doc.id).delete();
      });
      this.$store.state.lists = this.$store.state.lists.filter(
        (list) => list.id !== id
      );
      this.$store.state.visibleLists = this.$store.state.visibleLists.filter(
        (list) => list.id !== id
      );
    },

    //Удаляем все задачи, принадлежащие удаляемому списку дел
    async deleteTasks(id) {
      const tasksRef = await db.collection("tasks");
      let snapshot = await tasksRef.where("listId", "==", id).get();
      await snapshot.forEach((doc) => {
        db.collection("tasks").doc(doc.id).delete();
      });
      this.$store.state.currentTasks = [];
      if (
        this.$store.state.currentList &&
        this.$store.state.currentList.id === id
      ) {
        this.$store.state.showAddTask = false;
        this.$store.state.showListName = false;
        this.$store.state.showTasks = false;
      }
    },

    //Фильтр списков дел
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

    //Событие удаление списка дел и всех задач относящихся к нему
    async onDelete(id) {
      if (confirm("Вы действительно хотите удалить список?")) {
        this.deleteList(id);
        this.deleteTasks(id);
        this.filter();
      }
    },
  },
};
</script>