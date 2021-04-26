<template>
  <div class="lists">
    <div class="lists__filter">
      <FilterList @get-value="getValue" />
    </div>
    <div class="lists__items">
      <div
        :class="['lists__item', filter]"
        :key="list.id"
        v-for="list in filterList"
        @dblclick="getList(list.id)"
      >
        <List @delete-list="$emit('delete-list', list.id)" :list="list" />
      </div>
    </div>

    <AddList @add-list="addList" />
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
    addList(newList) {
      this.$emit("add-list", newList);
    },
    getValue(selectedOption) {
      this.$emit("get-value", selectedOption);
    },
    getList(id) {
      for (let list in this.filterList) {
        if (this.filterList[list].id == id) {
          this.list = this.filterList[list];
          this.$emit("get-list", this.list);
        }
      }
    },
  },
  emits: ["delete-list", "add-list", "get-list", "get-value"],
};
</script>