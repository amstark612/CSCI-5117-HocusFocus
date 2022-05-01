<template>
	<div class="home">
		<TimerManager
			ref="timer"
			v-if="!showGoalCompletedStatus"
			@sessionComplete="sessionComplete"
			@showSettings="showSettings = true"
			@showInfo="showInfo = true"
		/>

		<GoalCompleted
			v-if="user && showGoalCompletedStatus"
			@showSummary="openGoalSummary"
		/>

		<GoalSummaryModal
			v-if="user && showSummary"
			@closeSummaryPrompt="closeSummaryPrompt"
			:focusTime="focusTime"
			:taskIds="taskIds"
		/>

		<TaskList ref="taskList" @trackTask="trackTask" />

		<TimerSettingModal :show="showSettings" @close="updateTimer" />
		<BaseInfo :show="showInfo" @close="closeInfoModal" />
	</div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import TimerManager from "@/components/TimerManager.vue";
import TimerSettingModal from "@/components/TimerSettingModal.vue";
import GoalCompleted from "@/components/GoalCompleted.vue";
import BaseInfo from "@/components/BaseInfo.vue";
import GoalSummaryModal from "@/components/GoalSummaryModal.vue";
import { auth, db, fieldValueUtility } from "@/main";
import { pomodoro } from "@/constants";

export default {
	name: "HomeView",
	data() {
		return {
			focusTime: null,
			showSettings: false,
			showInfo: false,
			showGoalCompletedStatus: false,
			showSummary: false,
			taskIds: [],
			showDetailSummary: false,
			firstDay: 0,
			numberOfTasks: 0,
            user: null,
		};
	},
	components: {
		TaskList,
		TimerManager,
		TimerSettingModal,
		GoalCompleted,
		GoalSummaryModal,
		BaseInfo,
	},

	firestore: function () {
        if (auth.currentUser) {
            return {
                dataSubTask: db
                    .collection("users")
                    .doc(auth.currentUser.uid)
                    .collection("tasks"),
                data: db.collection("users").doc(auth.currentUser.uid),
            };
        }
	},
	methods: {
		trackTask(taskId) {
			// this will push duplicate values
			// but is filtered before sending to summary modal
			let mode = this.$refs.timer.currentIntervalType;
			let inProgress = this.$refs.timer.timer.running;
			if (mode === "pomodoro" && inProgress) {
				this.taskIds.push(taskId);
			}
		},
		sessionComplete(focusTime) {
			this.focusTime = focusTime;
			this.taskIds = [...new Set(this.taskIds)];
			this.showGoalCompletedStatus = true;
		},
		updateTimer() {
			this.showSettings = false;
			this.$refs.timer.fetchSettings();
		},
		closeInfoModal() {
			this.showInfo = false;
		},
		date_db() {
			db.collection("users")
				.doc(auth.currentUser.uid)
				.get()
				.then((doc) => {
					if (doc.exists) {
						console.log("hello");
						this.firstDay = doc.data().joinDate;
					} else {
						console.log("No such document!");
					}
				})
				.catch((error) => {
					console.log("Error getting document:", error);
				});
		},
		date_diff() {
			return Date.now() - this.firstDay;
		},
		db_numberOfTasks() {
			db.collection("users")
				.doc(auth.currentUser.uid)
				.collection("tasks")
				.get()
				.then((snap) => {
					this.numberOfTasks = snap.size; // will return the collection size
				});
		},
		openGoalSummary() {
			this.showGoalCompletedStatus = false;
			this.showSummary = true;
		},
		closeSummaryPrompt() {
			this.showGoalCompletedStatus = false;
			this.showSummary = false;
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
                                        this.$refs.taskList.fetchData();
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

	created() {
        if (auth.currentUser) {
            this.date_db();
            this.db_numberOfTasks();
        }
	},

    mounted() {
        if (auth.currentUser) {
            this.user = auth.currentUser;
            this.registerAccount();
        }
    },
};
</script>

<style>
.prompt {
	@apply flex;
	@apply flex-col;
	@apply gap-y-4;
	@apply items-center;

	@apply mt-4;
	@apply p-10;
	@apply text-center;

	@apply border-pastel-green-500;
	@apply bg-pastel-green-100;
	@apply text-pastel-green-500;
}
</style>
