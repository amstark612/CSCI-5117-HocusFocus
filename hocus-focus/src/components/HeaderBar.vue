<template>
	<header class="flex flex-col">
		<div class="py-4 flex justify-between">
			<div id="logo">
				<router-link to="/">hocus-focus</router-link>
			</div>

			<nav v-if="this.$route.name != 'Login'" class="hidden sm:block">
				<span v-if="displayName">{{ displayName }} | </span> 
				<router-link v-if="displayName" to="/tasks">tasks | </router-link>
				<router-link to="/ranking">rankings | </router-link>
				<router-link v-if="!displayName" to="/Login">log in</router-link>
				<button v-if="displayName" @click="logout">log out</button>
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
			<span v-if="displayName">{{ displayName }} | </span> 
			<router-link v-if="displayName" to="/tasks">tasks | </router-link>
			<router-link to="/ranking">rankings | </router-link>
			<router-link v-if="!displayName" to="/login">log in</router-link>
			<button v-if="displayName" @click="logout">log out</button>
		</div>
	</header>
</template>

<script>
import { auth } from "@/main";

export default {
	name: "BaseHeader",
	data() {
		return {
			displayName: null,
			showMenu: false,
		};
	},

	beforeCreate() {
		auth.onAuthStateChanged(user => {
      if (user) {
        this.displayName = user.displayName.toLowerCase();
			}
		});
	},

	methods: {
		logout: function () {
			auth.signOut().then(() => {
				this.$router.push("/");
			});
		},
	},
};
</script>
