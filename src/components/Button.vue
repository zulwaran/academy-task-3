<template>
  <button @click="onClick()">{{ text }}</button>
</template>


<script>
export default {
  name: "Button",
  props: {
    text: String,
  },
  methods: {
    onClick() {console.log('click')},
  },
};
</script>