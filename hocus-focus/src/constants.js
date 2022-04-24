export const time = {
	MS_PER_SEC: 1000,
	SEC_PER_MIN: 60,
	MS_PER_MIN: 60 * 1000,
};

export const pomodoro = {
	DEFAULT_SETTINGS: {
		delay: 4,
		autobreak: true,
		long: 10,
		pomodoro: 25,
		short: 5,
		goalCycles: 1,
	},
};

export const settingsLabel = [
	{
		label: "pomodoro duration",
		field: "pomodoro",
	},
	{
		label: "short break duration",
		field: "short",
	},
	{
		label: "long break duration",
		field: "long",
	},
	{
		label: "long break delay",
		field: "delay",
	},
	{
		label: "goal # of cycles",
		field: "goalCycles",
	},
];

export const radialTimer = {
	// Radial progress bar options

	FOCUS_MODE_COLOR: {
		radial: true,
		colors: [
			{
				color: "#ff4e4d",
				offset: "50",
				opacity: "0.4",
			},
		],
	},

	LONG_BREAK_MODE_COLOR: {
		radial: true,
		colors: [
			{
				color: "#0bbddb",
				offset: "50",
				opacity: "0.4",
			},
		],
	},

	SHORT_BREAK_MODE_COLOR: {
		radial: true,
		colors: [
			{
				color: "#05ec8c",
				offset: "50",
				opacity: "0.4",
			},
		],
	},
};
