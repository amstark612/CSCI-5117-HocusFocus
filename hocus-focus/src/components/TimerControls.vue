<template>
	<div>
		<div class="flex justify-center gap-x-4">
			<div
				title="timer-setting"
				class="control"
				data-bs-toggle="modal"
				data-bs-target="#timerSettingsModal"
			>
				<BaseIcon
					:properties="{
						height: 'h-8',
						width: 'w-8',
						strokeWidth: '1.5',
						classes: ['stroke-pastel-green-500'],
					}"
					:dArray="[
						'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
						'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
					]"
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
		<!-- <TimerSettings :show="showSettings" @close="updateSettings" /> -->
	</div>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";

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
	emits: ["updateSettings", "pause", "resume", "runInterval", "skipInterval"],
	components: {
		BaseIcon,
	},

	methods: {
		updateSettings() {
			this.showSettings = false;
			this.$emit("updateSettings");
		},
	},
};
</script>
