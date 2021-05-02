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
import { mapActions } from "vuex";
export default {
  name: "AddTask",
  data() {
    return {
      text: "",
      check: false,
    };
  },
  methods: {
    ...mapActions(["NEW_TASK", "INC_COUNT_TASKS"]),
    async addTask() {
      if (!this.text) {
        alert("Введите название задачи");
        return;
      }
      this.NEW_TASK({
        text: this.text,
        check: this.check,
      });
      this.text = "";
      this.check = false;
      this.INC_COUNT_TASKS();
    },
  },
};
</script>