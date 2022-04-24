<template>
	<vep
		:dot="{
			size: 46,
			backgroundColor: 'white',
			width: '2px',
		}"
		:progress="progress"
		line="butt"
		:color="emptyColor"
		empty-color="#324c7e"
		:emptyColorFill="emptyColorFill"
		thickness="46"
		emptyThickness="8"
		:size="180"
		dash="strict 60 0.8"
		lineMode="in -8"
		:legend="false"
		legendClass="legend-custom-style"
		fontSize="1.5rem"
		font-color="white"
		animation="loop 1000 100"
		class="font-medium stroke-current text-gray-200 dark:text-gray-600 text-center mx-auto"
	>
		<span slot="legend-caption">
			{{ minutes }} : {{ seconds }}
		</span>
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
			restModeColor: radialTimer.REST_MODE_COLOR,
			// Timer utility package
			// timer: null,
			// Data for the current session
			current: {
				mode: null,
				modeText: "",
				modeColor: "",
				timeLeftText: "",
			},

			timeLeft: 0,
			intervalObject: null,
		}
	},
	props: {
		duration: Number,
		running: Boolean,
	},
	emits: [
		"timeUp",
	],

	computed: {
		minutes() {
			let min = Math.floor(this.timeLeft / time.MS_PER_MIN).toFixed(0);
			return ("00" + min).slice(-2);
		},
		seconds() {
			let seconds = Math.floor((this.timeLeft % time.MS_PER_MIN) / time.MS_PER_SEC).toFixed(0);
			return ("00" + seconds).slice(-2);
		},
		progress() { // return progress as a percentage
			let remaining = this.duration ? this.timeLeft / this.duration : 1;
			return remaining * 100;
		},
	},

	watch: {
		duration() { 
			// if user has autobreak set to false, don't start until they press start
			if (this.running) {
				this.runInterval() 
			}
		},
		running() { 
			if (this.running && !this.intervalObject) {
				this.runInterval();
			}
		},
	},

	methods: {
		runInterval() {
			if (this.intervalObject) {
				clearInterval(this.intervalObject);
			}

			this.timeLeft = this.duration;

			let start = Date.now();
			let pausedAt = null;
			this.intervalObject = setInterval(() => {
				if (this.timeLeft <= 0) {
					clearInterval(this.intervalObject);
					this.$emit('timeUp', this.timeLeft);
				}

				if (this.running) {
					if (pausedAt) { // just resumed, adjust time
						start += Date.now() - pausedAt;
						pausedAt = null;
					}

					let timeElapsed = Date.now() - start;
					// do not let timer go negative
					this.timeLeft = Math.min(this.duration - timeElapsed, this.timeLeft);
				} else if (!pausedAt) { // just began pause
					pausedAt = Date.now();	
				}
			}, 1000);
		},

		// Determine current UI properties: text & color
		currently: function (mode) {
			switch (mode) {
				case 0: // Focusing
					this.current.modeText = "Focusing";
					this.current.modeColor = this.focusModeColor;
					break;

				case 1: // Resting
					this.current.modeText = "Resting";
					this.current.modeColor = this.restModeColor;
					break;

				case 2: // Paused
					this.current.modeText = "Paused";
					break;
				default:
					this.current.modeText = "";
					this.current.modeColor = this.focusModeColor;
					break;
			}
		},
	},
};
</script>
