<template>
  <section class="container">
    <div class="todo-nav">
      <h1>Привет, {{ name }}</h1>
      <button class="logout" @click="Logout">Logout</button>
    </div>
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
import { onBeforeMount } from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../firebase";

export default {
  name: "ToDo",
  components: {
    ListBlock,
    TaskBlock,
  },
  methods: {
    //Получаем из БД списки дел
    async getLists() {
      this.$store.state.lists = [];
      let listsRef = await db.collection("lists");
      let snapshot = await listsRef
        .where("uid", "==", this.$store.state.uid)
        .get();
      await snapshot.forEach((doc) => {
        let docList = doc.data();
        this.$store.state.lists.push(docList);
      });
      this.$store.state.lists.sort((a, b) => a.name.localeCompare(b.name));
      this.$store.state.visibleLists = await this.$store.state.lists;
    },

    //Получаем из БД задачи для списков дел
    async getTasks() {
      this.$store.state.tasks = [];
      let tasksRef = await db.collection("tasks").orderBy("day");
      let snapshot = await tasksRef.get();
      await snapshot.forEach((doc) => {
        let docTask = doc.data();
        this.$store.state.tasks.push(docTask);
      });
      this.$store.state.visibleTasks = await this.$store.state.tasks;
    },

    //Фильтрация списков дел
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

    //Статус завершенности списков дел
    async listStatus() {
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
  },

  data() {
    return {
      name: "",
    };
  },
  setup() {
    //После авторизации записываем в локальное хранилище имя и uid пользователя
    onBeforeMount(() => {
      const user = firebase.auth().currentUser;
      if (user) {
        localStorage.name = user.email.split("@")[0];
        localStorage.uid = user.uid;
      }
    });

    //Выход с аккаунта
    const Logout = () => {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("Sign Out"))
        .catch((err) => alert(err.message));
    };
    return {
      Logout,
    };
  },
  async beforeMount() {
    await this.getLists();
    await this.getTasks();
    await this.filter();
    await this.listStatus();
  },

  async mounted() {
    this.listStatus();
    if (localStorage.uid) {
      this.$store.state.uid = localStorage.uid;
      this.name = localStorage.name;
    }
  },
  async beforeUnmount() {
    this.$store.state.visibleLists = [];
    this.$store.state.currentTasks = [];
    this.$store.state.showAddTask = false;
    this.$store.state.showListName = false;
    this.$store.state.showTasks = false;
  },
};
</script>