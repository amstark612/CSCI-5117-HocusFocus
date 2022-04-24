<template>
	<div v-if="seen" id="hide">
		<button>Timer</button>
		<!-- <button disabled> Theme </button> -->
		<br />
		<h4>
			promodora duration :
			<editable-span :text="this.promdo.toString()" @edited="updatePromo" />
		</h4>
		<br />
		<h4>
			short break duration :
			<editable-span :text="this.short.toString()" @edited="updateShort" />
		</h4>
		<br />
		<h4>
			long break duration :
			<editable-span :text="this.long.toString()" @edited="updateLong" />
		</h4>
		<br />
		<h4>
			long break delay :
			<editable-span :text="this.delay.toString()" @edited="updateDelay" />
		</h4>
		<br />
		<h4>
			atuo start breaks :
			<span @click="auto_start_break = !auto_start_break">
				{{ this.auto_start_break }}</span
			>
		</h4>
		<br />
		<button @click="seen = !seen">Close X</button>
	</div>
</template>

<script>
export default {
	name: "PomodoroSettings.vue",
}
</script>
