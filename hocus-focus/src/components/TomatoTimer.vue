<template>
	<div class="text-center">
		<h1>let's get focused</h1>

		<div class="card flex flex-col gap-y-6 mt-4 border-pastel-green-500 bg-pastel-green-200">
			<div class="flex justify-around">
				<div>
					{{ intervalCount }} / 4 intervals
				</div>

				<div>
					{{ cycleCount }} 
					/ 
					<span 
						v-if="!editGoal"
						class="clickable" 
						title="Click to edit"
						@click="editGoal = !editGoal"
					>
						{{ goal }}
					</span>
					<input
						v-if="editGoal"
						v-model="goal"
						type="number"
						class="w-5 pl-1 bg-lime-100"
						@blur="editGoal = !editGoal"
						v-on:keyup.enter="editGoal = !editGoal"
					/>
					cycles
				</div>
			</div>

			<div class="text-4xl">
				{{ minutes }}:{{ seconds }}
			</div>

			<div class="flex justify-center gap-x-4">
				<div title="Play/Pause">
					<svg 
						v-if="running"
						@click="running = false"
						xmlns="http://www.w3.org/2000/svg" 
						class="h-8 w-8 clickable" 
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor" 
						stroke-width="1.5"
					>
						<path 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" 
						/>
					</svg>

					<svg 
						v-if="!running"
						@click="running = true"
						xmlns="http://www.w3.org/2000/svg" 
						class="h-8 w-8 clickable" 
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor" 
						stroke-width="1.5"
					>
						<path 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
						/>
						<path 
							stroke-linecap="round" 
							stroke-linejoin="round" 
							d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
						/>
					</svg>
				</div>

				<div title="Short Break" @click="runInterval(SHORT_BREAK)">
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						class="h-8 w-8 clickable" 
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor" 
						stroke-width="1.5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
					</svg>
				</div>

				<div title="Long Break" @click="runInterval(LONG_BREAK)">
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						class="h-8 w-8 clickable" 
						fill="none" 
						viewBox="0 0 24 24" 
						stroke="currentColor" 
						stroke-width="1.5"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
					</svg>
					</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TomatoTimer",
	data() {
		return {
			cycleCount: 0,
			goal: 0,
			totalFocusTime: 0,
			editGoal: false,
			intervalCount: 0,
			running: false,
			setIntervalObject: null,
			timer: 0,
			// CTN_TODO: dunno if we need this or not
			shortBreakTimer: 0,
			longBreakTimer: 0,

			// intervals in milliseconds
			MINUTE: 60000,
			// MINUTE: 2000, // make it easier to test things....
			// will be updated upon mount
			// POMODORO_INTERVAL: 25,
			// SHORT_BREAK: 5,
			LONG_BREAK: 20,

			// make it easier to test things.....
			POMODORO_INTERVAL: 5,
			SHORT_BREAK: 2,
			//LONG_BREAK: 3,
		}
	},
	computed: {
		minutes() {
			let min = Math.floor(this.timer / this.MINUTE).toFixed(0);
			return ('00' + min).slice(-2);
		},
		seconds() {
			let seconds = Math.floor((this.timer % this.MINUTE) / 1000).toFixed(0);
			return ('00' + seconds).slice(-2);
		}
	},

	watch: {
		intervalCount() {
			if (this.intervalCount == 4) {
				this.cycleCount += 1;
				this.intervalCount = 0;
			}
		},
		cycleCount() {
			if (this.cycleCount == this.goal) {
				console.log('summary prompt thingy');
			}
		}
	},

	mounted() {
		this.POMODORO_INTERVAL *= this.MINUTE;
		this.SHORT_BREAK *= this.MINUTE;
		this.LONG_BREAK *= this.MINUTE;
	},

	methods: {
		runInterval(duration) {
			if (this.setIntervalObject) {
				clearInterval(this.setIntervalObject);
			}

			this.timer = duration;
			this.running = true;

			let start = Date.now();
			this.setIntervalObject = setInterval(() => {
				if (this.timer <= 0) {
					// do other stuff depending on what duration is & num goals & num cycles
					if (duration == this.POMODORO_INTERVAL) {
						this.intervalCount += 1; // CTN_TODO maybe this should be renamed to pomodoroCount?
						this.totalFocusTime += this.POMODORO_INTERVAL;
					}

					this.running = false;
					clearInterval(this.setIntervalObject);
				}

				if (this.running) {
					let timeElapsed = Date.now() - start;
					let timeLeft = duration - timeElapsed;
					this.timer = timeLeft < 0 ? 0 : timeLeft;
				}
			}, 1000);
		},
	},
};
</script>
