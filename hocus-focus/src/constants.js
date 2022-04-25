export const time = {
	MS_PER_SEC: 1000,
	SEC_PER_MIN: 60,
	MS_PER_MIN: 60 * 1000,
};

export const pomodoro = {
	DEFAULT_SETTINGS: {
		delay: 4,
		autobreak: true,
		long: 10 * time.MS_PER_MIN,
		pomodoro: 25 * time.MS_PER_MIN,
		short: 5 * time.MS_PER_MIN,
		goalCycles: 1,
	},

	TIME_FIELDS: [
		'long',
		'pomodoro',
		'short'
	],
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

	pomodoro: {
		mode: "Focus",
		color:  {
			radial: true,
			colors: [
				{
					color: "#e25b45",
					offset: "50",
					opacity: "0.4",
				},
			],
		},
	},

	long: {
		mode: "Long Break",
		color: {
			radial: true,
			colors: [
				{
					color: "#68cabb",
					offset: "50",
					opacity: "0.4",
				},
			],
		},
	},

	short: {
		mode: "Short Break",
		color: {
			radial: true,
			colors: [
				{
					color: "#94b540",
					offset: "50",
					opacity: "0.4",
				},
			],
		},
	},
};
