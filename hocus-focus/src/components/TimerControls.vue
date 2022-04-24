<template>
	<div>
		<div class="flex justify-center gap-x-4">
			<div title="timer-setting" class="control">
				<BaseIcon
					@clicked="showSettings = true"
					:properties="{
						height: 'h-8',
						width: 'w-8',
						strokeWidth: '1.5',
						classes: ['stroke-pastel-green-500'],
					}"
					:dArray="['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z']"
				/>
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
						'M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
					]"
				/>
			</div>

			<div title="Skip the current round">
				<BaseIcon
					@clicked="$emit('skipInterval')"
					:properties="{
						height: 'h-8',
						width: 'w-8',
						strokeWidth: '1.5',
						classes: ['stroke-pastel-green-500'],
					}"
					:dArray="['M13 5l7 7-7 7M5 5l7 7-7 7']"
				/>
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
		};
	},
	props: {
		running: Boolean,
	},
	emits: ["pause", "resume", "runInterval", "skipInterval"],
	components: {
		BaseIcon,
		TimerSettings,
	},
};
</script>
