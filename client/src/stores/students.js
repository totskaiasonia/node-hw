import { defineStore } from 'pinia';

export const useStudentsStore = defineStore('allStudents', {
    state: () => ({
        allStudents: [],
        activeStudent: {},
        managedToPostStudent: 'pending',
        managedToUpdateStudent: 'pending',
        managedToDeleteStudent: 'pending',
    }),

    actions: {
        async getStudents(limit, offset, sort) {
            let url = `http://localhost:3000/students?sortBy=${sort}&offset=${offset}&limit=${limit}`;
            try {
                let data = await fetch(url);
                let jsonData = await data.json();
                this.allStudents = jsonData.students;
            } catch (error) {
                return error;
            }
        },
        async getStudent(id) {
            let url = `http://localhost:3000/students/${id}`;
            try {
                let data = await fetch(url);
                let jsonData = await data.json();
                this.activeStudent = jsonData.student;
            } catch (error) {
                return error;
            }
        },
        async postStudent(firstname, lastname, group, rate) {
            this.managedToPostStudent = 'pending';
            let url = `http://localhost:3000/students?firstname=${firstname}&lastname=${lastname}`;
            if (group)
                url += `&group=${group}`;
            if (rate)
                url += `&rate=${rate}`;
            try {
                let data = await fetch(url, {
                    method: 'POST',
                });
                if(data.status != 200) throw new Error("Bad request");
                let jsonData = await data.json();
                this.managedToPostStudent = 'fulfilled';
            } catch (error) {
                this.managedToPostStudent = 'rejected';
                return error;
            }
        },
        async updateSudent(id, firstname, lastname, group, rate) {
            this.managedToUpdateStudent = 'pending';
            let url = `http://localhost:3000/students/${id}?firstname=${firstname}&lastname=${lastname}`;
            if (group)
                url += `&group=${group}`;
            if (rate)
                url += `&rate=${rate}`;
            try {
                let data = await fetch(url, {
                    method: 'PUT',
                });
                if(data.status != 200) throw new Error("Bad request");
                let jsonData = await data.json();
                this.managedToUpdateStudent = 'fulfilled';
            } catch (error) {
                this.managedToUpdateStudent = 'rejected';
                return error;
            }
        },
        async deleteSudent(id) {
            this.managedToDeleteStudent = 'pending';
            let url = `http://localhost:3000/students/${id}`;
            try {
                let data = await fetch(url, {
                    method: 'DELETE',
                });
                if(data.status != 200) throw new Error("Bad request");
                let jsonData = await data.json();
                this.managedToDeleteStudent = 'fulfilled';
            } catch (error) {
                this.managedToDeleteStudent = 'rejected';
                return error;
            }
        }
    }
});
