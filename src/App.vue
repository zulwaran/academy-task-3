<template>
  <section class="container">
    <div class="todolist">
      <ListBlock :visibleList="$store.state.visibleList" />
      <TaskBlock
        :currentTasks="$store.state.currentTasks"
        :currentList="$store.state.currentList"
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
    aaa() {
      this.$store.commit("COLOR_LIST");
    },
  },
  beforeMount() {
    this.$store.commit("COLOR_LIST");
  },
  data() {
    return {
      filterList: [],
      list: [],
      listTasks: [],
    };
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
.white {
  background: inherit;
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