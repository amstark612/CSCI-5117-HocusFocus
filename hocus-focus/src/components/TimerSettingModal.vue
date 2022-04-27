<template>
    <div class="timer-pop">
        <!-- Modal -->
        <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable relative w-auto pointer-events-none">
                <div
                    class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                    <!-- Modal Header -->
                    <div
                        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalScrollableLabel">
                            <BaseIcon
                                @clicked="save"
                                :properties="{
                                    height: 'h-8',
                                    width: 'w-8',
                                    strokeWidth: '1.5',
                                    classes: ['stroke-pastel-green-500'],
                                }"
                                :dArray="[
                                    'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                                ]"
                            />
                        </h5>
                        <button type="button"
                            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>

                    <!-- Modal Content: Timer Setting -->
                    <div class="modal-body relative p-4">
                        <div
                            class="grid grid-cols-6 gap-4 p-5"
                            v-for="setting in settingsLabel"
                            :key="setting.label"
                        >
                            <div style="font-size: medium" class="col-span-3 card">{{ setting.label }}</div>
                            <div class="col-span-1 text-2xl p-3 my-2">:</div>
                            <div style="font-size: medium" class="col-span-1 card">
                                {{ settingsMin[setting.field] }}
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
                            <div style="font-size: medium" class="col-span-3 card">auto start breaks</div>
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
                                @clicked="save"
                                :properties="{
                                    height: 'h-8',
                                    width: 'w-8',
                                    strokeWidth: '1.5',
                                    classes: ['stroke-pastel-green-500'],
                                }"
                                :dArray="[
                                    'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
                                ]"
                            />
                        </div>
                    </div>

                    <!-- Modal Footer: Close popup -->
                    <div
                        class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                        <button type="button"
                        class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                        data-bs-dismiss="modal">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { auth, db } from "@/main";
import { pomodoro, settingsLabel, time } from "@/constants";
import BaseIcon from "@/components/BaseIcon.vue";

export default {
	name: "TimerSettingModal",
	data() {
		return {
			MS_PER_MIN: time.MS_PER_MIN,
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

	computed: {
		settingsMin() {
			let computedSettings = {...this.settings};

			pomodoro.TIME_FIELDS.forEach(field => {
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
			if (pomodoro.TIME_FIELDS.includes(field)) {
				this.settings[field] -= time.MS_PER_MIN;
			} else {
				this.settings[field]--;
			}
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
						console.log("Document successfully updated!");
						this.$emit("close");
					})
					.catch((error) => {
						// The document probably doesn't exist.
						console.error("Error updating document: ", error);
					});
			} else {
				alert("Log in to Save Preferences!");
				this.$emit("close");
			}
		}
	},
};
</script>
<style scoped>
.close {
	display: flex;
	justify-content: center;
}
.modal-dialog {
    background-color: aliceblue;
}
</style>

