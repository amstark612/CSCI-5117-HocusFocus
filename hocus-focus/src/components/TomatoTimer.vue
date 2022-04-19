<template>
	<div class="text-center">
		<h1>let's get focused</h1>

		<div class="card timer">
			<div class="flex justify-around w-full">
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

			<div class="clock">
				{{ minutes }}:{{ seconds }}
			</div>

			<div class="flex justify-center gap-x-4">
				<div title="timer-setting" @click="seen = !seen" class="control">
					<!-- <router-link to="/setting"> -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 clickable" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
					</svg><!-- </router-link> -->
				</div>
				
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
			<div v-if="seen" id="hide">
					<button>Timer</button>
					<!-- <button disabled> Theme </button> -->
					<br/>
					<h4> promodora duration : <editable-span :text="this.promdo.toString()" @edited="updatePromo"/></h4> 
					<br/>
					<h4> short break duration : <editable-span :text="this.short.toString()" @edited="updateShort"/></h4><br/>
					<h4> long break duration : <editable-span :text="this.long.toString()" @edited="updateLong"/></h4><br/>
					<h4> long break delay : <editable-span :text="this.delay.toString()" @edited="updateDelay"/></h4><br/>
					<h4> atuo start breaks : <span @click="auto_start_break = !auto_start_break">
						{{this.auto_start_break}}</span></h4><br/>
					<button @click="seen = !seen"> Close X </button>
			</div>
		</div>
	</div>
</template>

<script>
import EditableSpan from './EditableSpan.vue';
export default {
  components: { EditableSpan },
	name: "TomatoTimer",
	data() {
		return {
			cycleCount: 0,
			goal: 1,
			totalFocusTime: 0,
			editGoal: false,
			intervalCount: 0,
			running: false,
			setIntervalObject: null,
			timer: 0,
			seen: false,
			promdo: 25,
			short: 5,
			long: 10,
			delay: 4,
			auto_start_break: true,

			// intervals in milliseconds
			MINUTE: 60000,
			// MINUTE: 2000, // make it easier to test things....
			// will be updated upon mount
			// POMODORO_INTERVAL: 25,
			// SHORT_BREAK: 5,
			LONG_BREAK: 10,

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
			if (this.goal % this.cycleCount == 0) {
				console.log('summary prompt thingy - emit to parent probs');
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
		updatePromo: function(newPromo) {
			this.promdo = parseInt(newPromo)
		},
		updateShort: function(newShort) {
			this.short = parseInt(newShort)
		},
		updateLong: function(newLong) {
			this.long = parseInt(newLong)
		},
		updateDelay: function(newDelay) {
			this.delay = parseInt(newDelay)
		}
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
	/* @apply bg-pastel-green-200; */
	@apply bg-gradient-to-b;
	@apply from-pastel-green-100;
	@apply to-pastel-green-200;
	@apply text-pastel-green-500;
}

.clock {
	@apply flex;
	@apply justify-center;
	@apply items-center;

	/*
	@apply bg-pastel-yellow-200;
	*/
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
