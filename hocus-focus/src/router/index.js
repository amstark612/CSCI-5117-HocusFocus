import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import TaskView from "../views/TaskView.vue";
import RankingView from "../views/RankingView.vue";
import ToggleButton from "vue-js-toggle-button";
import "tw-elements";
import { auth } from "@/main";
import { registerUser } from "@/authUtilities";

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
	const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    // ensure user is registered in our db as well as logged into google
    if (auth.currentUser) {
        registerUser(auth.currentUser);
        next();
    } else if (requiresAuth && !auth.currentUser) {
        next("/");
    } else {
        next();
    }
});

export default router;
