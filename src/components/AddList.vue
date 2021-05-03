<template>
  <form @submit.prevent="addList(text)" class="lists__add">
    <input type="text" v-model="text" placeholder="Введите дело" />
    <button>Добавить список</button>
  </form>
</template>


<script>
export default {
  name: "AddList",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    //Добавляем новый список задач
    async addList(text) {
      if (!text) {
        alert("Введите название списка");
        return;
      }
      const newList = {
        text: text,
        count_tasks: 0,
      };

      const res = await fetch("http://localhost:5000/lists", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newList),
      });
      const data = await res.json();
      this.$store.state.lists = [...this.$store.state.lists, data];
      this.$store.state.lists.sort((a, b) => a.text.localeCompare(b.text));
      this.$store.state.visibleLists = this.$store.state.lists;

      this.text = "";
      
      //Осуществляем фильтрацию и вывод на экран нового списка
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
