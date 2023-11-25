<script setup>
import {ref} from 'vue';
import { useStudentsStore } from '../../stores/students.js';
import {useUserStore} from '../../stores/user.js';


const firstname = ref('');
const lastname = ref('');
const group = ref(null);
const rate = ref(null);

const store = useStudentsStore();
const userStore = useUserStore();


const sendRequest = () => {
    store.postStudent(firstname.value, lastname.value, group.value, rate.value, userStore.token);
}

</script>

<template>
    <form>
        <label>First name</label>
        <input v-model="firstname"/>
        <label>Last name</label>
        <input v-model="lastname"/>
        <label>Group</label>
        <input v-model="group"/>
        <label>Rate</label>
        <input v-model="rate"/>
        
    </form>
    <button class="send-btn" @click="sendRequest">Send request</button>
    <div class="result" v-if="store.managedToPostStudent != 'pending'">
        <div class="success" v-if="store.managedToPostStudent == 'fulfilled'"><p>Created</p></div>
        <div class="fail" v-if="store.managedToPostStudent == 'rejected'">Failed to create</div>
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
