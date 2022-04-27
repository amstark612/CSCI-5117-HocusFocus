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
				@updateSettings="fetchSettings"
			/>
		</div>
	</div>
</template>

<script>
import { auth, db } from "@/main";
import { pomodoro } from "@/constants";
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
	},

	mounted() {
		this.fetchSettings();
	},

	methods: {
		fetchSettings() {
			let computeSequence = () => {
				let sequence = Array(this.timer.settings.delay - 1);
				sequence.fill(["pomodoro", "short"]).push(["pomodoro", "long"]);
				return sequence.flat();
			};

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
							console.log("successfully fetched settings");
							this.timer.settings = doc.data();
							this.timer.sequence = computeSequence();
						}
					});
			}
		},

		timeUp(timeElapsed) {
            this.notify();
			this.timer.running = false;

			if (this.currentIntervalType === "pomodoro") {
				this.totalFocusTime += timeElapsed;
				this.pomodoroCount++;
				this.cyclePomodoroCount++;
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
				this.timer.running = true;
			}
		},

        // CTN_TODO this is just wrong; user can hack their focus time by skipping through tons of intervals
		skipInterval() {
			this.timeUp(this.timer.settings[this.currentIntervalType]);
		},

		runInterval() {
			this.timer.intervalDuration =
				this.timer.settings[this.currentIntervalType];
			this.timer.running = true;
		},

        notify() {
            try {
                new Notification("Time's up!");
            } catch (err) {
                alert('Notification API error: ' + err);
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
