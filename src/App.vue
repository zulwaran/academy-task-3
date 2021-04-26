<template>
  <section class="container">
    <div class="todolist">
      <ListBlock
        @get-list="getList"
        @add-list="addList"
        @delete-list="deleteList"
        @get-value="getValue"
        :filterList="filterList"
      />
      <TaskBlock
        :listTasks="listTasks"
        :list="list"
        @delete-task="deleteTask"
        @add-task="addTask"
      />
    </div>
    <button @click="aaa">SELECT</button>
  </section>
</template>

<script>
import ListBlock from "./components/ListBlock";
import TaskBlock from "./components/TasksBlock";
export default {
  name: "App",
  components: {
    ListBlock,
    TaskBlock,
  },
  props: {},
  methods: {
    addList(newList) {
      this.lists = [...this.lists, newList];
      alert("Список дел " + newList.text + " добавлен");
    },
    addTask(newTask) {
      this.listTasks = [...this.listTasks, newTask];
      alert(newTask.title + " добавлено в " + this.list.text);
    },
    deleteList(id) {
      if (confirm("Вы действительно хотите удалить список?")) {
        this.lists = this.lists.filter((list) => list.id !== id);
      }
    },
    deleteTask(id) {
      if (confirm("Вы действительно хотите удалить задачу?")) {
        this.listTasks = this.listTasks.filter((task) => task.id !== id);
      }
    },
    getList(list) {
      this.list = list;
      this.listTasks = this.tasks.filter(function (task) {
        return task.listId === list.id;
      });
    },
    getValue(selectedOption) {
      let t = this.tasks;
      switch (selectedOption) {
        case "all":
          this.filterList = this.lists;
          console.log(this.filterList);
          break;
        case "done":
          this.filterList = this.lists.filter(function (list) {
            var count = 0;
            for (let task in t) {
              if (t[task].listId === list.id && t[task].completed === false) {
                count += 1;
              }
            }
            if (count === 0) {
              return true;
            } else {
              return false;
            }
          });
          console.log(this.filterList);
          break;
        case "works":
          this.filterList = this.lists.filter(function (list) {
            var count = 0;
            for (let task in t) {
              if (t[task].listId === list.id && t[task].completed === false) {
                count += 1;
              }
            }
            if (count > 0) {
              return true;
            } else {
              return false;
            }
          });
          console.log(this.filterList);
          break;
      }
    },
    aaa() {
      console.log(this.listTasks);
    },
  },
  data() {
    return {
      lists: [],
      tasks: [],
      filterList: [],
      list: [],
      listTasks: [],
    };
  },
  created() {
    this.lists = [
      {
        id: 1,
        text: "Список 1",
      },
      {
        id: 2,
        text: "Список 2",
      },
      {
        id: 3,
        text: "Список 3",
      },
      {
        id: 4,
        text: "Список 4",
      },
      {
        id: 5,
        text: "Список 5",
      },
    ];

    this.tasks = [
      {
        listId: 1,
        id: 1,
        title: "delectus aut autem",
        day: "14.08.21 14:37",
        urgently: true,
        completed: false,
      },
      {
        listId: 1,
        id: 2,
        title: "quis ut nam facilis et officia qui",
        day: "14.08.21 14:37",
        urgently: false,
        completed: false,
      },
      {
        listId: 1,
        id: 3,
        title: "fugiat veniam minus",
        day: "14.08.21 14:37",
        urgently: true,
        completed: false,
      },
      {
        listId: 1,
        id: 4,
        title: "et porro tempora",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 2,
        id: 5,
        title:
          "laboriosam mollitia et enim quasi adipisci quia provident illum",
        day: "14.08.21 14:37",
        urgently: true,
        completed: false,
      },
      {
        listId: 2,
        id: 6,
        title: "qui ullam ratione quibusdam voluptatem quia omnis",
        day: "14.08.21 14:37",
        urgently: true,
        completed: false,
      },
      {
        listId: 2,
        id: 7,
        title: "illo expedita consequatur quia in",
        day: "14.08.21 14:37",
        urgently: true,
        completed: false,
      },
      {
        listId: 2,
        id: 8,
        title: "quo adipisci enim quam ut ab",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 3,
        id: 9,
        title: "molestiae perspiciatis ipsa",
        day: "14.08.21 14:37",
        urgently: true,
        completed: false,
      },
      {
        listId: 3,
        id: 10,
        title: "illo est ratione doloremque quia maiores aut",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 3,
        id: 11,
        title: "vero rerum temporibus dolor",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 3,
        id: 12,
        title: "ipsa repellendus fugit nisi",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 4,
        id: 13,
        title: "et doloremque nulla",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 4,
        id: 14,
        title: "repellendus sunt dolores architecto voluptatum",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 4,
        id: 15,
        title: "ab voluptatum amet voluptas",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 4,
        id: 16,
        title: "accusamus eos facilis sint et aut voluptatem",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
      {
        listId: 4,
        id: 17,
        title: "quo laboriosam deleniti aut qui",
        day: "14.08.21 14:37",
        urgently: true,
        completed: true,
      },
    ];
  },
};
</script>



<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  max-width: 1920px;
  min-width: 320px;
}
.container {
  justify-content: center;
  display: flex;
  position: relative;
  padding: 10px;
}
.green {
  background: green;
}
.gray {
  background: grey;
}
.todolist {
  display: flex;
  position: relative;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
}
.lists {
  border-left: 1px solid #000;
  border-right: 1px solid #000;
}
.lists__filter {
  text-align: center;
  border-bottom: 1px solid #000;
  padding: 10px;
}
.lists__filter select {
  padding: 5px;
  text-align: center;
  text-align-last: center;
}
.lists__items {
  text-align: center;
  border-top: none;
  margin: 0 auto;
  padding: 20px 0 0;
  width: 94%;
}
.lists__add {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-top: 1px solid #000;
}
.lists__add input[type="text"] {
  padding: 5px 5px;
  margin-bottom: 5px;
  outline: none;
}
.lists__add button {
  padding: 5px;
  cursor: pointer;
}
.lists__item {
  padding: 10px;
  border: 1px solid black;
  margin-bottom: 20px;
  position: relative;
}
.lists__item i {
  position: absolute;
  right: 10px;
  cursor: pointer;
}

.tasks {
  padding: 10px;
  margin-left: 10px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
}
.tasks__title {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 20px;
}
.tasks__items {
  margin-bottom: 10px;
}
.tasks__item {
  display: flex;
  margin-bottom: 25px;
}
.task {
  display: flex;
  border: 1px solid black;
  padding: 10px;
  width: 100%;
  justify-content: space-between;
}
.fa-circle:before {
  content: "\f111";
  position: absolute;
}
.fa-times:before {
  content: "\f00d";
  cursor: pointer;
}
.tasks__item input {
  align-self: center;
  margin-right: 10px;
}
.fas {
  color: red;
}
.tasks__add {
  display: flex;
  align-items: center;
  border-top: 1px solid #000;
  padding-top: 10px;
}
.tasks__add input[type="text"] {
  margin-right: 10px;
  padding: 5px 5px;
  outline: none;
}
.tasks__add input[type="checkbox"] {
  margin-right: 10px;
}
.tasks__add button {
  padding: 5px;
  cursor: pointer;
}
.checkbox {
  margin-right: 10px;
}
</style>