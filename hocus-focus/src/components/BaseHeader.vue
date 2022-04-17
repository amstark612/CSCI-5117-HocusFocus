<template>
	<header class="p-4 flex justify-between">
		<div id="logo">
			<router-link to="/">hocus-focus</router-link>
		</div>

		<nav>
			<router-link to="/tasks">tasks</router-link> |
			<router-link to="/ranking">rankings</router-link> |
			<!--- CTN_TODO: allow them to log out --->
			{{ username }}
		</nav>
	</header>
</template>

<script>
import { auth, db } from '@/main';

export default {
	name: "BaseHeader",
	data() {
		return {
			username: null,
		}
	},

	beforeCreate() {
		auth.onAuthStateChanged(user => {
			db.collection("users").doc(user.uid).get().then(ref => {
				this.username = ref.data().username;
			});
		});
	},
};
</script>
