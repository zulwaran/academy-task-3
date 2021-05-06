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
    <button @click="aaa">ЖМИ</button>
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
    async aaa() {
      /*       console.log(getLists); */
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
    const citiesRef = await db.collection("lists");
    const snapshot = await citiesRef
      .where("uid", "==", this.$store.state.uid)
      .get();
    await snapshot.forEach((doc) => {
      let x = doc.data();
      console.log(x);
      this.$store.state.lists.push(x);
    });
    this.$store.state.lists.sort((a, b) => a.name.localeCompare(b.name));
    this.$store.state.visibleLists = this.$store.state.lists;

    /*     //Получаем из БД данные о списках дел
    const resList = await fetch("http://localhost:5000/lists", {
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    const dataList = await resList.json();
    this.$store.state.lists = dataList.filter(
      (list) => list.uid === this.$store.state.uid
    );
    
    this.$store.state.visibleLists = this.$store.state.lists;

    //Получаем из БД данные о задачах
    const resTasks = await fetch("http://localhost:5000/tasks", {
      "Content-Type": "application/json",
      Accept: "application/json",
    });
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
    } */
  },

  mounted() {
    if (localStorage.uid) {
      this.$store.state.uid = localStorage.uid;
      this.name = localStorage.name;
    }
  },
};
</script>