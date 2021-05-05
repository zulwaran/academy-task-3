<template>
  <div class="container">
    <div class="login">
      <h1>Авторизация</h1>
      <form class="login__inner" @submit.prevent="Login">
        <label>Email</label>
        <input type="email" placeholder="Email" v-model="email" />
        <label>Password</label>
        <input type="password" placeholder="Password" v-model="password" />
        <button type="submit" value="Login">Вход</button>
        <p>Нет аккаунта?</p>
        <router-link to="/register">Регистрация</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  setup() {
    const email = ref("");
    const password = ref("");

    //Авторизация пользователя
    const Login = () => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then((data) => data)
        .catch((err) => alert(err.message));
    };
    return {
      Login,
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
.login {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  display: inline-block;
  box-shadow: 0 1px 2px rgb(0 0 0 / 10%);
}
.login__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.login h1 {
  margin-bottom: 20px;
  text-align: center;
}
.login label {
  margin-bottom: 5px;
}
.login input {
  margin-bottom: 10px;
  padding: 5px 10px;
  outline: none;
}
.login button {
  margin-top: 20px;
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
  padding: 3px 30px;
  outline: none;
}
.login p {
  margin-top: 10px;
  margin-bottom: 0;
}
</style>