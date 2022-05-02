<template>
	<BaseModal
		:popupClasses="['bg-pastel-yellow-100', 'border-pastel-yellow-500']"
	>
		<template v-slot:body>
			<div class="card timer">
				<div class="flex gap-2 sm:gap-10 items-center">
					<BaseIcon
                        :properties="{
                            height: 'h-9',
                            width: 'w-9',
                            strokeWidth: '1.5',
                        }"
						:dArray="[
							'M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
						]"
					/>
					<h1 class="text-sm sm:text-3xl">focus session summary</h1>
					<BaseIcon
                        :properties="{
                            height: 'h-9',
                            width: 'w-9',
                            strokeWidth: '1.5',
                        }"
						:dArray="[
							'M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z',
						]"
					/>
				</div>

				<h3>{{ getDate() }}</h3>

				<div class="wrapper">
					<div class="card1 deck">
						<div>
							<h1 class="number">{{ Math.floor(focusTime / 60000) }}</h1>
						</div>
						<br />
						<div>
							<h3>minutes of focus</h3>
						</div>
					</div>
					<div class="card1 deck">
						<div>
							<h1 class="number">{{ numCompleted }}</h1>
						</div>
						<br />
						<div>
							<h3>tasks completed</h3>
						</div>
					</div>
					<div class="card1 deck">
						<div>
							<h1 class="number">{{ tasks.length }}</h1>
						</div>
						<br />
						<div>
							<h3>tasks worked on</h3>
						</div>
					</div>
				</div>

				<div v-if="tasks.length" class="w-full flex flex-col items-center justify-center">
					<h2>task progress</h2>
					<div class="card deck">
						<div
							v-for="task in tasks"
							:key="task.id"
							class="flex justify-between mb-1"
						>
							<div class="flex items-center gap-1">
								<BaseIcon
									:properties="{
										height: 'h-6',
										width: 'w-8',
										strokeWidth: '1.5',
										classes: ['stroke-pastel-green-500'],
									}"
									:dArray="[
										'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
									]"
								/>
								<div class="line-clamp">{{ task.title }}</div>
							</div>
							<div class="text-right mr-2">{{ task.progress }}%</div>
						</div>
					</div>
				</div>
			</div>
		</template>

		<template v-slot:footer>
			<div class="closeButton">
				<button @click="close" class="flex items-center gap-2 rounded-full text-pastel-yellow-500">
					start a new session &nbsp;
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-yellow-500'],
						}"
						:dArray="[
							'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
						]"
					/>
				</button>
			</div>
		</template>
	</BaseModal>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";
import BaseModal from "@/components/BaseModal.vue";
import { auth, db } from "@/main";
export default {
	name: "GoalSummaryModal",
	data() {
		return {
			firestoreRef: null,
			showSummary: false,
			user: null,
			tasks: [],
			numCompleted: 0,
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
		fetchData() {
			if (this.firestoreRef) {
				this.tasks = [];
				this.taskIds.forEach((taskId) =>
					this.firestoreRef
						.doc(taskId)
						.get()
						.then((doc) => {
							this.tasks.push({
								id: taskId,
								title: doc.data().title,
								tags: doc.data().tags,
								progress: doc.data().progress,
							});

							if (doc.data().progress === 100) {
								this.numCompleted++;
							}
						})
				);
			}
		},
		getDate() {
			const today = new Date();
			const yyyy = today.getFullYear();
			let mm = today.getMonth() + 1; // Months start at 0!
			let dd = today.getDate();

			if (dd < 10) dd = "0" + dd;
			if (mm < 10) mm = "0" + mm;

			const formattedDate = mm + "/" + dd + "/" + yyyy;

			return formattedDate;
		},
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
};
</script>

<style scoped>
#name {
	font-weight: bold;
}
.summary {
	/* @apply h-fit; */
}
.card1 {
	@apply p-4;
	@apply my-2;
	@apply rounded-lg;
	@apply border;
	@apply drop-shadow-md;
	@apply text-sm;
    @apply flex;
    @apply flex-col;
    @apply justify-between;
    @apply text-center;
}
.timer {
	@apply flex;
	@apply flex-col;
	@apply gap-y-6;
	@apply items-center;
	@apply h-fit;
	@apply border-pastel-green-500;
	@apply bg-pastel-green-100;
	@apply text-pastel-green-500;
    @apply p-6;
}
.wrapper {
	@apply block;
	@apply w-fit;
	@apply h-fit;
	@apply m-1;
    @apply sm:flex;
    @apply sm:justify-center;
    @apply sm:gap-4;
}
.deck {
	@apply block;
	@apply w-full;
	@apply m-2;
	@apply border-pastel-green-500;
	@apply bg-pastel-yellow-100;
	@apply text-pastel-green-500;
	@apply items-center;
	@apply sm:w-4/5;
	@apply sm:m-1;
}
.number {
	@apply text-2xl;
	@apply sm:text-5xl;
}
.closeButton {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
