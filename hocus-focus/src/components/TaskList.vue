<template>
	<div id="task-list" class="mt-6">
		<BaseTaskItem
			v-for="task in tasks"
			:key="task.id"
			:task="task"
			@delete="deleteTask"
		/>
	</div>
</template>

<script>
import { auth, db } from '@/main';
import BaseTaskItem from '@/components/BaseTaskItem.vue';

export default {
	name: 'TaskList',
	data() {
		return {
			tasks: [],
		}
	},
	components: {
    BaseTaskItem,
	},

	firestore() {
		return {
			tasks:  db.collection("tasks")
								.where("userId", "==", auth.currentUser.uid)
								.orderBy("createdAt")
		}
	},

	methods: {
		deleteTask(taskId) {
			console.log('leave me alone linter', taskId);
			console.log('delete task from db and refresh list...');
		}
	}
}
</script>
