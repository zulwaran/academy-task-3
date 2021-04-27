<template>
  <form @submit.prevent="addTask" class="tasks__add">
    <input type="text" v-model="text" placeholder="Введите дело" />
    <div class="checkbox">
      <input type="checkbox" id="taskCheck" v-model="check" />
      <label for="taskCheck">Срочное</label>
    </div>
    <button>Добавить дело</button>
  </form>
</template>


<script>
export default {
  name: "AddTask",
  props: {
  },
  data() {
    return {
      text: "",
      check: false,
    };
  },
  methods: {
    addTask() {
      this.$store.commit("ADD_TASK", {
        text: this.text,
        check: this.check,
      });
      this.text = "";
      this.check = false;
    },
  },
};
</script>