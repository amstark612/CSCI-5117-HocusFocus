<template>
	<div class="text-center">
		<h1>let's get focused</h1>

		<div class="card timer">
			<div class="flex justify-around w-full">
				<div>{{ cyclePomodoroCount }} / 4 intervals</div>

				<div>
					{{ Math.floor(cycleCount) }} / {{ timer.settings.goalCycles }} cycles
				</div>
			</div>

			<TimerProgressBar
				:running="timer.running"
				:duration="timer.intervalDuration"
				:currentIntervalType="currentIntervalType"
				@timeUp="timeUp"
			/>

			<TimerControls
				:running="timer.running"
				@pause="timer.running = !timer.running"
				@resume="resume"
				@runInterval="runInterval"
				@skipInterval="skipInterval"
			/>
		</div>
	</div>
</template>

<script>
import { auth, db } from "@/main";
import { pomodoro, time } from "@/constants";
import TimerControls from "@/components/TimerControls.vue";
import TimerProgressBar from "./TimerProgressBar.vue";

export default {
	name: "TimerManager",
	data() {
		return {
			firestoreRef: null,

			// bookkeeping variables
			goalCycles: 1, // count of cycles the user aims to complete
			intervalCount: 0, // count of any interval type user has begun
			pomodoroCount: 0, // total count of pomodoro intervals user has completed
			cyclePomodoroCount: 0, // how many pomodoros completed in a cycle
			settingsKey: 0, // refresh settings when incremented

			// session summary data
			totalFocusTime: 0,

			timer: {
				intervalDuration: null,
				settings: pomodoro.DEFAULT_SETTINGS,
				running: false,
				sequence: null,
			},
		};
	},
	components: {
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
			};
		},
		currentIntervalType() {
			return this.timer.sequence[
				this.intervalCount % this.timer.sequence.length
			];
		},
		cycleCount() {
			return this.pomodoroCount / 4;
		},
	},

	watch: {
		// CTN_TODO this needs testing
		cycleCount() {
			if (this.cycleCount % this.goalCycles == 0) {
				this.cyclePomodoroCount = 0;
			}
			if (this.cycleCount == this.goalCycles) {
				console.log("emit to parent and show summary!");
			}
		},
		settingsKey() {
			this.fetchSettings();
			this.timer.sequence = this.computeSequence();
		},
	},

	mounted() {
		this.fetchSettings();
		this.timer.sequence = this.computeSequence();
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
							this.timer.settings = {
								autobreak: doc.data().autobreak,
								delay: doc.data().delay,
								long: doc.data().long,
								pomodoro: doc.data().pomodoro,
								short: doc.data().short,
								goalCycles: 2,
							};
						}
					});
			}
		},

		computeSequence() {
			let sequence = Array(this.timer.settings.delay - 1);
			sequence.fill(["pomodoro", "short"]).push(["pomodoro", "long"]);

			return sequence.flat();
		},

		timeUp(timeElapsed) {
			this.timer.running = false;

			if (timeElapsed == this.settingsMs.pomodoro) {
				this.totalFocusTime += timeElapsed;
				this.cyclePomodoroCount++;
				this.pomodoroCount++;
			} else {
				this.totalFocusTime += 0;
			}

			this.intervalCount += 1;

			this.timer.intervalDuration = null;
			if (this.timer.settings.autobreak) {
				this.runInterval();
			}
		},

		resume() {
			if (!this.timer.intervalDuration) {
				this.runInterval();
			} else {
				// figure out how/whether to start a new interval or just resume an interval in progress?
				this.timer.running = true;
			}
		},

		skipInterval() {
			console.log(this.currentIntervalType);

			this.timeUp(this.settingsMs[this.currentIntervalType]);
		},

		runInterval() {
			this.timer.intervalDuration = this.settingsMs[this.currentIntervalType];
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
