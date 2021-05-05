<template>
  <div class="container">
    <div class="register">
      <h1>Регистрация</h1>
      <form class="register__inner" @submit.prevent="Register">
        <label>Email</label>
        <input type="email" placeholder="Email" v-model="email" />
        <label>Password</label>
        <input type="password" placeholder="Password" v-model="password" />
        <button type="submit" value="Register">Регистрация</button>
        <p>
          <router-link to="/login">Назад</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/app";
import "firebase/auth";
import { createUser } from "../firebase";

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    //Регистрация нового пользователя
    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((data) => {
          const form = {
            name: data.user.email,
            uid: data.user.uid,
          };
          createUser({ ...form });
        })
        .catch((err) => alert(err.message));
    };
    return {
      Register,
      email,
      password,
    };
  },
};
</script>

<style scoped>
.container {
  margin-top: 20px;
  text-align: center;
}
.register {
  padding: 10px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: inline-block;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
}
.register__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.register h1 {
  margin-bottom: 20px;
  text-align: center;
}
.register label {
  margin-bottom: 5px;
}
.register input {
  margin-bottom: 10px;
  padding: 5px 10px;
  outline: none;
}
.register button {
  margin-top: 20px;
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
</style>