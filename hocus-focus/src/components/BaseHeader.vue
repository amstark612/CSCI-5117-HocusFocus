<template>
	<header class="flex flex-col text-pastel-blue-600">
		<div class="py-4 flex justify-between">
			<div id="logo">
				<router-link to="/">hocus-focus</router-link>
			</div>

			<nav v-if="this.$route.name != 'Login'" class="hidden sm:block">
				{{ displayName }} | <router-link to="/tasks">tasks</router-link> |
				<router-link to="/ranking">rankings</router-link> |
				<button @click="logout">log out</button>
			</nav>

			<nav class="sm:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 clickable"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
					@click="showMenu = !showMenu"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
					/>
				</svg>
			</nav>
		</div>

		<div
			v-if="showMenu && this.$route.name != 'Login'"
			class="text-center pb-4"
		>
			<router-link to="/tasks">tasks</router-link> |
			<router-link to="/ranking">rankings</router-link> |
			<button @click="logout">log out</button>
		</div>
	</header>
</template>

<script>
import { auth, db } from "@/main";

export default {
	name: "BaseHeader",
	data() {
		return {
			showMenu: false,
			displayName: null,
		};
	},
	methods: {
		logout: function () {
			auth.signOut().then(() => {
				this.$router.replace("/");
			});
		},
	},

	beforeCreate() {
		auth.onAuthStateChanged((user) => {
			db.collection("users")
				.doc(user.uid)
				.get()
				.then((ref) => {
					this.displayName = ref.data().displayName.toLowerCase();
				});
		});
	},
};
</script>
