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
				path: "/OLAS/Consulation/:id",
				name: "ConsulationDetail",
				component: () => import("@/views/Consultation/consulation.vue"),
			},
			{
				path: "/OLAS/Ask",
				name: "Ask",
				component: () => import("@/views/Consultation/ask.vue"),
			},
			{
				path: "/OLAS/UserInfo",
				name: "UserInfo",
				component: () => import("@/views/UserInfo/index.vue"),
			},
			{
				path: "/OLAS/Post",
				name: "Post",
				component: () => import("@/views/Post/index.vue"),
			},
			{
				path: "/OLAS/AllPost",
				naem: "AllPost",
				component: () => import("@/views/Post/allPost.vue"),
			},
			{
				path: "/OLAS/Article",
				name: "Article",
				component: () => import("@/views/Article/index.vue"),
			},
			{
				path: "/OLAS/AllArticle",
				name: "AllArticle",
				component: () => import("@/views/Article/allArticle.vue"),
			},
			{
				path: "/OLAS/Lawyer",
				name: "Lawyer",
				component: () => import("@/views/Lawyer/index.vue"),
			},
			{
				path: "/OLAS/AllLawyer",
				name: "AllLawyer",
				component: () => import("@/views/Lawyer/allLaywer.vue"),
			},
		],
	},
	{
		path: "/Manager",
		name: "Manager",
		component: () => import("@/views/Manager/index.vue"),
		meta: { title: "系统管理" },
		children: [
			{
				path: "/Manager/Section",
				name: "SectionManage",
				component: () => import("@/views/Manager/Section.vue"),
			},
			{
				path: "/Manager/SubSection",
				name: "SubSectionManage",
				component: () => import("@/views/Manager/SubSection.vue"),
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
