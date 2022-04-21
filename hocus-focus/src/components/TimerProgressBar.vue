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
			<span>{{ minPrefix }}{{ min }}</span>
			<span class="mx-2">:</span>
			<span>{{ secPrefix }}{{ sec }}</span>
		</span>
	</vep>
</template>

<script>
// import Interval from "../helpers/interval";
export default {
	name: "TimerProgressBar",
	data: () => ({
		progress: 80,
		sec: 0,
		min: 20,
		emptyColor: {
			radial: true,
			colors: [
				{
					color: "#3260FC",
					offset: "50",
					opacity: "0.15",
				},
				{
					color: "#3260FC",
					offset: "70",
					opacity: "0.15",
				},
				{
					color: "#3260FC",
					offset: "70",
					opacity: "0.1",
				},
				{
					color: "#3260FC",
					offset: "90",
					opacity: "1",
				},
				{
					color: "#3260FC",
					offset: "60",
					opacity: "1",
				},
				{
					color: "#3260FC",
					offset: "0",
					opacity: "0",
				},
			],
		},
		emptyColorFill: {
			radial: true,
			colors: [
				{
					color: "#3260FC",
					offset: "50",
					opacity: "0.2",
				},
				{
					color: "#3260FC",
					offset: "50",
					opacity: "0.15",
				},
				{
					color: "#3260FC",
					offset: "70",
					opacity: "0.15",
				},
				{
					color: "#3260FC",
					offset: "70",
					opacity: "0.1",
				},
				{
					color: "#3260FC",
					offset: "90",
					opacity: "0.1",
				},
				{
					color: "transparent",
					offset: "90",
					opacity: "0.1",
				},
				{
					color: "transparent",
					offset: "95",
					opacity: "0.1",
				},
				{
					color: "transparent",
					offset: "95",
					opacity: "0.1",
				},
			],
		},
		// Timer utility package
		timer: null,
		// Data for the current session
		current: {
			mode: null,
			modeText: "",
			modeColor: "",
			timeLeft: 0,
			timeLeftText: "",
		},

		// Radial progress bar options
		restModeColor: "#2ecc71",
		focusModeColor: "#6366f1",
	}),
	computed: {
		minPrefix() {
			return this.min < 10 ? "0" : "";
		},
		secPrefix() {
			return this.sec < 10 ? "0" : "";
		},
	},
	methods: {
		runTimer() {
			if (this.sec === 60) {
				this.sec = 0;
				this.min++;
				this.progress = (this.sec * 100) / 60;
				return;
			}
			this.sec++;
			this.progress = (this.sec * 100) / 60;
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
	mounted() {
		setInterval(this.runTimer, 1000);
	},
};
</script>

<style></style>
