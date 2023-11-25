import { defineStore } from 'pinia';

export const useStudentsStore = defineStore('allStudents', {
    state: () => ({
        allStudents: [],
    }),

    actions: {
        async login(limit, offset, sort) {
            let url = `http://localhost:3000/students?sortBy=${sort}&offset=${offset}&limit=${limit}`;
            try {
                let data = await fetch(url);
                let jsonData = await data.json();
                this.allStudents = jsonData.students;
            } catch (error) {
                return error;
            }
        },
    }
});
