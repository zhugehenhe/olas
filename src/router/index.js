// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		redirect: "/login",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
	},
];
const router = createRouter({
	history: createWebHistory(),
	// history:createWebHashHistory(),
	routes,
});
export default router;
