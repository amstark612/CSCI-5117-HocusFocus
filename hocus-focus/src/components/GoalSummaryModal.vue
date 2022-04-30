<template>
	<BaseModal
		:popupClasses="['bg-pastel-yellow-100', 'border-pastel-yellow-500']"
	>
		<template v-slot:body>
			<div class="text-center">
				<div class="sm:px-16">
					You have concentrated for {{ focusTime / 60000 }} minutes
				</div>

				<br />
				<div class="sm:px-16">You have been working on {{ taskIds }}</div>

				<br />

				<div class="flex justify-center" @click="close">
					Start a new session &nbsp;
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
						]"
					/>
				</div>
			</div>
		</template>

		<template v-slot:footer> </template>
	</BaseModal>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";
import BaseModal from "@/components/BaseModal.vue";
export default {
	name: "GoalSummaryModal",
	data() {
		return {
			showSummary: false,
		};
	},
	props: {
		focusTime: Number,
		taskIds: Array,
	},
	components: {
		BaseIcon,
		BaseModal,
	},
	methods: {
		close() {
			this.$emit("closeSummaryPrompt", false);
		},
	},
};
</script>

<style></style>
