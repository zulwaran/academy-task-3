<template>
  <router-view></router-view>
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "App",
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace("/login");
        } else if (route.path == "/login" || route.path == "/register") {
          router.replace("/");
        }
      });
    });
  },
};
</script>



<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  max-width: 1920px;
  min-width: 320px;
}
.todo-nav {
  max-width: 700px;
  margin: 0 auto 20px;
  display: flex;
  justify-content: center;
}
.todolist {
  display: flex;
  position: relative;
  justify-content: center;
}
.todo-nav button {
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  font-weight: bold;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#acd6ef),
    to(#6ec2e8)
  );
  border-radius: 30px;
  border: 1px solid #66add6;
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%), inset 0 1px 0 rgb(255 255 255 / 50%);
  padding: 3px 25px;
  outline: none;
}

.lists {
  border: 1px solid #000;
}
.lists__filter {
  text-align: center;
  border-bottom: 1px solid #000;
  padding: 10px;
}
.lists__filter select {
  padding: 5px;
  text-align: center;
  text-align-last: center;
}
.lists__items {
  text-align: center;
  border-top: none;
  margin: 0 auto;
  padding: 20px 10px;
}
.lists__item {
  padding: 10px;
  border: 1px solid black;
  margin-bottom: 20px;
  position: relative;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.lists__item .text {
  overflow-wrap: anywhere;
  max-width: 180px;
  margin-right: 15px;
}

.lists__item i {
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.lists__add {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-top: 1px solid #000;
}
.lists__add input[type="text"] {
  padding: 5px 5px;
  margin-bottom: 5px;
  outline: none;
}
.lists__add button {
  padding: 5px;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  font-weight: bold;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#acd6ef),
    to(#6ec2e8)
  );
  border-radius: 30px;
  border: 1px solid #66add6;
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%), inset 0 1px 0 rgb(255 255 255 / 50%);
  outline: none;
}

.green {
  background: #4ab54a70;
}
.gray {
  background: #7564644d;
}
.white {
  background: inherit;
}

.tasks {
  padding: 10px;
  min-width: 530px;
  margin-left: 10px;
  border: 1px solid #000;
}
.tasks__title {
  text-align: center;
  margin-top: 5px;
  margin-bottom: 20px;
}
.tasks__items {
  min-height: 158px;
}
.tasks__item {
  display: flex;
  margin-bottom: 25px;
}
.task {
  display: flex;
  border: 1px solid black;
  padding: 10px;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
}
.task .text {
  width: 300px;
  overflow-wrap: anywhere;
}
.task .data {
  margin-left: 10px;
}
.fa-circle:before {
  content: "\f111";
  margin-right: 15px;
}
.fa-times:before {
  margin-left: 10px;
  content: "\f00d";
  cursor: pointer;
}
.tasks__item input {
  align-self: center;
  margin-right: 10px;
}
.fas {
  color: red;
}
.tasks__add {
  display: flex;
  align-items: center;
  border-top: 1px solid #000;
  padding-top: 10px;
  justify-content: center;
}
.tasks__add input[type="text"] {
  margin-right: 10px;
  padding: 5px 5px;
  outline: none;
}
.tasks__add input[type="checkbox"] {
  margin-right: 10px;
}
.tasks__add button {
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #fff;
  font-weight: bold;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#acd6ef),
    to(#6ec2e8)
  );
  border-radius: 30px;
  border: 1px solid #66add6;
  box-shadow: 0 1px 2px rgb(0 0 0 / 30%), inset 0 1px 0 rgb(255 255 255 / 50%);
  outline: none;
}
.checkbox {
  margin-right: 10px;
}
</style>