<template>
	<div class="text-center">
		<h1>let's get focused</h1>

		<div class="card timer">
			<div class="flex justify-around w-full">
				<div>{{ pomodoroCount }} / 4 intervals</div>

				<div>
					{{ cycleCount }}
					/
					<EditableSpan
						:text="goal.toString()"
						:inputType="'number'"
						:classes="'bg-pastel-green-100 w-5'"
						@edited="goal = parseInt($event)"
					/>
					cycles
				</div>
			</div>

			<TimerProgressBar 
				:running="running"
				:duration="intervalDuration" 
				@timeUp="timeUp"
			/>

			<div class="flex justify-center gap-x-4">
				<div title="timer-setting" @click="seen = !seen" class="control">
					<!-- <router-link to="/setting"> -->
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 clickable"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					><!-- </router-link> -->
				</div>

				<div title="Play/Pause">
					<BaseIcon 
						v-if="running"
						@clicked="running = false"
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="['M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z']"
					/>

					<BaseIcon
						v-else
						@clicked="running = true"
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z',
							'M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						]"
					/>
				</div>

				<div title="Short Break" @click="runInterval(short)">
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

				<div title="Long Break" @click="runInterval(long)">
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
					<h4> promodora duration : 
						<span class="clickable" @click="minusPromo">
							-
						</span>
						<editable-span :text="this.promdo.toString()" @edited="updatePromo"/>
						<span class="clickable" @click="addPromo">
							+
						</span>
					</h4> 
					<br/>
					<h4> short break duration : 
						<span class="clickable" @click="minusShort">
							-
						</span>
						<editable-span :text="this.short.toString()" @edited="updateShort"/>
						<span class="clickable" @click="addShort">
							+
						</span>
					</h4>
					<br/>
					<h4> long break duration : 
						<span class="clickable" @click="minusLong">
							-
						</span>
						<editable-span :text="this.long.toString()" @edited="updateLong"/>
						<span class="clickable" @click="addLong">
							+
						</span>
					</h4>
					<br/>
					<h4> long break delay : 
						<span class="clickable" @click="minusDelay">
							-
						</span>
						<editable-span :text="this.delay.toString()" @edited="updateDelay"/>
						<span class="clickable" @click="addDelay">
							+
						</span>
					</h4>
					<br/>
					<h4> atuo start breaks : <span @click="auto_start_break = !auto_start_break">
						{{this.auto_start_break}}</span></h4><br/>
					<button @click="seen = !seen"> Close X </button>

			</div>
		</div>
	</div>
</template>

<script>
import { auth, db } from "@/main";
import { pomodoro, time } from "@/constants";
import BaseIcon from "@/components/BaseIcon.vue";
import EditableSpan from "./EditableSpan.vue";
import TimerProgressBar from "./TimerProgressBar.vue";

export default {
	name: "TomatoTimer",
	data() {
		return {
			seen: false,

			cycleCount: 0,			// count of number of pomodoro cycles user has completed
			goal: 1,						// count of cycles the user aims to complete
			intervalCount: 0,		// count of any interval type user has begun
			pomodoroCount: 0,		// count of pomodoro intervals user has completed
			timer: 0,

			totalFocusTime: 0,

			// used for running timer
			intervalDuration: null,
			settings: null,			// user's timer settings
			running: false,

			firestoreRef: null,
		};
	},
	components: {
    BaseIcon,
    EditableSpan,
    TimerProgressBar,
	},

	computed: {
		delay() { return this.settings?.delay * time.MS_PER_MIN },
		pomodoro() { return this.settings?.pomodoro * time.MS_PER_MIN },
		long() { return this.settings?.long * time.MS_PER_MIN },
		short() { return this.settings?.short * time.MS_PER_MIN },

		currentIntervalType() {
			return pomodoro.CYCLE[this.intervalCount % pomodoro.CYCLE.length];
		},
	},

	watch: {
		pomodoroCount() { // a cycle includes exactly 4 pomodoros
			this.cycleCount += !(this.pomodoroCount % 4) ? 1 : 0;
		},
		cycleCount() {
			if (!(this.goal % this.cycleCount)) {
				console.log("summary prompt thingy - emit to parent probs");
				// possibly reset something or other here...? otherwise would need to show summary for every subsequent cycle?
			}
		},
	},

	mounted() {
		this.fetchSettings();
	},

	methods: {
		fetchSettings() {
			if (auth.currentUser) {
				this.firestoreRef = db.collection("users")
															.doc(auth.currentUser.uid)
															.collection("timer_settings");

				this.firestoreRef.doc('0')
						.get().then(doc => {
							if (doc.exists) {
								this.settings = {
									autobreak: doc.data().autobreak,
									delay: doc.data().delay,
									long: doc.data().long,
									pomodoro: doc.data().pomodoro,
									short: doc.data().short,
								}
							}	
				});
			}
		},
		timeUp(timeElapsed) {
			this.running = false;

			if (this.currentInterval === 'POMODORO') {
				this.intervalCount += 1;
				this.totalFocusTime += timeElapsed;

			}

			let nextIntervalType = this.currentInterval;
			this.intervalDuration = this.settings[nextIntervalType];
			this.running = this.settings.autobreak;
		},
		runInterval(duration) {
			this.intervalDuration = duration;
			this.running = true;
		},

		updateDelay: function(newDelay) {
			this.delay = parseInt(newDelay)
		},
		minusPromo: function() {
			this.promdo = this.promdo - 1
		},
		addPromo: function() {
			this.promdo = this.promdo + 1
		},
		minusShort: function() {
			this.short = this.short - 1
		},
		addShort: function() {
			this.short = this.short + 1
		},
		minusLong: function() {
			this.long = this.long - 1
		},
		addLong: function() {
			this.long = this.long + 1
		},
		minusDelay: function() {
			this.delay = this.delay - 1
		},
		addDelay: function() {
			this.delay = this.delay + 1
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
