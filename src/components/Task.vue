<template>
  <input
    type="checkbox"
    @click="taskCompleted(task.id, task.listId)"
    :checked="task.completed"
  />
  <div class="task">
    <i :class="[task.urgently ? 'fas fa-circle' : '']"></i>
    <div class="text">{{ task.title }}</div>
    <div class="data">{{ task.day }}</div>
    <i @click="onDelete(task.id)" class="fas fa-times"></i>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: {
    task: Object,
  },
  methods: {
    async onDelete(id) {
      if (confirm("Вы действительно хотите удалить задачу?")) {
        const ref = await fetch(process.env.VUE_APP_URL + `/tasks/${id}`, {
          method: "DELETE",
        });
        if (ref.status === 200) {
          this.$store.state.tasks = this.$store.state.tasks.filter(
            (task) => task.id !== id
          );
          this.$store.state.currentTasks = this.$store.state.currentTasks.filter(
            (task) => task.id !== id
          );
        } else {
          alert("Error");
        }
      }
      const currentId = this.$store.state.currentList.id;
      const list = await fetch(process.env.VUE_APP_URL + `/lists/${currentId}`);
      const dataList = await list.json();
      const updList = { ...dataList, count_tasks: dataList.count_tasks - 1 };
      const res = await fetch(process.env.VUE_APP_URL + `/lists/${currentId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updList),
      });
      const data = await res.json();
      this.$store.state.lists = this.$store.state.lists.map((list) =>
        list.id === data.id ? { ...list, count_tasks: data.count_tasks } : list
      );
      this.$store.state.visibleLists = this.$store.state.visibleLists.map(
        (list) =>
          list.id === data.id
            ? { ...list, count_tasks: data.count_tasks }
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
        if (this.$store.state.visibleLists[list].count_tasks === 0) {
          this.$store.state.visibleLists[list].color = "white";
        } else if (this.$store.state.visibleLists[list].count_tasks === count) {
          this.$store.state.visibleLists[list].color = "gray";
        } else {
          this.$store.state.visibleLists[list].color = "green";
        }
      }
      return data;
    },

    async taskCompleted(id) {
      const task = await fetch(process.env.VUE_APP_URL + `/tasks/${id}`);
      const dataTask = await task.json();
      const updTask = { ...dataTask, completed: !dataTask.completed };
      const res = await fetch(process.env.VUE_APP_URL + `/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(updTask),
      });
      const data = await res.json();
      this.$store.state.tasks = this.$store.state.tasks.map((task) =>
        task.id === data.id ? { ...task, completed: !task.completed } : task
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