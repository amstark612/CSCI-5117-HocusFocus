<template>
	<div id="app" class="mx-auto w-11/12 lg:w-4/5 xl:w-3/5 2xl:w-2/4">
		<BaseHeader />

		<router-view />
	</div>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue";

export default {
	name: "App",
	components: {
		BaseHeader,
	},
};
</script>

<style scoped>
@import "@/assets/styles/global.css";

#app {
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
