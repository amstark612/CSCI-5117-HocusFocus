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
				<button v-if="!displayName" @click="socialLogin">log in</button>
				<button v-if="displayName" @click="logout">log out</button>
			</nav>

			<nav class="sm:hidden">
				<BaseIcon
					:dArray="[
						'M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z',
					]"
					:properties="{ classes: ['stroke-pastel-blue-600'] }"
					@clicked="showMenu = !showMenu"
				/>
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
import { auth, provider } from "@/main";
import { registerUser } from "@/authUtilities";
import BaseIcon from "@/components/BaseIcon.vue";

export default {
	name: "BaseHeader",
	data() {
		return {
			displayName: null,
			showMenu: false,
		};
	},
	components: {
		BaseIcon,
	},

	beforeCreate() {
		auth.onAuthStateChanged((user) => {
			if (user) {
				this.displayName = user.displayName.toLowerCase();
			}
		});
	},

	methods: {
		socialLogin() {
			auth
				.signInWithPopup(provider)
				.then(() => {
					this.registerAccount();
                    if (this.$route.name != "home") {
                        this.$router.push("/");
                    }
				})
				.catch((err) => {
					alert("Oops. " + err.message);
				});
		},
		logout() {
			auth.signOut().then(() => {
                if (this.$route.name != "home") {
                    this.$router.push("/");
                }
			});
			this.displayName = null;
		},
		registerAccount() {
			if (auth.currentUser) {
                registerUser(auth.currentUser);
            }
		},
	},
};
</script>
