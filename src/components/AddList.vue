<template>
  <form @submit.prevent="addList" class="lists__add">
    <input type="text" v-model="text" placeholder="Введите дело" />
    <button>Добавить список</button>
  </form>
</template>


<script>
import { mapActions } from "vuex";
export default {
  name: "AddList",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    ...mapActions(["NEW_LIST"]),
    addList() {
      this.NEW_LIST(this.text);
      this.text = "";
    },
  },
};
</script>
