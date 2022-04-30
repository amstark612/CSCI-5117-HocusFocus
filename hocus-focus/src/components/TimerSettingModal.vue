<template>
	<BaseModal
		v-if="show"
		:popupClasses="['bg-pastel-green-200', 'border-pastel-green-500']"
	>
		<template v-slot:header>
			<div class="flex justify-between">
				<div class="flex items-center gap-2">
					<BaseIcon
						@clicked="$emit('close')"
						title="Close without saving"
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z']"
					/>
					<div>Timer Settings</div>
				</div>

				<BaseIcon
					@clicked="$emit('close')"
					title="Close without saving"
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
		</template>

		<template v-slot:body>
			<div class="m-auto">
				<div
					v-for="setting in settingsLabel"
					:key="setting.label"
					class="flex flex-col gap-2"
				>
					<div class="flex gap-2 justify-end">
						<div class="flex items-center justify-end py-2">
							{{ setting.label }} :
						</div>

						<div class="flex items-center">
							<div class="flex gap-2">
								<div class="flex-none card p-1 w-10 text-center">
									{{ settingsMin[setting.field] }}
								</div>

								<div class="flex flex-col justify-center flex-none w-8">
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
						</div>
					</div>
				</div>

				<div class="flex gap-2 justify-end">
					<div class="flex items-center justify-end py-2">
						autostart breaks :
					</div>

					<div class="flex items-center w-20">
						<toggle-button
							:value="settings.autobreak"
							color="#68cabb"
							:labels="true"
							@change="settings.autobreak = !settings.autobreak"
						/>
					</div>
				</div>
			</div>
		</template>

		<template v-slot:footer>
			<div class="flex justify-around text-xsm sm:text-base">
				<button
					@click="resetPreferences"
					class="flex items-center gap-2"
					title="Reset to default settings!"
				>
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
						]"
					/>
					<div class="hidden sm:block">reset to default</div>
				</button>

				<button
					@click="save"
					class="flex items-center gap-2"
					title="Save customized preferences!"
				>
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4',
						]"
					/>
					<div class="hidden sm:block">save</div>
				</button>
			</div>
		</template>
	</BaseModal>
</template>

<script>
import { auth, db } from "@/main";
import { pomodoro, settingsLabel, time } from "@/constants";
import BaseModal from "@/components/BaseModal.vue";
import BaseIcon from "@/components/BaseIcon.vue";

export default {
	name: "TimerSettings",
	data() {
		return {
			MS_PER_MIN: time.MS_PER_MIN,
			settings: null,
			DEFAULT_SETTINGS: null,
			settingsLabel: settingsLabel,
		};
	},
	props: {
		show: Boolean,
	},
	components: {
		BaseModal,
		BaseIcon,
	},

	computed: {
		settingsMin() {
			let computedSettings = { ...this.settings };

			pomodoro.TIME_FIELDS.forEach((field) => {
				computedSettings[field] /= time.MS_PER_MIN;
			});

			return computedSettings;
		},
	},

	mounted() {
		this.fetchSettings();
	},

	methods: {
		incrementSettings(field) {
			if (pomodoro.TIME_FIELDS.includes(field)) {
				this.settings[field] += time.MS_PER_MIN;
			} else {
				this.settings[field]++;
			}
		},
		decrementSettings(field) {
			if (this.settings[field] > 0) {
				if (pomodoro.TIME_FIELDS.includes(field)) {
					this.settings[field] -= time.MS_PER_MIN;
				} else {
					this.settings[field]--;
				}
			}
		},
		resetPreferences() {
			this.DEFAULT_SETTINGS = {
				delay: 4,
				autobreak: true,
				long: 10 * time.MS_PER_MIN,
				pomodoro: 25 * time.MS_PER_MIN,
				short: 5 * time.MS_PER_MIN,
				goalCycles: 1,
			};
			this.settings = this.DEFAULT_SETTINGS;
			this.save();
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
			} else {
				this.settings = pomodoro.DEFAULT_SETTINGS;
			}
		},

		save() {
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
						console.log("Settings successfully updated!");
						this.$emit("close");
					})
					.catch((error) => {
						// The document probably doesn't exist.
						console.error("Error updating settings: ", error);
					});
			} else {
				alert("Log in to Save Preferences!");
			}
		},
	},
};
</script>
