<template>
	<div v-if="show">

			<button style="font-size: medium; padding-top: 5%" @click="showTimerSetting = true">Timer</button>
			<br>
			<!-- <button @click="showTheme"> Theme </button>
			<br/> -->
			<fieldset id="timersetting" v-if="showTimerSetting === true">
				<h4 style="text-align: justify"> pomodoro duration : 
				<span style="text-align: justify" class="clickable" @click="settings.pomodoro -= 1">
					-
				</span>
				<editable-span style="text-align: justify" :text="this.settings.pomodoro.toString()" @edited="settings.pomodoro = $event"/>
				<span style="text-align: justify" class="clickable" @click="settings.pomodoro += 1">
					+
				</span>
			</h4> 
			<h4 style="text-align: justify"> short break duration : 
				<span style="text-align: justify" class="clickable" @click="settings.short -= 1">
					-
				</span>
				<editable-span style="text-align: justify" :text="this.settings.short.toString()" @edited="settings.short = $event"/>
				<span style="text-align: justify" class="clickable" @click="settings.short += 1">
					+
				</span>
			</h4>
			<h4 style="text-align: justify"> long break duration : 
				<span style="text-align: justify" class="clickable" @click="settings.long -= 1">
					-
				</span>
				<editable-span style="text-align: justify" :text="this.settings.long.toString()" @edited="settings.long = $event"/>
				<span style="text-align: justify" class="clickable" @click="settings.long += 1">
					+
				</span>
			</h4>
			<h4 style="text-align: justify"> long break delay : 
				<span style="text-align: justify" class="clickable" @click="settings.delay -= 1">
					-
				</span>
				<editable-span style="text-align: justify" :text="this.settings.delay.toString()" @edited="this.settings.delay = $event"/>
				<span style="text-align: justify" class="clickable" @click="settings.delay += 1">
					+
				</span>
			</h4>
			<h4 style="text-align: justify"> auto start breaks : <span style="text-align: justify" class="clickable" @click="settings.autobreak = !settings.autobreak">
				{{settings.autobreak}}</span></h4><br/>
			<button @click="update"> Close X </button>

			</fieldset>

			<!-- <fieldset v-if="showThemeSetting === true">
				Set your Own Theme currentColor
			</fieldset> -->
			
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
			showTimerSetting: true,
			showThemeSetting: false,
		}
	},
	props: {
		show: Boolean,
	},
	emits: ['close'],
	components: {
		EditableSpan,
	},

	mounted() {
		this.fetchSettings();
	},

	methods: {
		fetchSettings() {
			if (auth.currentUser) {
				this.firestoreRef = db.collection("users")
															.doc(auth.currentUser.uid)
															.collection("timer_settings");

				this.firestoreRef.doc('0')
						.get().then(doc => {
							if (doc.exists) {
								this.settings = {
									autobreak: doc.data().autobreak,
									delay: doc.data().delay,
									long: doc.data().long,
									pomodoro: doc.data().pomodoro,
									short: doc.data().short,
								}
							}
				});
			}
		},

		update() {
			// CTN_TODO: save settings *on close*
			// CTN_TODO: emit to parent so timer manager can fetch new settings
			this.$emit('close');
		},
		// showTheme() {
		// 	this.showTimerSetting = false
		// 	this.shhowThemeSetting = true
		// }
	}
};
</script>
