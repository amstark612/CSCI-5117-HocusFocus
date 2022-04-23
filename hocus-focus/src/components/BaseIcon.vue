<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:class="styleClasses"
		fill="none"
		:viewBox="vBox"
		stroke="currentColor"
		:stroke-width="stroke"
		@click="$emit('clicked')"
	>
		<path
			v-for="d in dArray"
			:key="d"
			stroke-linecap="round"
			stroke-linejoin="round"
			:d="d"
		/>
	</svg>
</template>

<script>
export default {
	name: "BaseIcon",
	props: {
		properties: Object,
		dArray: Array,
	},
	emits: ["clicked"],

	computed: {
		styleClasses() {
			let baseClasses = [
				this.properties?.height ? this.properties.height : "h-6",
				this.properties?.width ? this.properties.width : "w-6",
				this.properties?.clickable == null ? "clickable" : "",
			];

			if (this.properties?.classes) {
				return [...this.properties.classes, ...baseClasses].join(" ");
			} else {
				return ["stroke-pastel-yellow-400", ...baseClasses].join(" ");
			}
		},
		vBox() {
			return this.properties?.viewBox ? this.properties.viewBox : "0 0 24 24";
		},
		stroke() {
			return this.properties?.strokeWidth ? this.properties.strokeWidth : "2";
		}
	}
}
</script>
