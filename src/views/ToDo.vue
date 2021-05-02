<template>
  <section class="container">
    <div class="todolist">
      <ListBlock :lists="$store.state.visibleLists" />
      <TaskBlock
        :currentTasks="$store.state.currentTasks"
        :currentList="$store.state.currentList"
      />
    </div>
  </section>
</template>

<script>
import ListBlock from "../components/ListBlock";
import TaskBlock from "../components/TasksBlock";
import { mapActions } from "vuex";
export default {
  name: "ToDo",
  components: {
    ListBlock,
    TaskBlock,
  },
  methods: {
    ...mapActions(["fetchLists"]),
  },
  async created() {
    this.fetchLists();
  },
};
</script>