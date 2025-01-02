// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/login/index.vue"),
	},
	{
		path: "/OLAS",
		name: "OLAS",
		component: () => import("@/views/index.vue"),
		children: [
			{
				path: "/home",
				redirect: "/OLAS/index",
			},
			{
				path: "/OLAS/index",
				name: "homeIndex",
				component: () => import("@/views/home.vue"),
			},
		],
	},
];
const router = createRouter({
	history: createWebHistory(),
	// history:createWebHashHistory(),
	routes,
});
export default router;
