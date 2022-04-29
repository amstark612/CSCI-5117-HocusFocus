<template>
	<div
		class="clickable pt-1"
		@click="addTask"
		title="Click here to add a task"
	>
		<BaseIcon 
			:properties="{
				height: 'h-7',
				width: 'w-7',
				strokeWidth: '1.5',
				classes: [
					'stroke-pastel-yellow-400',
					'drop-shadow-md'
				],
			}"
			:dArray="['M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z']" 
		/>
	</div>
</template>

<script>
import { auth, db, fieldValueUtility } from "@/main";
import BaseIcon from "@/components/BaseIcon.vue";

export default {
	name: "AddTask",
	emits: ['added'],
	components: {
		BaseIcon,
	},
	methods: {
		addTask() {
			db.collection("users")
				.doc(auth.currentUser.uid)
				.collection("tasks")
				.add({
					userId: auth.currentUser.uid,
					createdAt: fieldValueUtility.serverTimestamp(),
					title: "Tap to edit title",
					tags: [],
					progress: 0,
				})
				.then((ref) => {
					this.$emit('added', ref.id);
				});
		},
	},
};
</script>
