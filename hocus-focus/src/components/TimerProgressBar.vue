<template>
	<vep
		:progress="progress"
		line="butt"
		:color="current.modeColor"
		empty-color="#324c7e"
		thickness="20"
		emptyThickness="8"
		:reverse="true"
		:size="180"
		dash="strict 60 0.8"
		lineMode="in -4"
		:legend="false"
		class="font-medium stroke-current text-gray-200 dark:text-gray-600 text-center mx-auto"
	>
		<template v-slot:legend-caption>
			<!-- Formatted time display: e.g. 25:00 -->
			<p class="dark:text-gray-100 text-gray-800 text-2l font-extrabold">
				{{ minutes }} : {{ seconds }}
			</p>
			<!-- Current pomodoro mode text: Focusing/Resting -->
			<p class="dial-label">
				{{ current.modeText }}
			</p>
		</template>
	</vep>
</template>

<script>
// import Interval from "../helpers/interval";
import { radialTimer } from "@/constants";
import { time } from "@/constants";

export default {
	name: "TimerProgressBar",
	data() {
		return {
			emptyColor: radialTimer.EMPTY_COLOR,
			emptyColorFill: radialTimer.EMPTY_COLOR_FILL,
			focusModeColor: radialTimer.FOCUS_MODE_COLOR,
			shortBreakModeColor: radialTimer.SHORT_BREAK_MODE_COLOR,
			longBreakModeColor: radialTimer.LONG_BREAK_MODE_COLOR,
			current: {
				modeText: "",
				modeColor: "",
			},
			timeLeft: 0,
			intervalObject: null,
		};
	},
	props: {
		duration: Number,
		running: Boolean,
		currentIntervalType: String,
	},
	emits: ["timeUp"],

	computed: {
		minutes() {
			let min = Math.floor(this.timeLeft / time.MS_PER_MIN).toFixed(0);
			return ("00" + min).slice(-2);
		},
		seconds() {
			let seconds = Math.floor(
				(this.timeLeft % time.MS_PER_MIN) / time.MS_PER_SEC
			).toFixed(0);
			return ("00" + seconds).slice(-2);
		},
		progress() {
			// return progress as a percentage
			let remaining = this.duration ? this.timeLeft / this.duration : 1;
			return remaining * 100;
		},
	},

	mounted() {
		this.currentRoundDisplay();
	},

	watch: {
		duration() {
			// if user has autobreak set to false, don't start until they press start
			if (this.running && this.duration) {
				this.runInterval();
			}
		},
	},

	methods: {
		runInterval() {
			this.currentRoundDisplay();
			if (this.intervalObject) {
				clearInterval(this.intervalObject);
			}

			this.timeLeft = this.duration;

			let pausedAt = null;
			let start = Date.now();
			this.intervalObject = setInterval(() => {
				if (this.timeLeft == 0) {
					clearInterval(this.intervalObject);
					this.$emit("timeUp", this.duration);
					return;
				}

				if (this.running) {
					if (pausedAt) {
						// just resumed, adjust time
						start += Date.now() - pausedAt;
						pausedAt = null;
					}

					// calculate time elapsed, floor-ing to the nearest seconds
					// keeps accurate real-time and makes timer more consistent visually
					// due to decision not to show milliseconds
					let timeElapsed = (Date.now() - start) / time.MS_PER_SEC;
					timeElapsed = Math.floor(timeElapsed) * time.MS_PER_SEC;
					// do not let timer go negative
					this.timeLeft = Math.min(this.duration - timeElapsed, this.timeLeft);
				} else if (!pausedAt) {
					// just began pause
					pausedAt = Date.now();
				}
			}, 1000);
		},

		currentRoundDisplay() {
			if (this.currentIntervalType === "pomodoro") {
				this.current.modeText = "Focus";
				this.current.modeColor = this.focusModeColor;
			} else if (this.currentIntervalType === "short") {
				this.current.modeText = "Short Break";
				this.current.modeColor = this.shortBreakModeColor;
			} else if (this.currentIntervalType === "long") {
				this.current.modeText = "Long Break";
				this.current.modeColor = this.longBreakModeColor;
			}
		},
	},
};
</script>
<style scoped>
.dial-label {
	letter-spacing: 0.1em;
	top: 66%;
	text-transform: uppercase;
}
</style>
