<template>
  <div class="tasks">
    <TaskList />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';

export default {
	name: "TaskView",
	components: {
		TaskList,
	},
};
</script>
