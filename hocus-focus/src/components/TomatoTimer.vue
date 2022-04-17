<template>
	<div class="text-center">
		<h1>let's get focused</h1>

		<div class="flex flex-col gap-y-6 mt-4 rounded-lg border border-lime-600 bg-lime-200 p-3 my-2">
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

			<div>
				Timer
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

				<div title="Short Break">
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

				<div title="Long Break">
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
			editGoal: false,
			intervalCount: 0,
			running: false,
			timer: 0,
			shortBreakTimer: 0,
			longBreakTimer: 0,
			// intervals in milliseconds
			MINUTE: 60000,
			// will be updated upon mount
			POMODORO_INTERVAL: 25,
			SHORT_BREAK: 5,
			LONG_BREAK: 20,
		}
	},

	mounted() {
		this.POMODORO_INTERVAL *= this.MINUTE;
		this.SHORT_BREAK *= this.MINUTE;
		this.LONG_BREAK *= this.MINUTE;
	},

	watch: {
		running() {
			// if the clock isn't running, check whether the timer is at pomodoro time
			// if it is, what happens next depends on how many intervals and cycles has elapsed
			// if (!this.running) {
			// 	if (this.timer < this.POMODORO_INTERVAL) {
			// 			
			// 	}
			// }
		}
	},

	methods: {

	}
};
</script>
