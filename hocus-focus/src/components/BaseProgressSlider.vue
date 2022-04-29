<template>
	<div class="w-full">
		<div class="flex mb-2 items-center justify-between">
			<div>
				<span class="status" :class="statusClass">
					{{ status }}
				</span>
			</div>
			<div class="text-right">
				<span class="text-xs">
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
    computed: {
        status() {
            return this.percentage == 100 ? 'Complete' : 'In progress';
        },
        statusClass() {
            return this.percentage == 100 ? 'complete' : 'incomplete';
        },
    },
};
</script>

<style scoped>
.status {
	@apply text-xs;
	@apply inline-block;
	@apply uppercase;
    @apply rounded-lg;
    @apply p-1;
}

.incomplete {
    @apply bg-pastel-yellow-200;
}

.complete {
    @apply bg-pastel-green-100;
}
</style>
