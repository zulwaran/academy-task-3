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
    list: Object,
  },
  data() {
    return {
      text: "",
      check: false,
    };
  },
  methods: {
    addTask() {
      if (!this.text) {
        alert("Введите название задачи");
        return;
      }
      let date = new Date();
      let day = date.getDate();
      if (date.getDate() < 10) {
        day = "0" + date.getDate();
      }
      let month = date.getMonth();
      if (date.getMonth() < 10) {
        month = "0" + (date.getMonth()+1);
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
      day = day + "." + month + "." + year + " " + hour + ":" + minut;
      
      const newTask = {
        listId: this.list.id,
        id: Math.floor(Math.random() * 100000),
        title: this.text,
        day: day,
        urgently: this.check, 
        completed: false,
      };

      console.log(newTask);

      (this.text = "")
      this.$emit("add-task", newTask);
    },
  },
};
</script>