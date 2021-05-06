<template>
  <input
    type="checkbox"
    @click="taskCompleted(task.id, task.listId)"
    :checked="task.completed"
  />
  <div class="task">
    <i :class="[task.urgently ? 'fas fa-circle' : '']"></i>
    <div class="text">{{ task.title }}</div>
    <div class="data">{{ task.day }}</div>
    <i @click="onDelete(task.id)" class="fas fa-times"></i>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../firebase";
export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    async onDelete(id) {
      if (confirm("Вы действительно хотите удалить задачу?")) {
        const tasksRef = await db.collection("tasks");
        let snapshot = await tasksRef.where("id", "==", id).get();
        await snapshot.forEach((doc) => {
          const deletedTask = doc.id;
          db.collection("tasks").doc(deletedTask).delete();
        });
        this.$store.state.tasks = await this.$store.state.tasks.filter(
          (task) => task.id !== id
        );
        this.$store.state.currentTasks = this.$store.state.currentTasks.filter(
          (task) => task.id !== id
        );
      }

      const listsRef = await db.collection("lists");
      let snapshot = await listsRef
        .where("id", "==", this.$store.state.currentList.id)
        .get();
      await snapshot.forEach((doc) => {
        const decListId = doc.id;
        var decrementList = db.collection("lists").doc(decListId);
        decrementList.update({
          count_tasks: firebase.firestore.FieldValue.increment(-1),
        });
      });

      /*  
      //Отображаем статус списков дел
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
      return data; */
    },

    async taskCompleted(id) {
      const taskRef = await db.collection("tasks");
      let taskSnapshot = await taskRef.where("id", "==", id).get();
      await taskSnapshot.forEach((doc) => {
        var taskCheck = db.collection("tasks").doc(doc.id);
        if (doc.data().completed === true) {
          return taskCheck.update({
            completed: false,
          });
        } else {
          return taskCheck.update({
            completed: true,
          });
        }
      });

      /*    //Обновляем статусы задач
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
      }*/
    },
  },
};
</script>