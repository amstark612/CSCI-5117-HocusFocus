<template>
	<div id="app">
		<header class="p-4">
			<div id="logo">
				hocus-focus
			</div>

			<nav>
				<router-link to="/">home</router-link> |
				<router-link to="/tasks">tasks</router-link> |
				<router-link to="/ranking">ranking</router-link>
			</nav>
		</header>

		<router-view />
	</div>
</template>

<style scoped>
@import "@/assets/styles/global.css";

header {
  display: flex;
  justify-content: space-between;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	width: 80%;
	margin: auto;
}

nav a.router-link-exact-active {
	color: #42b983;
}
</style>
