<template>
	<div class="home">
		<TimerManager />
		<TaskList />
		<TimerSettingModal />
	</div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import TimerManager from "@/components/TimerManager.vue";
import TimerSettingModal from '../components/TimerSettingModal.vue';

export default {
	name: "HomeView",
	components: {
		TaskList,
		TimerManager,
		TimerSettingModal,
	},

	// CTN_TODO this will manage the session and give the correct data to summary
};
</script>
