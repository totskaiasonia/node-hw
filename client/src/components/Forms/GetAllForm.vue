<script setup>
import {ref} from 'vue';
import { useStudentsStore } from '../../stores/students.js';
import {useUserStore} from '../../stores/user.js';

const limit = ref(0);
const offset = ref(0);
const sort = ref("");

const store = useStudentsStore();
const userStore = useUserStore();

const sendRequest = () => {
    store.getStudents(limit.value, offset.value, sort.value, userStore.token);
}

</script>

<template>
    <form>
        <label>Limit</label>
        <input v-model="limit" placeholder="0" type="number"/>
        <label>Offset</label>
        <input v-model="offset" placeholder="0" type="number"/>
        <label>Sort</label>
        <select v-model="sort">
            <option value="">None</option>
            <option value="group">By group</option>
            <option value="rate">By rate</option>
        </select>
    </form>
    <button class="send-btn" @click="sendRequest">Send request</button>
    <div class="result" >
        {{ JSON.stringify(store.allStudents, null, 2) }}
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
    height: 300px;
    border: 1px solid rgb(193, 193, 193);
    border-radius: 5px;
    margin-top: 20px;
    background: #dcdcdc59;
    overflow-y: scroll;
    padding: 20px;
    white-space: pre-line;
}
</style>
