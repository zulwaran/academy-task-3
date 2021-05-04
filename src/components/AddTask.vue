<template>
  <form @submit.prevent="addTask(text, check)" class="tasks__add">
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
  data() {
    return {
      text: "",
      check: false,
    };
  },
  methods: {
    //Добавляем новую задачу в список задач
    async addTask(text, check) {
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
      day = day + "." + month + "." + year + " " + hour + ":" + minut;
      const newTask = {
        listId: this.$store.state.currentList.id,
        title: text,
        day: day,
        urgently: check,
        completed: false,
      };
      const resTask = await fetch(process.env.VUE_APP_URL+"/tasks", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      const dataTask = await resTask.json();
      this.$store.state.tasks = [...this.$store.state.tasks, dataTask];
      this.$store.state.currentTasks = [
        ...this.$store.state.currentTasks,
        dataTask,
      ];
      this.text = "";
      this.check = false;

      // Увеличиваем количество задач в текущем списке
      const id = this.$store.state.currentList.id;
      const list = await fetch(process.env.VUE_APP_URL+`/lists/${id}`);
      const dataList = await list.json();
      const updList = { ...dataList, count_tasks: dataList.count_tasks + 1 };
      const putList = await fetch(process.env.VUE_APP_URL+`/lists/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updList),
      });
      const dataInc = await putList.json();
      this.$store.state.lists = this.$store.state.lists.map((list) =>
        list.id === dataInc.id
          ? { ...list, count_tasks: dataInc.count_tasks }
          : list
      );
      this.$store.state.visibleLists = this.$store.state.visibleLists.map(
        (list) =>
          list.id === dataInc.id
            ? { ...list, count_tasks: dataInc.count_tasks }
            : list
      );

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
        //Обновляем статус списков дел
        if (this.$store.state.visibleLists[list].count_tasks === 0) {
          this.$store.state.visibleLists[list].color = "white";
        } else if (this.$store.state.visibleLists[list].count_tasks === count) {
          this.$store.state.visibleLists[list].color = "gray";
        } else {
          this.$store.state.visibleLists[list].color = "green";
        }
      }
    },
  },
};
</script>