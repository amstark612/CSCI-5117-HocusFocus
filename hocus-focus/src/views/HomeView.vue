<template>
	<div class="home">
		<TimerManager />
		<TaskList />
	</div>
</template>

<script>
import TaskList from "@/components/TaskList.vue";
import TimerManager from "@/components/TimerManager.vue";

export default {
	name: "HomeView",
	components: {
		TaskList,
		TimerManager,
	},

	// CTN_TODO this will manage the session and give the correct data to summary
};
</script>
