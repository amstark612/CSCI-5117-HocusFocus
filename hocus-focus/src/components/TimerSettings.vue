<template>
	<div v-if="show">
		<button style="padding-top: 5%; padding-bottom: 3%; font-size: medium;">Timer</button>
		<!-- <button disabled> Theme </button> -->
		<br />
		<div style="padding-bottom: 3%; font-size: medium; text-align: start; text-justify: auto;">
			pomodoro duration
			<span style="margin-left:7%">:</span>
		
		<span class="clickable" @click="settings.pomodoro -= 1"> - </span>
		<editable-span
			:text="this.settings.pomodoro.toString()"
			@edited="settings.pomodoro = $event"
		/>
		<span class="clickable" @click="settings.pomodoro += 1"> + </span>
		</div>
		
	
		<div style="padding-bottom: 3%; font-size: medium; text-justify: auto; text-align: start;">
			short break duration:
		
		<span class="clickable" @click="settings.short -= 1"> - </span>
		<editable-span
			:text="this.settings.short.toString()"
			@edited="settings.short = $event"
		/>
		<span class="clickable" @click="settings.short += 1"> + </span>
		</div>

		<div style="padding-bottom: 3%; font-size: medium; text-justify: auto; text-align: start;">
			long break duration :
		
		<span class="clickable" @click="settings.long -= 1"> - </span>
		<editable-span
			:text="this.settings.long.toString()"
			@edited="settings.long = $event"
		/>
		<span class="clickable" @click="settings.long += 1"> + </span>
		</div>
		

		<div style="padding-bottom: 3%; font-size: medium; text-justify: auto; text-align: start;">
			long break delay 
			<span style="margin-left:10.5%">:</span>
		<span class="clickable" @click="settings.delay -= 1"> - </span>
		<editable-span
			:text="this.settings.delay.toString()"
			@edited="this.settings.delay = $event"
		/>
		<span class="clickable" @click="settings.delay += 1"> + </span></div>
		

		<div style="padding-bottom: 3%; font-size: medium; text-justify: auto; text-align: start;">
			goal cycles 
			<span style="margin-left:28.5%">:</span>
		<span class="clickable" @click="settings.goalCycles -= 1"> - </span>
		<editable-span
			:text="this.settings.goalCycles.toString()"
			@edited="this.settings.goalCycles = $event"
		/>
		<span class="clickable" @click="settings.goalCycles += 1"> + </span></div>
		

		<div style="padding-bottom: 3%; font-size: medium; text-justify: auto; text-align: start;">
			auto start breaks 
			<span style="margin-left:7%">: 
				<!-- this part is for debug  -->
				<!-- {{this.settings.autobreak}} -->
			</span>	
			
			<toggle-button :value="true" color="#82C7EB"  :labels="true" @change="settings.autobreak = !settings.autobreak"/> 
					
			<!-- <span style="padding-left: 2%" class="clickable" @click="settings.autobreak = !settings.autobreak">
				{{ settings.autobreak }}
			</span> -->
		</div>
		
		
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
