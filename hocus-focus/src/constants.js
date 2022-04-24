export const time = {
	MS_PER_SEC: 		1000,
	SEC_PER_MIN:		60,
	MS_PER_MIN:			60 * 1000,
};

export const pomodoro = {
	DEFAULT_SETTINGS: {
		delay: 4,
		autobreak: true,
		long: 10,
		pomodoro: 25,
		short: 5,
	},
};

export const radialTimer = {
	// Radial progress bar options
	REST_MODE_COLOR: 		"#2ecc71",
	FOCUS_MODE_COLOR:		"#6366f1",

	EMPTY_COLOR: {
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

	EMPTY_COLOR_FILL: {
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
};