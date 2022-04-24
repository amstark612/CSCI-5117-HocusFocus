<template>
	<div class="text-center">
		<h1>let's get focused</h1>

		<div class="card timer">
			<div class="flex justify-around w-full">
				<div>{{ pomodoroCount }} / 4 intervals</div>

				<div>
					{{ session.cycleCount }}
					/
					<EditableSpan
						:text="goalCycles.toString()"
						:inputType="'number'"
						:classes="'bg-pastel-green-100 w-5'"
						@edited="goalCycles = parseInt($event)"
					/>
					cycles
				</div>
			</div>

			<TimerProgressBar 
				:running="timer.running"
				:duration="timer.intervalDuration" 
				@timeUp="timeUp"
			/>

			<TimerControls
				:running="timer.running"
				@pause="timer.running = !timer.running"
				@resume="resume"
				@runInterval="runInterval"
			/>

		</div>
	</div>
</template>

<script>
import { auth, db } from "@/main";
import { pomodoro, time } from "@/constants";
import EditableSpan from "./EditableSpan.vue";
import TimerControls from "@/components/TimerControls.vue";
import TimerProgressBar from "./TimerProgressBar.vue";

export default {
	name: "TimerManager",
	data() {
		return {
			firestoreRef: null,
			// bookkeeping variables
			goalCycles: 1,			// count of cycles the user aims to complete
			intervalCount: 0,		// count of any interval type user has begun
			pomodoroCount: 0,		// count of pomodoro intervals user has completed

			// session summary data
			session: {
				totalFocusTime: 0,
				cycleCount: 0,			// count of number of pomodoro cycles user has completed
			},

			timer: {
				intervalDuration: null,
				settings: pomodoro.DEFAULT_SETTINGS,			// user's timer settings
				running: false,
			},
		};
	},
	components: {
    EditableSpan,
		TimerControls,
    TimerProgressBar,
	},

	computed: {
		settingsMs() {
			return {
				delay: this.timer.settings.delay * time.MS_PER_MIN,
				pomodoro: this.timer.settings.pomodoro * time.MS_PER_MIN,
				long: this.timer.settings.long * time.MS_PER_MIN,
				short: this.timer.settings.short * time.MS_PER_MIN,
			}
		},

		currentIntervalType() {
			return pomodoro.CYCLE[this.intervalCount % pomodoro.CYCLE.length];
		},
	},

	watch: {
		pomodoroCount() { // a cycle includes exactly 4 pomodoros
			// CTN_TODO: is this even right? or does this need to be after the long break? ask kinza
			this.session.cycleCount += !(this.pomodoroCount % 4) ? 1 : 0;
		},
		cycleCount() {
			if (!(this.goalCycles % this.session.cycleCount)) {
				console.log("summary prompt thingy - emit to parent probs");
				// possibly reset something or other here...? otherwise would need to show summary for every subsequent cycle?
			}
		},
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
								this.timer.settings = {
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

		timeUp(timeElapsed) {
			this.timer.running = false;
			this.timer.intervalCount += 1;

			this.session.totalFocusTime += this.currentInterval === 'POMODORO' ? timeElapsed : 0;
			console.log('hello kitty focus time is now', this.session.totalFocusTime);

			let nextIntervalType = this.currentInterval;
			this.timer.intervalDuration = this.settingsMs[nextIntervalType.toLowerCase()];
			this.timer.running = this.settings.autobreak;
		},

		resume() {
			// whether to start a new interval or just resume an interval in progress?
		},

		runInterval(intervalType) {
			this.timer.intervalDuration = this.settingsMs[intervalType];
			this.timer.running = true;
		},
	},
};
</script>

<style scope>
.timer {
	@apply flex;
	@apply flex-col;
	@apply gap-y-6;
	@apply items-center;

	@apply mt-4;

	@apply border-pastel-green-500;
	@apply bg-pastel-green-100;
	@apply text-pastel-green-500;
}

.clock {
	@apply flex;
	@apply justify-center;
	@apply items-center;

	@apply bg-gradient-to-b;
	@apply from-pastel-yellow-200;
	@apply to-pastel-yellow-300;
	@apply border-4;
	@apply border-pastel-yellow-500;

	@apply drop-shadow-lg;

	@apply rounded-full;
	@apply w-36;
	@apply h-36;

	@apply text-4xl;
}
</style>
