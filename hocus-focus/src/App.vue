<template>
	<div id="app" class="mx-auto w-11/12 lg:w-4/5 xl:w-3/5 2xl:w-2/4">
        <NotificationPermissions />
		<HeaderBar />

		<router-view />
	</div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import NotificationPermissions from "@/components/NotificationPermissions.vue";
import { auth, db, fieldValueUtility } from "@/main";
import { pomodoro } from "@/constants";

export default {
	name: "App",
	components: {
        HeaderBar,
        NotificationPermissions,
    },

	beforeCreate() {
		if (auth.currentUser) {
			const user = auth.currentUser;
			const uid = user.uid;

			db.collection("users")
				.doc(uid)
				.get()
				.then((doc) => {
					if (!doc.exists) {
						// create user document
						db.collection("users")
							.doc(uid)
							.set({
								displayName: user.displayName,
								email: user.email,
								focusTime: 0,
								joinDate: fieldValueUtility.serverTimestamp(),
								photoUrl: user.photoURL,
							})
							.then(() => {
								console.log("Document successfully written!");
							})
							.catch((error) => {
								console.error("Error writing document: ", error);
							});

						// set default timer settings
						db.collection("users")
							.doc(uid)
							.collection("timer_settings")
							.doc("0")
							.set(pomodoro.DEFAULT_SETTINGS)
							.then(() => {
								console.log("Document successfully written!");
							})
							.catch((error) => {
								console.error("Error writing document: ", error);
							});

						// set default task!
						db.collection("users")
							.doc(auth.currentUser.uid)
							.collection("tasks")
							.doc("0")
							.set({
								createdAt: fieldValueUtility.serverTimestamp(),
								progress: 0,
								tags: ["ACT", "math"],
								title: "need to study for the ACT!",
							})
							.then(() => {
								console.log("Document successfully written!");
							})
							.catch((error) => {
								console.error("Error writing document: ", error);
							});
					}
				});
		}
	},
};
</script>

<style scoped>
@import "@/assets/styles/global.css";

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
