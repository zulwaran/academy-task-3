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
      this.$store.commit('ADD_LIST', this.text)
      this.text = "";
    },
  },
};
</script>
