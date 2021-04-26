<template>
  <div class="item">
    {{ list.text }}
    <i @click="onDelete(list.id)" class="fas fa-times"></i>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    list: Object,
  },
  methods: {
    onDelete(id) {
      this.$emit("delete-list", id);
    },
  },
};
</script>