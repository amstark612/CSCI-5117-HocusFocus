<template>
	<div id="task-list" class="mt-6">
        <header class="flex justify-center gap-x-1">
			<!-- <AddTask @added="fetchData" /> -->
			<div><h1>tasks</h1></div>
		</header>

		<!-- <div
			v-if="user && tasks.length == 0"
			class="flex flex-col items-center justify-center text-center m-4"
		>
			<BaseIcon
				:properties="{
					height: 'h-9',
					width: 'w-9',
					strokeWidth: '1.5',
					clickable: false,
				}"
				:dArray="[
					'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
				]"
			/>
			<div class="m-2">no tasks on deck!</div>
		</div> -->

		<!-- <div v-if="!user" class="text-center m-4">
			<span 
                class="text-pastel-yellow-400 clickable"
                @click="socialLogin"
            >
				log in
            </span>
			to add a task!
		</div> -->
		<div v-if="user">
			<TaskItem
				v-for="task in allTagedTasks"
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
import { auth, db, provider } from "@/main";
import { registerUser } from "@/authUtilities";
// import AddTask from "@/components/AddTask.vue";
// import BaseIcon from "@/components/BaseIcon.vue";
import TaskItem from "@/components/TaskItem.vue";

export default {
	name: "AllTasksTaged",
    props: ['tag'],
	data() {
		return {
			firestoreRef: null,
			tasks: [],
			user: null,
		};
	},
    emits: ["trackTask"],
	components: {
		// AddTask,
		// BaseIcon,
		TaskItem,
	},

	beforeCreate() {
		auth.onAuthStateChanged((user) => (this.user = user ? user : null));
	},

	watch: {
		user() {
			if (this.user) {
				this.firestoreRef = db
					.collection("users")
					.doc(auth.currentUser.uid)
					.collection("tasks");
				this.fetchData();
			}
		},
	},

    computed: {
        allTagedTasks() {
            return this.tasks.filter(task => task.progress <= 100 && task.tags.includes(this.tag));
        }
    },

	methods: {
		socialLogin() {
			auth
				.signInWithPopup(provider)
				.then(() => {
					this.registerAccount();
                    this.fetchData();
				})
				.catch((err) => {
					alert("Oops. " + err.message);
				});
		},
		fetchData() {
            if (this.firestoreRef) {
				this.firestoreRef.get().then((res) => {
					this.tasks = [];
					res.forEach((doc) => {
						// this is hacky but doc.data() never includes the id - if someone else knows how to get around this lmk!
						this.tasks.push({
							id: doc.id,
							createdAt: doc.data().createdAt,
							userId: doc.data().userId,
							title: doc.data().title,
							tags: doc.data().tags,
							progress: doc.data().progress,
						});
					});
				});
            }
		},
		deleteTask(taskId) {
			this.firestoreRef
				.doc(taskId)
				.delete()
				.then(() => {
					console.log("succesfully deleted task!");
					this.fetchData();
				});
		},
		updateTask(taskId, property) {
			if (property.progress) {
                this.$emit("trackTask", taskId);
			} else if (property.tags) {
				console.log("stub for parsing tags...");
			}

			this.firestoreRef
				.doc(taskId)
				.update(property)
				.then(() => this.fetchData());
		},

		registerAccount() {
			if (auth.currentUser) {
                registerUser(auth.currentUser);
                this.fetchData();
			}
		},
	},
};
</script>
