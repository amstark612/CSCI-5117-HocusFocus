<template>
	<div id="task-list" class="mt-6">
		<header class="flex justify-center gap-x-1">
			<AddTask v-if="user" @added="fetchData" />
			<div><h1>tasks</h1></div>
		</header>

		<div v-if="user && tasks.length == 0" class="flex flex-col items-center justify-center text-center m-4">
			<BaseIcon 
				:properties="{
					height: 'h-9',
					width: 'w-9',
					strokeWidth: '1.5',
					clickable: false,
				}"
				:dArray="['M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2']"
			/>
			<div class="m-2">no tasks on deck!</div>
		</div>

		<div v-if="!user" class="text-center m-4">
			<span class="text-pastel-yellow-400 clickable" @click="socialLogin">log in</span>
			to add a task!
		</div>

		<div v-if="user && tasks.length">
			<div id="tag-list">
				<div class="tag" v-for="tag in uniqueTags" :key="tag">
                    <span class="tag-link clickable" v-on:click="currentTag = tag">{{tag}}</span>
				</div>
			</div>
			<span class="clear-tag clickable" v-on:click="currentTag = null">clear filter</span>
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
import { auth, db, provider, fieldValueUtility } from "@/main";
import { pomodoro } from "@/constants";
// import { registerUser } from "@/authUtilities";
import AddTask from "@/components/AddTask.vue";
import BaseIcon from "@/components/BaseIcon.vue";
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
        BaseIcon,
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
            this.filteredTasks.forEach(task => tags.push(task.tags));
            return [...new Set(tags.flat())];
        },
        tagedTasks() {
            return this.filteredTasks.filter(task => task.tags.includes(this.currentTag));
        }
    },

    mounted() {
        this.registerAccount();
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
                let user = auth.currentUser;

                db.collection("users")
                    .doc(user.uid)
                    .get()
                    .then((doc) => {
                        if (!doc.exists) {
                            db.collection("users")
                                .doc(user.uid)
                                .set({
                                    displayName: user.displayName,
                                    email: user.email,
                                    focusTime: 0,
                                    joinDate: fieldValueUtility.serverTimestamp(),
                                    photoUrl: user.photoURL,
                                })
                                .then(() => {
                                    console.log("User document created!");

                                    // create tasks collection
                                    db.collection("users")
                                        .doc(user.uid)
                                        .collection("tasks")
                                        .doc("0")
                                        .set({
                                            createdAt: fieldValueUtility.serverTimestamp(),
                                            progress: 0,
                                            tags: [],
                                            title: "Tap to edit title",
                                        })
                                        .then(() => {
                                            console.log("Default task created!");
                                            this.fetchData();
                                        })
                                        .catch((error) => {
                                            console.error("Error writing document: ", error);
                                    });

                                    db.collection("users")
                                        .doc(user.uid)
                                        .collection("timer_settings")
                                        .doc("0")
                                        .set(pomodoro.DEFAULT_SETTINGS)
                                        .then(() => {
                                            console.log("User timer settings document created!");
                                        })
                                        .catch((error) => {
                                            console.error("Error writing document: ", error);
                                    });
                                })
                                .catch((error) => {
                                    console.error("Error writing document: ", error);
                            });
                        }
                });
			}
		},
	},
};
</script>

<style scoped>
.tag {
    border-radius: 50px;
	@apply bg-pastel-yellow-200;
	@apply text-pastel-blue-500;
    @apply inline;
    @apply px-2;
}

#tag-list {
    @apply flex;
    @apply flex-wrap;
    @apply justify-center;
    @apply my-2;
    @apply gap-2;
}

.clear-tag {
    border-radius: 50px;
	@apply bg-pastel-green-100;
	@apply text-pastel-orange-300;
    @apply inline;
    @apply px-2;
}
</style>
