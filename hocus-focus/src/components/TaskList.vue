<template>
	<div id="task-list" class="mt-6">
		<header class="flex justify-center gap-x-1">
			<div class="clickable pt-1" @click="addTask = !addTask" title="Click here to add a task">
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					class="h-7 w-7 stroke-pastel-yellow-400 drop-shadow-md" 
					fill="none" 
					viewBox="0 0 24 24" 
					stroke="currentColor" 
					stroke-width="2"
				>
					<path 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<div>
				<h1>tasks</h1>
			</div>
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
			addTask: false,
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
