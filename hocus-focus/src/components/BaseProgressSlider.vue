<template>
	<div class="w-full">
		<div class="flex mb-2 items-center justify-between">
			<div>
				<span
					v-if="percentage < 100" class="status">
					In progress
				</span>
				<span v-else class="status">
					Completed
				</span>
			</div>
			<div class="text-right">
				<span class="text-xs inline-block">
					{{ percentage }}%
				</span>
			</div>
		</div>
		<input
			type="range"
			:value="percentage"
			min="0"
			max="100"
			step="5"
			class="w-full"
			@change="$emit('progress', $event.target.value)"
		/>
	</div>
</template>

<script>
export default {
	name: "BaseProgressSlider",
	props: {
		percentage: Number,
	},
	emits: ['progress'],
};
</script>

<style scoped>
.status {
	@apply text-xs;
	@apply inline-block;
	@apply uppercase;
}
</style>
