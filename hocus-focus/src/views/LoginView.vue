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
import firebase from "firebase/app";

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
			const provider = new firebase.auth.GoogleAuthProvider();

			firebase
				.auth()
				.signInWithPopup(provider)
				.then(() => {
					this.$router.replace("home");
				})
				.catch((err) => {
					alert("Oops. " + err.message);
				});
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
