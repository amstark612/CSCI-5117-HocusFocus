<template>
	<div id="task-list" class="mt-6">
		<header class="flex justify-center gap-x-1">
			<AddTask @added="fetchData" />
			<div><h1>tasks</h1></div>
		</header>


		<div v-if="user">
			<div id="tag-list">
				<div id="tag" v-for="tag in uniqueTags" :key="tag">
                    <span class="tag-link clickable" v-on:click="currentTag = tag"> {{tag}} </span>
				</div>
			</div>
			<span class="clear-tag clickable" v-on:click="currentTag = null"> clear filter </span>
            <div v-if="currentTag === null">
                <TaskItem
                    v-for="task in filteredTasks"
                    :key="task.id"
                    :task="task"
                    @delete="deleteTask"
                    @title="updateTask"
                    @tags="updateTask"
                    @progress="updateTask"
                />
            </div>
            <div v-if="currentTag !== null">
                <TaskItem
                    v-for="task in tagedTasks"
                    :key="task.id"
                    :task="task"
                    @delete="deleteTask"
                    @title="updateTask"
                    @tags="updateTask"
                    @progress="updateTask"
                />
            </div>
		</div>
	</div>
</template>

<script>
import { auth, db, provider } from "@/main";
import { registerUser } from "@/authUtilities";
import AddTask from "@/components/AddTask.vue";
import TaskItem from "@/components/TaskItem.vue";

export default {
	name: "TaskList",
	data() {
		return {
			firestoreRef: null,
			tasks: [],
			user: null,
            currentTag: null,
		};
	},
    emits: ["trackTask"],
	components: {
		AddTask,
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
        filteredTasks() {
            return this.$route.name === "home"
                ? this.tasks.filter(task => task.progress < 100)
                : this.tasks;
        },
        uniqueTags() {
            let tags = [];
            this.tasks.forEach(task => tags.push(task.tags));
            return [...new Set(tags.flat())];
        },
        tagedTasks() {
			// return this.$route.name === "home"
            //     ? this.tasks.filter(task => task.progress < 100 && task.tags.includes(this.currentTag))
            //     : this.tasks;
            return this.tasks.filter(task => task.progress <= 100 && task.tags.includes(this.currentTag));
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

<style scoped>
#tag {
    text-align: center;
    border-radius: 50px;
    padding-left: 1%;
    padding-right: 1%;
    margin-right: 2%;
    display: inline;
	
	@apply bg-pastel-yellow-200;
	@apply text-pastel-blue-500;
}

#tag-list {
	display: inline;
}

.clear-tag {
	text-align: center;
    border-radius: 50px;
    padding-left: 1%;
    padding-right: 1%;
    /* margin-left: 55%; */
    display: inline;
	@apply bg-pastel-green-100;
	@apply text-pastel-orange-300;
}
</style>
