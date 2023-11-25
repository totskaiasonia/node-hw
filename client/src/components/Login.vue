<script setup>

import {ref} from 'vue';

import {useUserStore} from '../stores/user.js';

const store = useUserStore();

const login = ref('admin');
const password = ref('admin');

const handleLogin = () => {
    store.login(login.value, password.value);
}
</script>

<template>
    <div class="login-wrapper">
        <form>
            <label>Username</label>
            <input v-model="login" placeholder="admin">
        </form>
        <form>
            <label>Password</label>
            <input v-model="password" placeholder="admin" type="password">
        </form>
        <button class="login-btn" @click="handleLogin">Log in</button>
    </div>
</template>

<style scoped>
.login-wrapper {
    width: 425px;
    background: rgb(237 237 237);
    border: 1px solid rgb(179, 179, 179);
    border-radius: 10px;
    padding: 10px 40px;
    margin: 0 auto;
}
input {
    border-radius: 5px;
    border: 1px solid gray;
    padding: 3px;
}
label {
    margin-right: 30px;
    width: 100px;
    display: inline-block;
}
form {
    margin-top: 20px;
}
.login-btn {
    background: transparent;
    border: 1px solid gray;
    padding: 3px 10px;
    border-radius: 3px;
    margin: 120px 0 30px 0;
    cursor: pointer;
}
</style>
