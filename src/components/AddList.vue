<template>
  <form @submit.prevent="addList(text)" class="lists__add">
    <input type="text" v-model="text" placeholder="Введите дело" />
    <button>Добавить список</button>
  </form>
</template>


<script>
import "firebase/firestore";
import { db } from "../firebase";
export default {
  name: "AddList",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    //Добавляем новый список дел
    async addList(text) {
      if (!text) {
        alert("Введите название списка");
        return;
      }

      const newList = {
        id: Math.floor(Math.random() * 100000),
        name: text,
        count_tasks: 0,
        is_completed: false,
        is_closed: false,
        created_at: this.data(),
        updated_at: this.data(),
        uid: this.$store.state.uid,
        color: "",
      };

      await db
        .collection("lists")
        .doc()
        .set({
          name: newList.name,
          id: newList.id,
          uid: newList.uid,
          count_tasks: newList.count_tasks,
          color: newList.color,
          is_completed: newList.is_completed,
          is_closed: newList.is_closed,
          created_at: newList.created_at,
          updated_at: newList.updated_at,
        })
        .then(() => {
          this.$store.state.lists = [...this.$store.state.lists, newList];
          this.$store.state.lists.sort((a, b) => a.name.localeCompare(b.name));
        });
      this.text = "";
      this.filter();
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

    //Осуществляем фильтрацию и вывод на экран нового списка дел
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
