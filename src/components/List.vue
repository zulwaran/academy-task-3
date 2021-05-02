<template>
    <div class="text">{{ list.text }}</div>
    <i @click="onDelete(list.id)" class="fas fa-times"></i>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "List",
  props: {
    list: Object,
  },
  methods: {
    ...mapActions(["DELETE_LIST"]),
    onDelete(id) {
      this.DELETE_LIST(id);
      this.$store.commit("LIST_FILTER", this.$store.selectedOption);
    },
  },
};
</script>