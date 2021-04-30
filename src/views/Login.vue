<template>
  <div class="login">
    <form class="login__inner" @submit.prevent="login">
      <h1>Sign in</h1>
      <label>Email</label>
      <input required v-model="email" type="email" placeholder="Name" />
      <label>Password</label>
      <input
        required
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <router-link to="/ToDo"><button type="submit">Login</button></router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
};
</script>

<style scoped>
.login {
  width: 800px;
  padding: 10px;
  margin: 0 auto;
}
.login__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.login h1 {
  margin-bottom: 20px;
}
.login label {
  margin-bottom: 5px;
}
.login input {
  margin-bottom: 10px;
  padding: 5px 10px;
}
.login button{
  padding: 5px 25px;
}
</style>