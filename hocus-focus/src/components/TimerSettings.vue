<template>
	<div v-if="show">
		<button>Timer</button>
		<!-- <button disabled> Theme </button> -->
		<br />
		<div
			class="grid grid-cols-6 gap-4 p-5"
			v-for="setting in settingsLabel"
			:key="setting.label"
		>
			<div class="col-span-3 card">{{ setting.label }}</div>
			<div class="col-span-1 text-2xl p-3 my-2">:</div>
			<div class="col-span-1 card">
				{{ settings[setting.field] }}
			</div>
			<div>
				<BaseIcon
					@clicked="incrementSettings(setting.field)"
					:properties="{
						height: 'h-8',
						width: 'w-8',
						strokeWidth: '1.5',
						classes: ['stroke-pastel-green-500'],
					}"
					:dArray="['M5 15l7-7 7 7']"
				/>
				<BaseIcon
					@clicked="decrementSettings(setting.field)"
					:properties="{
						height: 'h-8',
						width: 'w-8',
						strokeWidth: '1.5',
						classes: ['stroke-pastel-green-500'],
					}"
					:dArray="['M19 9l-7 7-7-7']"
				/>
			</div>
		</div>

		<div class="grid grid-cols-4 gap-4 p-5">
			<div class="col-span-3 card">auto start breaks</div>
			<div class="col-span-1 p-3 my-2">
				<toggle-button
					:value="settings.autobreak"
					color="#82C7EB"
					:labels="true"
					@change="settings.autobreak = !settings.autobreak"
				/>
			</div>
		</div>
		<br />
		<div title="Save Changes" class="close">
			<BaseIcon
				@clicked="update"
				:properties="{
					height: 'h-8',
					width: 'w-8',
					strokeWidth: '1.5',
					classes: ['stroke-pastel-green-500'],
				}"
				:dArray="[
					'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
				]"
			/>
		</div>
	</div>
</template>

<script>
import { auth, db } from "@/main";
import { pomodoro, settingsLabel } from "@/constants";
import BaseIcon from "@/components/BaseIcon.vue";

export default {
	name: "TimerSettings",
	data() {
		return {
			settings: pomodoro.DEFAULT_SETTINGS,
			settingsLabel: settingsLabel,
		};
	},
	props: {
		show: Boolean,
	},
	emits: ["close"],
	components: {
		BaseIcon,
	},

	mounted() {
		this.fetchSettings();
	},

	methods: {
		incrementSettings(field) {
			this.settings[field]++;
		},
		decrementSettings(field) {
			this.settings[field]--;
		},
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
			if (auth.currentUser) {
				this.firestoreRef = db
					.collection("users")
					.doc(auth.currentUser.uid)
					.collection("timer_settings");
				const settingsDoc = this.firestoreRef.doc("0");
				return settingsDoc
					.update({
						autobreak: this.settings.autobreak,
						delay: this.settings.delay,
						long: this.settings.long,
						pomodoro: this.settings.pomodoro,
						short: this.settings.short,
						goalCycles: this.settings.goalCycles,
					})
					.then(() => {
						console.log("Document successfully updated!");
					})
					.catch((error) => {
						// The document probably doesn't exist.
						console.error("Error updating document: ", error);
					});
			} else {
				alert("Log in to Save Preferences!");
			}
		},
	},
};
</script>
<style scoped>
.close {
	display: flex;
	justify-content: center;
}
</style>
