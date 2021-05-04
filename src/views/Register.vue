<template>
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
</template>

<script>
import { ref } from "vue";
import firebase from "firebase";
import {createUser} from '../firebase'

export default {
  setup() {
    const email = ref("");
    const password = ref("");

    const Register = () => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((data) => {
          const form = {
            name: data.user.email,
            uid: data.user.uid
          }

          createUser({...form}
          )
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
.register {
  width: 800px;
  padding: 10px;
  margin: 0 auto;
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
}
.register button {
  padding: 5px 25px;
}
</style>