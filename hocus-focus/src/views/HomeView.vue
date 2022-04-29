<template>
	<div class="home">
		<TimerManager ref="timer" @cycleComplete="cycleComplete" />
		<TaskList @trackTask="trackTask" />
		<TimerSettingModal />
	</div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import TimerManager from "@/components/TimerManager.vue";
import TimerSettingModal from '../components/TimerSettingModal.vue';

export default {
	name: "HomeView",
    data() {
        return {
            focusTime: null,
            showSummary: false,
            taskIds: [],
        }
    },
	components: {
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
        cycleComplete(focusTime) {
            this.focusTime = focusTime;
            this.taskIds = [...(new Set(this.taskIds))];
        },
    },
};
</script>
