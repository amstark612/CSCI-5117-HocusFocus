<template>
	<div v-if="show">
		<button style="padding-top: 5%; padding-bottom: 3%; font-size: medium;">Timer</button>
		<!-- <button disabled> Theme </button> -->
		<br />
		<h4 style="padding-bottom: 3%; font-size: medium; text-align: justify">
			pomodoro duration :
			<span class="clickable" @click="settings.pomodoro -= 1"> - </span>
			<editable-span
				:text="this.settings.pomodoro.toString()"
				@edited="settings.pomodoro = $event"
			/>
			<span class="clickable" @click="settings.pomodoro += 1"> + </span>
		</h4>
		<h4 style="padding-bottom: 3%; font-size: medium; text-align: justify">
			short break duration :
			<span class="clickable" @click="settings.short -= 1"> - </span>
			<editable-span
				:text="this.settings.short.toString()"
				@edited="settings.short = $event"
			/>
			<span class="clickable" @click="settings.short += 1"> + </span>
		</h4>
		<h4 style="padding-bottom: 3%; font-size: medium; text-align: justify">
			long break duration :
			<span class="clickable" @click="settings.long -= 1"> - </span>
			<editable-span
				:text="this.settings.long.toString()"
				@edited="settings.long = $event"
			/>
			<span class="clickable" @click="settings.long += 1"> + </span>
		</h4>
		<h4 style="padding-bottom: 3%; font-size: medium; text-align: justify">
			long break delay :
			<span class="clickable" @click="settings.delay -= 1"> - </span>
			<editable-span
				:text="this.settings.delay.toString()"
				@edited="this.settings.delay = $event"
			/>
			<span class="clickable" @click="settings.delay += 1"> + </span>
		</h4>
		<h4 style="padding-bottom: 3%; font-size: medium; text-align: justify">
			goal cycles :
			<span class="clickable" @click="settings.goalCycles -= 1"> - </span>
			<editable-span
				:text="this.settings.goalCycles.toString()"
				@edited="this.settings.goalCycles = $event"
			/>
			<span class="clickable" @click="settings.goalCycles += 1"> + </span>
		</h4>
		<h4 style="padding-bottom: 3%; font-size: medium; text-align: justify">
			auto start breaks :
			<span class="clickable" @click="settings.autobreak = !settings.autobreak">
				{{ settings.autobreak }}</span
			>
		</h4>
		
		<button style="padding-top: 5%; font-size: medium;" @click="update">Close X</button>
	</div>
</template>

<script>
import { auth, db } from "@/main";
import { pomodoro } from "@/constants";
import EditableSpan from "@/components/EditableSpan.vue";


export default {
	name: "TimerSettings",
	data() {
		return {
			settings: pomodoro.DEFAULT_SETTINGS,
		};
	},
	props: {
		show: Boolean,
	},
	emits: ["close"],
	components: {
		EditableSpan,
	},

	mounted() {
		this.fetchSettings();
	},

	methods: {
		fetchSettings() {
			if (auth.currentUser) {
				this.firestoreRef = db
					.collection("users")
					.doc(auth.currentUser.uid)
					.collection("timer_settings");

				this.firestoreRef
					.doc("0")
					.get()
					.then((doc) => {
						if (doc.exists) {
							this.settings = {
								autobreak: doc.data().autobreak,
								delay: doc.data().delay,
								long: doc.data().long,
								pomodoro: doc.data().pomodoro,
								short: doc.data().short,
								goalCycles: doc.data().goalCycles,
							};
						}
					});
			}
		},

		update() {
			// CTN_TODO: save settings *on close*
			// CTN_TODO: emit to parent so timer manager can fetch new settings
			this.$emit("close");
		},
	},
};
</script>
