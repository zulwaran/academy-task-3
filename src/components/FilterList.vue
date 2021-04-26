<template>
  <select v-model="selectedOption" @change="getValue">
    <option value="all">Все</option>
    <option value="done">Исполненные</option>
    <option value="works">Не исполненные</option>
  </select>
</template>


<script>
export default {
  name: "FilterList",
  methods: {
    getValue() {
      /* console.log(this.selectedOption); */
      this.$emit("get-value", this.selectedOption)
    },
  },
  data() {
    return {
      selectedOption: "done",
    };
  },
};
</script>