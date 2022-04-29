<template>
	<div class="home">
		<TimerManager @cycleComplete="cycleComplete" />
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
            this.taskIds.push(taskId);
        },
        cycleComplete(focusTime) {
            this.focusTime = focusTime;
            this.taskIds = [...(new Set(this.taskIds))];
        },
    },
};
</script>
