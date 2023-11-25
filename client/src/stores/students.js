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
        async getStudents(limit, offset, sort, token) {
            let url = `http://localhost:3000/students?sortBy=${sort}&offset=${offset}&limit=${limit}`;
            try {
                let data = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                });
                let jsonData = await data.json();
                this.allStudents = jsonData.students;
            } catch (error) {
                return error;
            }
        },
        async getStudent(id, token) {
            let url = `http://localhost:3000/students/${id}`;
            try {
                let data = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                });
                let jsonData = await data.json();
                this.activeStudent = jsonData.student;
            } catch (error) {
                return error;
            }
        },
        async postStudent(firstname, lastname, group, rate, token) {
            this.managedToPostStudent = 'pending';
            let url = `http://localhost:3000/students?firstname=${firstname}&lastname=${lastname}`;
            if (group)
                url += `&group=${group}`;
            if (rate)
                url += `&rate=${rate}`;
            try {
                let data = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                });
                if(data.status != 200) throw new Error("Bad request");
                this.managedToPostStudent = 'fulfilled';
            } catch (error) {
                this.managedToPostStudent = 'rejected';
                return error;
            }
        },
        async updateSudent(id, firstname, lastname, group, rate, token) {
            this.managedToUpdateStudent = 'pending';
            let url = `http://localhost:3000/students/${id}?firstname=${firstname}&lastname=${lastname}`;
            if (group)
                url += `&group=${group}`;
            if (rate)
                url += `&rate=${rate}`;
            try {
                let data = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                });
                if(data.status != 200) throw new Error("Bad request");
                this.managedToUpdateStudent = 'fulfilled';
            } catch (error) {
                this.managedToUpdateStudent = 'rejected';
                return error;
            }
        },
        async deleteSudent(id, token) {
            this.managedToDeleteStudent = 'pending';
            let url = `http://localhost:3000/students/${id}`;
            try {
                let data = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'authorization': `Bearer ${token}`,
                    }
                });
                if(data.status != 200) throw new Error("Bad request");
                this.managedToDeleteStudent = 'fulfilled';
            } catch (error) {
                this.managedToDeleteStudent = 'rejected';
                return error;
            }
        }
    }
});
