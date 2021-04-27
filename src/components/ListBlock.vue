<template>
  <div class="lists">
    <div class="lists__filter">
      <FilterList />
    </div>
    <div class="lists__items">
      <div
        :class="['lists__item', list.color]"
        :key="list.id"
        v-for="list in visibleList"
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
    visibleList: Object,
    filterList: Object,
  },
  components: {
    FilterList,
    List,
    AddList,
  },
  data() {
    return {
      filter: "",
    };
  },
  methods: {
    getList(list) {
      this.$store.commit("GET_CURRENT_LIST", list);
    },
  },
};
</script>