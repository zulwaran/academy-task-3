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
        uid: this.$store.state.uid,
        name: text,
        count_tasks: 0,
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
        })
        .then(() => {
          this.$store.state.lists = [...this.$store.state.lists, newList];
          this.$store.state.lists.sort((a, b) => a.name.localeCompare(b.name));
        });
      this.text = "";
      this.filter()
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
