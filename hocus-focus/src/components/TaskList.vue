<template>
	<div id="task-list" class="mt-6">
		<header>
			<h1>tasks</h1>
		</header>

		<BaseAddTaskItem v-if="addTask" />

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
import BaseAddTaskItem from './BaseAddTaskItem.vue';
import BaseTaskItem from '@/components/BaseTaskItem.vue';

export default {
	name: 'TaskList',
	data() {
		return {
			addTask: true,
			tasks: [],
		}
	},
	components: {
    BaseAddTaskItem,
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
			db.collection('tasks').doc(taskId).delete().then(() => {
				console.log('succesfully deleted task!');
			})
		}
	}
}
</script>
