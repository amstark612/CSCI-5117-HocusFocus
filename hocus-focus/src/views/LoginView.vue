<template>
	<div class="login">
		<h3>log in with google</h3>
		<button @click="socialLogin" class="social-button">
			<img
				alt="Google Logo"
				src="../assets/google-logo.png"
				referrerpolicy="no-referrer"
			/>
		</button>
	</div>
</template>

<script>
import { auth, db, fieldValueUtility, provider } from "../main";

export default {
	name: "LoginView",
	data: function () {
		return {
			email: "",
			password: "",
		};
	},
	methods: {
		socialLogin: function () {
      auth
				.signInWithPopup(provider)
				.then(() => {
					this.registerAccount();
					this.$router.push("/");
				})
				.catch((err) => {
					alert("Oops. " + err.message);
				});
		},
		registerAccount() {
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
								.set({
									autobreak: true,
									delay: 4,
									long: 10,
									pomodoro: 25,
									short: 5,
								})
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
	},
};
</script>

<style scoped>
/* "scoped" attribute limits the CSS to this component only */
.login {
	margin-top: 40px;
}
input {
	margin: 10px 0;
	width: 20%;
	padding: 15px;
}
button {
	margin-top: 20px;
	width: 10%;
	cursor: pointer;
}
p {
	margin-top: 40px;
	font-size: 13px;
}
p a {
	text-decoration: underline;
	cursor: pointer;
}
.social-button {
	width: 75px;
	background: white;
	padding: 10px;
	border-radius: 100%;
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
	outline: 0;
	border: 0;
}
.social-button:active {
	box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
}
.social-button img {
	width: 100%;
}
</style>
