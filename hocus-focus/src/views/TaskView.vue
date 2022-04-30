<template>
  <div class="tasks">
	<AllTasks />
  </div>
</template>

<script>
import AllTasks from '../components/AllTasks.vue';

export default {
	name: "TaskView",
	components: {
		AllTasks,
	},
};
</script>
