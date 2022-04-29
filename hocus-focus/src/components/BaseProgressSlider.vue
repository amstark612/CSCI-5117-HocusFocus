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

/* clear default styles */
input[type=range] {
    -webkit-appearance: none;
    @apply w-full;
    @apply bg-transparent;
}

input[type=range]::-ms-track {
    @apply w-full;
    cursor: pointer;

    @apply bg-transparent;
    @apply border-transparent;
    @apply text-transparent;
}

/* thumb slider stuffs */
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    @apply bg-pastel-green-200;
    @apply border-pastel-green-400;
    @apply rounded-full;
    @apply w-4;
    @apply h-4;
    @apply drop-shadow-sm;
    cursor: pointer;
    margin-top: -5px; /* chrome, idk */
}

input[type=range]::-moz-range-thumb {
    @apply bg-pastel-green-200;
    @apply border-pastel-green-400;
    @apply rounded-full;
    @apply w-4;
    @apply h-4;
    @apply drop-shadow-sm;
    cursor: pointer;
}

input[type=range]::-ms-thumb {
    @apply bg-pastel-green-200;
    @apply border-pastel-green-400;
    @apply rounded-full;
    @apply w-4;
    @apply h-4;
    cursor: pointer;
}

input[type=range]:focus {
    @apply outline-none;
}

/* track slider stuffs */
input[type=range]::-webkit-slider-runnable-track {
    @apply w-full;
    @apply h-1.5;
    @apply bg-pastel-yellow-300;
    @apply drop-shadow-md;
    @apply border-pastel-yellow-500;
    @apply rounded-lg;
    cursor: pointer;
}

input[type=range]:focus::-webkit-slider-runnable-track {
    @apply bg-pastel-yellow-300;
    @apply border-pastel-yellow-500;
    @apply drop-shadow-md;
}

input[type=range]::-moz-range-track {
    @apply w-full;
    @apply h-1.5;
    @apply bg-pastel-yellow-300;
    @apply border-pastel-yellow-500;
    @apply drop-shadow-md;
    @apply rounded-lg;
    cursor: pointer;
}
</style>
