<template>
  <div class="home">
		<TomatoTimer />
		<TaskList />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';
import TomatoTimer from '@/components/TomatoTimer.vue';

export default {
  name: 'HomeView',
  components: {
		TaskList,
		TomatoTimer,
  },
};
</script>
