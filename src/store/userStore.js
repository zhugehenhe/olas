import { defineStore } from "pinia";

export const userStore = defineStore("user", {
	state: () => {
		return {
			userInfo: {},
			loginStatus: false,
		};
	},
	getters: {},
	actions: {
		updateUserInfo(userData) {
			this.loginStatus = true;
			this.userInfo = userData;
			localStorage.setItem("userInfo", JSON.stringify(userData));
		},
		resetUserInfo() {
			this.userInfo = {};
			this.loginStatus = false;
		},
	},
});
