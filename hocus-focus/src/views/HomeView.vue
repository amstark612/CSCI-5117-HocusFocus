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
};
</script>
