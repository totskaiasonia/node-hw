import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        isLoggedIn: false,
        token: ''
    }),

    actions: {
        async login(name, password) {
            let url = `http://localhost:3000/login`;
            try {
                let data = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({name, password}),
				});
				let jsonData = await data.json();
				console.log(jsonData);
				this.token = jsonData;
				this.isLoggedIn = true;
            } catch (error) {
                return error;
            }
        },
    }
});
