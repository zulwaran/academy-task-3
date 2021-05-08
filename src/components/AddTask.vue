<template>
  <form @submit.prevent="addTask(text, check)" class="tasks__add">
    <input type="text" v-model="text" placeholder="Введите дело" />
    <div class="checkbox">
      <input type="checkbox" id="taskCheck" v-model="check" />
      <label for="taskCheck">Срочное</label>
    </div>
    <button>Добавить дело</button>
  </form>
</template>


<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { db } from "../firebase";
export default {
  name: "AddTask",
  data() {
    return {
      text: "",
      check: false,
    };
  },
  methods: {
    //Увеличиваем счетчик задач у выбранного списка дел
    async listIncrement() {
      const listsRef = await db.collection("lists");
      const snapshot = await listsRef
        .where("id", "==", this.$store.state.currentList.id)
        .get();
      await snapshot.forEach((doc) => {
        const incListId = doc.id;
        var icrementList = db.collection("lists").doc(incListId);
        icrementList.update({
          count_tasks: firebase.firestore.FieldValue.increment(1),
        });
        for (let list in this.$store.state.lists) {
          if (
            this.$store.state.lists[list].id ===
            this.$store.state.currentList.id
          ) {
            this.$store.state.lists[list].count_tasks += 1;
          }
        }
      });
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

    //Добавляем новую задачу в список дел
    async addTask(text, check) {
      if (!this.text) {
        alert("Введите название задачи");
        return;
      }

      const newTask = {
        id: Math.floor(Math.random() * 100000),
        name: text,
        listId: this.$store.state.currentList.id,
        executor_user_id: this.$store.state.uid,
        is_completed: false,
        description: null,
        urgency: check,
        created_at: this.data(),
        updated_at: this.data(),
      };

      await db
        .collection("tasks")
        .doc()
        .set({
          id: newTask.id,
          name: newTask.name,
          listId: newTask.listId,
          executor_user_id: newTask.executor_user_id,
          is_completed: newTask.is_completed,
          description: newTask.description,
          urgency: newTask.urgency,
          created_at: newTask.created_at,
          updated_at: newTask.updated_at,
        })
        .then(() => {
          this.$store.state.tasks = [...this.$store.state.tasks, newTask];
          this.$store.state.currentTasks = [
            ...this.$store.state.currentTasks,
            newTask,
          ];
        });
      this.text = "";
      this.check = false;

      await this.listIncrement();
      this.listStatus();
      this.updateList();
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

    //Задаем время последнего обновления информации содержащейся в списке
    async updateList() {
      const taskRef = await db.collection("lists");
      const snapshot = await taskRef
        .where("id", "==", this.$store.state.currentList.id)
        .get();
      snapshot.forEach((doc) => {
        const listUpdate = db.collection("lists").doc(doc.id);
        listUpdate.update({
          updated_at: this.data(),
        });
      });
    },
  },
};
</script>