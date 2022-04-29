<template>
	<div class="home">
		<TimerManager 
			ref="timer" 
			v-if="!showSummaryPrompt"
			@sessionComplete="sessionComplete" 
		/>

		<div v-else class="card prompt">
			<div class="flex gap-2 sm:gap-10 items-center">
				<BaseIcon
					:dArray="['M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z']" 
				/>
					<h1 class="text-xl sm:text-3xl">Mission accomplished!</h1>
				<BaseIcon
					:dArray="['M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z']" 
				/>
			</div>

			<div class="sm:px-16">
				Update your progress on any tasks and click below when you're ready to view your session summary!
			</div>

			<BaseIcon
                :properties="{
                    height: 'h-8',
                    width: 'w-8',
                    strokeWidth: '1.5',
                    classes: ['stroke-pastel-green-500'],
                }"
				:dArray="['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z']"
                @click="showSummary = true"
			/>
		</div>

		<TaskList @trackTask="trackTask" />
		<TimerSettingModal @updated="settingsKey++" />
	</div>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";
import TaskList from "@/components/TaskList.vue";
import TimerManager from "@/components/TimerManager.vue";
import TimerSettingModal from '../components/TimerSettingModal.vue';

export default {
	name: "HomeView",
    data() {
        return {
            focusTime: null,
			showSummaryPrompt: false,
            showSummary: false,
            taskIds: [],
        }
    },
	components: {
        BaseIcon,
        TaskList,
        TimerManager,
        TimerSettingModal,
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
            this.taskIds = [...(new Set(this.taskIds))];
            this.showSummaryPrompt = true;
        },
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
