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

					goal cycles
				</div>
			</div>

			<div>
				Timer
			</div>

			<div class="flex justify-center gap-x-4">
				<div>Pause</div>
				<div>Short</div>
				<div>Long</div>
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
		}
	},
};
</script>
