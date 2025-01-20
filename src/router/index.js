// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Title from "../views/title.vue";

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
		meta: { title: "首页" },
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
			{
				path: "/OLAS/Section",
				name: "Section",
				component: () => import("@/views/LawyerSection/index.vue"),
			},
			{
				path: "/OlAS/Consulation",
				name: "Consulation",
				component: () => import("@/views/Consultation/index.vue"),
			},
			{
				path: "/OLAS/Ask",
				name: "Ask",
				component: () => import("@/views/Consultation/ask.vue"),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	// history:createWebHashHistory(),
	routes,
});
router.beforeEach((to, from, next) => {
	if (to.meta.title) {
		document.title = to.meta.title;
	}
	next();
});
export default router;
