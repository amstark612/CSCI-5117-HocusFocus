<template>
	<div class="card setting-timer">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 clickable"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
			/>
		</svg>
		<button>Timer</button>
		<!-- <button disabled> Theme </button> -->
		<br />
		<h4>
			pomodoro duration :
			<editable-span :text="pomodoro" @edited="updatePromo" />
		</h4>
		<br />
		<h4>
			short break duration :
			<editable-span :text="shortBreak" @edited="updateShort" />
		</h4>
		<br />
		<h4>
			long break duration :
			<editable-span :text="longBreak" @edited="updateLong" />
		</h4>
		<br />
		<label>
			long break delay : <editable-span :text="longDelay" @edited="updateDelay"
		/></label>
		<br />
		<label> auto start breaks : </label>
		<br />
		<button>close X</button>
	</div>
</template>

<script>
import EditableSpan from "../components/EditableSpan.vue";
import { auth, db } from "../main";
export default {
	components: { EditableSpan },
	data() {
		return {
			pomodoro: null,
			shortBreak: null,
			longBreak: null,
			longDelay: null,
			autoBreak: null,
		};
	},
	firestore() {
		return {
			settings: db
				.collection("users")
				.doc(auth.currentUser)
				.collection("timer_settings")
				.doc("0")
				.get()
				.then((doc) => {
					if (doc.exists) {
						const data = doc.data();
						this.pomodoro = data.pomodoro;
						this.shortBreak = data.short;
						this.longBreak = data.long;
						this.longDelay = this.delay;
						this.autoBreak = this.autobreak;
					} else {
						// doc.data() will be undefined in this case
						console.log("No such document!");
					}
				}),
		};
	},
};
</script>

<style>
button {
	border-radius: 50px;
	border-color: #d09098;
	background-color: #d09098;
	padding-left: 1%;
	padding-right: 1%;
	margin-left: 2%;
}
</style>
