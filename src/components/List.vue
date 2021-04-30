<template>
    <div class="text">{{ list.text }}</div>
    <i @click="onDelete(list.id)" class="fas fa-times"></i>
</template>

<script>
export default {
  name: "List",
  props: {
    list: Object,
  },
  methods: {
    onDelete(id) {
      this.$store.commit("DELETE_LIST", id)
    },
  },
};
</script>