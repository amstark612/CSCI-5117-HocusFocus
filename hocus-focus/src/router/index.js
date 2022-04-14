import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import TaskView from "../views/TaskView.vue";
import RankingView from "../views/RankingView.vue";
import firebase from "firebase/app";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: LoginView,
	},
	{
		path: "/home",
		name: "home",
		component: HomeView,
		meta: {
			requiresAuth: true,
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
			requiresAuth: true,
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, _, next) => {
	const currentUser = firebase.auth().currentUser;
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

	if (requiresAuth && !currentUser) next("/");
	else if (!requiresAuth && currentUser) next("/home");
	else next();
});

export default router;
