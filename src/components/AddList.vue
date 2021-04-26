<template>
  <form @submit.prevent="addList" class="lists__add">
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
    addList() {
      if (!this.text) {
        alert("Введите название списка");
        return;
      }

      const newList = {
        id: Math.floor(Math.random() * 100000),
        text: this.text,
      };

      (this.text = ""), this.$emit("add-list", newList);
    },
  },
};
</script>