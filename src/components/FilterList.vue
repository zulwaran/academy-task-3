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
  methods: {
    async filterLists() {
      await this.$store.commit("FILTER_OPTION", this.selectedOption);
      await this.$store.commit("LIST_FILTER", this.selectedOption);
      this.$store.commit("COLOR_LIST");
    },
  },
};
</script>