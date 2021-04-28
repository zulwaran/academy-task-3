<template>
  <select v-model="selectedOption" @change="filterLists">
    <option value="all">Все</option>
    <option value="done">Исполненные</option>
    <option value="works">Не исполненные</option>
  </select>
</template>


<script>
export default {
  name: "FilterList",
  data() {
    return {
      selectedOption: "done",
    };
  },
/*   beforeMount() {
    this.$store.commit("LIST_FILTER", this.selectedOption);
  }, */
  methods: {
    filterLists() {
      this.$store.commit("LIST_FILTER", this.selectedOption);
    },
  },
};
</script>