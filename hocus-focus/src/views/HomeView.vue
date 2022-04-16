<template>
  <div class="home">
		Timer component here
		<br>
		<TaskList />
  </div>
</template>

<script>
import TaskList from '@/components/TaskList.vue';

export default {
  name: 'HomeView',
  components: {
		TaskList,
  }
}
</script>
