import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TaskView.vue";
import RankingView from "../views/RankingView.vue";
import { auth } from "@/main";
import ToggleButton from "vue-js-toggle-button";
import "tw-elements";
Vue.use(ToggleButton);
Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "home",
		component: HomeView,
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: "/tasks",
		name: "tasks",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: TaskView,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/ranking",
		name: "ranking",
		component: RankingView,
		meta: {
			requiresAuth: false,
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, _, next) => {
	const currentUser = auth.currentUser;
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	// if (requiresAuth && !currentUser) next("/");
	if (requiresAuth && !currentUser) next("/home");
	else next();
});

export default router;
