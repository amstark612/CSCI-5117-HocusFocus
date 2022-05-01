<template>
	<div class="text-center">
		<h1>let's get focused</h1>

		<div class="card timer">
			<div class="flex justify-around w-full">
				<div>{{ cyclePomodoroCount }} / {{ timer.settings.delay }} pomodoros</div>

				<div>
					{{ Math.floor(cycleCount) }} / {{ timer.settings.goalCycles }} cycles
				</div>
			</div>

			<TimerProgressBar
				ref="radialTimer"
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
				@showSettings="$emit('showSettings')"
				@showInfo="$emit('showInfo')"
			/>
		</div>
	</div>
</template>

<script>
import { auth, db, fieldValueUtility } from "@/main";
import { pomodoro, time } from "@/constants";
import TimerControls from "@/components/TimerControls.vue";
import TimerProgressBar from "./TimerProgressBar.vue";

export default {
	name: "TimerManager",
	data() {
		return {
			firestoreRef: null,

			// bookkeeping variables
			intervalCount: 0, // count of any interval type user has begun
			pomodoroCount: 0, // total count of pomodoro intervals user has completed in a cycle
			cyclePomodoroCount: 0, // how many pomodoros completed in a cycle

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
	emits: ["sessionComplete", "showSettings", "showInfo"],

	components: {
		TimerControls,
		TimerProgressBar,
	},

	computed: {
		currentIntervalType() {
			if (this.timer.sequence) {
				let index = this.intervalCount % this.timer.sequence.length;
				return this.timer.sequence[index];
			} else {
				return "pomodoro";
			}
		},
		cycleCount() {
			return this.pomodoroCount / this.timer.settings.delay;
		},
	},

	watch: {
		cycleCount() {
			if (this.cycleCount % this.timer.settings.goalCycles == 0) {
				this.cyclePomodoroCount = 0;
			}
			if (this.cycleCount == this.timer.settings.goalCycles) {
				this.$emit("sessionComplete", this.totalFocusTime);
			}
		},
	},

	mounted() {
		this.fetchSettings();
	},

	methods: {
        reset() {
            this.intervalCount = 0;
            this.pomodoroCount = 0;
            this.cyclePomodoroCount = 0;
			this.timer.intervalDuration = this.timer.settings.pomodoro;
        },

		fetchSettings() {
			let computeSequence = () => {
				let sequence = Array(this.timer.settings.delay - 1);
				sequence.fill(["pomodoro", "short"]).push(["pomodoro", "long"]);
				return sequence.flat();
			};

			if (auth.currentUser) {
				this.firestoreRef = db.collection("users").doc(auth.currentUser.uid);

				this.firestoreRef
					.collection("timer_settings")
					.doc("0")
					.get()
					.then((doc) => {
						if (doc.exists) {
							console.log("successfully fetched settings");
							this.timer.settings = doc.data();
							this.timer.sequence = computeSequence();
							this.timer.intervalDuration = this.timer.settings.pomodoro;
						}
					});
			} else {
                this.timer.sequence = computeSequence();
            }
		},

		timeUp(timeElapsed) {
			this.notifyUser();
			this.timer.running = false;

			if (this.currentIntervalType === "pomodoro") {
				this.totalFocusTime += timeElapsed;

				if (auth.currentUser) {
					this.firestoreRef.update({
						focusTime: fieldValueUtility.increment(timeElapsed / time.MS_PER_MIN),
					});
				}

				this.pomodoroCount++;
				this.cyclePomodoroCount++;
			}

			this.intervalCount++;

			// queue up next mode
			this.timer.intervalDuration =
				this.timer.settings[this.currentIntervalType];
            // radial timer watches duration, so do this in case user has
            // same durations for different modes
            this.$refs.radialTimer.timeLeft = this.timer.intervalDuration;

			if (this.timer.settings.autobreak) {
				this.runInterval();
			}
		},

		resume() {
			if (this.$refs.radialTimer.intervalObject == null) {
				console.log("running new interval");
				this.runInterval();
			} else {
				console.log("resuming");
				this.timer.running = true;
			}
		},

		skipInterval() {
			clearInterval(this.$refs.radialTimer.intervalObject);
			this.$refs.radialTimer.intervalObject = null;
			this.timeUp(
				this.timer.intervalDuration - this.$refs.radialTimer.timeLeft
			);
		},

		// only used for starting a fresh interval
		runInterval() {
			this.timer.intervalDuration =
				this.timer.settings[this.currentIntervalType];
			this.timer.running = true;
			this.$refs.radialTimer.runInterval();
		},

		notifyUser() {
			try {
				new Notification("Time's up!");
			} catch (err) {
				alert("Time's up!");
			}
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
</style>
