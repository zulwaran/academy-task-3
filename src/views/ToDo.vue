<template>
  <section class="container">
    <div class="todolist">
      <ListBlock :visibleList="$store.state.lists" />
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
  props: {},
  computed: {},
  methods: {
    ...mapActions(["GET_LISTS_FROM_API", "GET_TASKS_FROM_API"]),
  },
  mounted() {
    this.GET_LISTS_FROM_API();
    this.GET_TASKS_FROM_API();
  },
  data() {
    return {};
  },
};
</script>