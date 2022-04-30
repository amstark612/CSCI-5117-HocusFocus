<template>
	<div class="card prompt">
		<div class="flex gap-2 sm:gap-10 items-center">
			<BaseIcon
				:dArray="[
					'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
				]"
			/>
			<h1 class="text-xl sm:text-3xl">Mission accomplished!</h1>
			<BaseIcon
				:dArray="[
					'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
				]"
			/>
		</div>

		<div class="sm:px-16">
			Update your progress on any tasks and click below when you're ready to
			view your session summary!
		</div>

		<div @click="openGoalSummary">
			<BaseIcon
				:properties="{
					height: 'h-8',
					width: 'w-8',
					strokeWidth: '1.5',
					classes: ['stroke-pastel-green-500'],
				}"
				:dArray="['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z']"
			/>
			Ready!
		</div>
	</div>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";
export default {
	name: "GoalCompleted",
	props: {},
	components: {
		BaseIcon,
	},
	methods: {
		openGoalSummary() {
			this.$emit("showSummary", true);
		},
	},
};
</script>

<style></style>
