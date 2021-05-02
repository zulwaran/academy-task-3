<template>
  <div class="lists">
    <div class="lists__filter">
      <FilterList />
    </div>
    <div class="lists__items">
      <div
        :class="['lists__item', list.color]"
        :key="list.id"
        v-for="list in lists"
        @dblclick="getList(list)"
      >
        <List :list="list" />
      </div>
    </div>

    <AddList />
  </div>
</template>

<script>
import FilterList from "./FilterList";
import List from "./List";
import AddList from "./AddList";
export default {
  name: "ListBlock",
  props: {
    lists: Object,
  },
  components: {
    FilterList,
    List,
    AddList,
  },
  methods: {
    getList(list) {
      this.$store.commit("GET_CURRENT_LIST", list);
    },
  },
};
</script>

<style scoped>

</style>