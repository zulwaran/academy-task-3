<template>
  <input
    type="checkbox"
    @click="taskCompleted(task.id, task.listId)"
    :checked="task.is_completed"
  />
  <div class="task">
    <i :class="[task.urgency ? 'fas fa-circle' : '']"></i>
    <div class="text">{{ task.name }}</div>
    <div class="data">{{ task.created_at }}</div>
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
  computed: {},
  methods: {
    //Удаляем задачу у выбранного списка дел
    async onDelete(id) {
      if (confirm("Вы действительно хотите удалить задачу?")) {
        const tasksRef = await db.collection("tasks");
        const snapshot = await tasksRef.where("id", "==", id).get();
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

        await this.listDecrement();
        this.listStatus();
      }
    },

    //Меняем статус завершенности у задачи
    async taskCompleted(id) {
      const taskRef = await db.collection("tasks");
      const snapshot = await taskRef.where("id", "==", id).get();
      snapshot.forEach((doc) => {
        const taskCheck = db.collection("tasks").doc(doc.id);
        if (doc.data().is_completed === true) {
          taskCheck.update({
            is_completed: false,
            updated_at: this.data(),
          });
          for (let task in this.$store.state.currentTasks) {
            if (this.$store.state.currentTasks[task].id === id) {
              this.$store.state.currentTasks[task].is_completed = false;
            }
          }
        } else {
          taskCheck.update({
            is_completed: true,
            updated_at: this.data(),
          });
          for (let task in this.$store.state.currentTasks) {
            if (this.$store.state.currentTasks[task].id === id) {
              this.$store.state.currentTasks[task].is_completed = true;
            }
          }
        }
      });
      this.listStatus();
    },

    //Получаем задачи из БД
    async getTasks() {
      this.$store.state.tasks = [];
      const tasksRef = await db.collection("tasks");
      const snapshot = await tasksRef.get();
      await snapshot.forEach((doc) => {
        let docTask = doc.data();
        this.$store.state.tasks.push(docTask);
      });
      return this.$store.state.tasks;
    },

    //Уменьшаем счетчик количества задач у выбранного списка дел
    async listDecrement() {
      const listsRef = await db.collection("lists");
      const snapshot = await listsRef
        .where("id", "==", this.$store.state.currentList.id)
        .get();
      await snapshot.forEach((doc) => {
        const decListId = doc.id;
        var decrementList = db.collection("lists").doc(decListId);
        decrementList.update({
          count_tasks: firebase.firestore.FieldValue.increment(-1),
        });
        for (let list in this.$store.state.lists) {
          if (
            this.$store.state.lists[list].id ===
            this.$store.state.currentList.id
          ) {
            this.$store.state.lists[list].count_tasks -= 1;
          }
        }
      });
    },

    //Определяем текущий момент времени
    data() {
      let date = new Date();
      let day = date.getDate();
      if (date.getDate() < 10) {
        day = "0" + date.getDate();
      }
      let month = date.getMonth();
      if (date.getMonth() < 10) {
        month = "0" + (date.getMonth() + 1);
      }
      let year = String(date.getFullYear()).substr(2);
      let hour = date.getHours();
      if (date.getHours() < 10) {
        hour = "0" + date.getHours();
      }
      let minut = date.getMinutes();
      if (date.getMinutes() < 10) {
        minut = "0" + date.getMinutes();
      }
      let sec = date.getSeconds();
      if (date.getSeconds() < 10) {
        sec = "0" + date.getDate();
      }
      day =
        day + "." + month + "." + year + " " + hour + ":" + minut + ":" + sec;
      return day;
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
  },
};
</script>