<template>
	<div>
		<div class="flex justify-center gap-x-4">
			<div title="timer-setting" @click="showSettings = true" class="control">
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
					@clicked="$emit('pause')"
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
					@clicked="$emit('resume')"
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

			<div title="Short Break" @click="$emit('runInterval', 'short')">
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

			<div title="Long Break" @click="$emit('runInterval', 'long')">
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

		<!-- CTN_TODO need to update some key here and then emit to parent to refresh -->
		<TimerSettings :show="showSettings" @close="showSettings = false" />

	</div>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";
import TimerSettings from "@/components/TimerSettings.vue";


export default {
	name: "TimerControls",
	data() {
		return {
			showSettings: false,
		}
	},
	props: {
		running: Boolean,
	},
	emits: [
		'pause',
		'resume',
		'runInterval', 
	],
	components: {
		BaseIcon,
		TimerSettings,
	},
};
</script>
