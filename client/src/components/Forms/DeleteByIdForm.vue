<script setup>
import {ref} from 'vue';
import { useStudentsStore } from '../../stores/students.js';

const id = ref('');

const store = useStudentsStore();

const sendRequest = () => {
    store.deleteSudent(id.value);
}

</script>

<template>
    <form>
        <label>ID</label>
        <input v-model="id" placeholder=""/>
    </form>
    <button class="send-btn" @click="sendRequest">Send request</button>
    <div class="result" v-if="store.managedToDeleteStudent != 'pending'">
        <div class="success" v-if="store.managedToDeleteStudent == 'fulfilled'"><p>Deleted</p></div>
        <div class="fail" v-if="store.managedToDeleteStudent == 'rejected'">Failed to delete</div>
    </div>
</template>

<style scoped>
input {
    margin-right: 20px;
    border-radius: 5px;
    border: 1px solid gray;
    padding: 3px;
}
label {
    margin-right: 5px;
}
select {
    padding: 3px;
    border-radius: 5px;
}
.send-btn {
    background: #d9effe;
    border: 1px solid #5075ff;
    border-radius: 5px;
    padding: 5px 10px;
    margin-top: 10px;
    cursor: pointer;
}
.result {
    height: 100px;
    margin-top: 20px;
    padding: 20px;
}
.success {
    width: 300px;
    height: 50px;
    background-color: #5bff2f;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.fail {
    width: 300px;
    height: 50px;
    background-color: #f74444;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}
p {
    font-weight: 600;
}
</style>
