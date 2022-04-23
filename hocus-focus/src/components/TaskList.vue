<template>
	<div id="task-list" class="mt-6">
		<header class="flex justify-center gap-x-1">
			<AddTask @added="tasksKey += 1" />
			<div><h1>tasks</h1></div>
		</header>

		<div v-if="tasks.length == 0" class="flex flex-col items-center justify-center text-center m-4">
			<BaseIcon 
				:height="'h-9'"
				:width="'w-9'"
				:strokeWidth="'1.5'"
				:d="'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'"
			/>
			<div class="m-2">no tasks on deck!</div>
		</div>

		<div v-if="!user" class="text-center m-4">
			<router-link to="/login" class="text-pastel-yellow-400">log in</router-link>
			to add a task!
		</div>

		<div v-if="user">
			<TaskItem
				v-for="task in tasks"
				:key="task.id"
				:task="task"
				@delete="deleteTask"
				@title="updateTask"
				@tags="updateTask"
				@progress="updateTask"
			/>
		</div>
	</div>
</template>

<script>
import { auth, db } from "@/main";
import AddTask from "@/components/AddTask.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import TaskItem from "@/components/TaskItem.vue";

export default {
	name: "TaskList",
	data() {
		return {
			firestoreRef: db.collection("users")
											.doc(auth.currentUser.uid)
											.collection("tasks"),
			tasks: [],
			tasksKey: 0,
			user: null,
		};
	},
	components: {
		AddTask,
		BaseIcon,
		TaskItem,
	},

	beforeCreate() {
		auth.onAuthStateChanged(user => this.user = user ? user : null);
	},

	watch: {
		user() { if (this.user) this.fetchData(); },
		tasksKey() { if (this.user) this.fetchData(); },
	},

	methods: {
		fetchData() {
			this.tasks = [];

			this.firestoreRef.get().then(res => {
					res.forEach(doc => {
						// this is hacky but doc.data() never includes the id - if someone else knows how to get around this lmk!
						this.tasks.push({
							id: doc.id,
							createdAt: doc.data().createdAt,
							userId: doc.data().userId,
							title: doc.data().title,
							tags: doc.data().tags,
							progress: doc.data().progress,
						})
					});
			});
		},
		deleteTask(taskId) {
			this.firestoreRef.doc(taskId)
				.delete()
				.then(() => {
					console.log("succesfully deleted task!");
					this.tasksKey += 1;
			});
		},
		updateTask(taskId, property) {
			if (property.progress) {
				console.log('emit task id to parent or something so we can track number of tasks worked on');
			} else if (property.tags) {
				console.log('stub for parsing tags...');
			}

			this.firestoreRef.doc(taskId)
				.update(property)
				.then(() => {
					console.log('successfuly updated task', property);
					this.tasksKey += 1;
				})
		},
	},
};
</script>
