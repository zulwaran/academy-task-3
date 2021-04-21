<template>
  <div class="list">
    <div class="list__filter">
      <select>
        <option value="all">all</option>
        <option value="done">done</option>
        <option value="works">works</option>
      </select>
    </div>
    <div class="list__items" :key="list.id" v-for="list in lists">
      <div>{{ list.text }}</div>
    </div>
    <div class="list__add">
      <input type="text" />
      <Button @click="cns()" text="Добавить список" />
    </div>
  </div>
</template>

<script>
import Button from "./Button";
export default {
  name: "ListBlock",
  components: {
    Button,
  },
  methods: {
    cns() {
      console.log(this.task);
    },
  },
  data() {
    return {
      lists: [],
      task: [],
    };
  },
  created() {
    this.lists = [
      {
        id: 1,
        text: "List 1",
        task: [
          { id: 1, text: "Doctor", day: "1 march", reminder: true },
          { id: 2, text: "Teacher", day: "2 march", reminder: true },
          { id: 3, text: "Shopping", day: "3 march", reminder: true },
        ],
      },
      {
        id: 2,
        text: "List 2",
      },
      {
        id: 3,
        text: "List 3",
      },
      {
        id: 4,
        text: "List 4",
      },
    ];
  },
};
</script>