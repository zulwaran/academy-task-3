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
    async onDelete(id) {
      console.log(id);

      //Удаляем список дел
      if (confirm("Вы действительно хотите удалить список?")) {
        const listsRef = await db.collection("lists");
        let listSnapshot = await listsRef.where("id", "==", id).get();
        await listSnapshot.forEach((doc) => {
          /* const deletedList = doc.id; */
          db.collection("lists").doc(doc.id).delete();
        });
        this.$store.state.lists = this.$store.state.lists.filter(
          (list) => list.id !== id
        );
        console.log(this.$store.state.lists);

        const tasksRef = await db.collection("tasks");
        let snapshotTasks = await tasksRef.where("listId", "==", id).get();
        await snapshotTasks.forEach((doc) => {
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