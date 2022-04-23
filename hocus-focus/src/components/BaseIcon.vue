<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		:class="styleClasses"
		fill="none"
		:viewBox="vBox"
		stroke="currentColor"
		:stroke-width="stroke"
	>
		<path
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
		height: String,
		width: String,
		d: String,
		clickable: Boolean,
		classes: Array,
		viewBox: String,
		strokeWidth: String,
	},

	computed: {
		styleClasses() {
			let baseClasses = [
				this.height ? this.height : "h-6",
				this.width ? this.width : "w-6",
				this.clickable ? "clickable" : "",
			];

			if (this.classes) {
				return [...this.classes, ...baseClasses].join(" ");
			} else {
				return ["stroke-pastel-yellow-400", ...baseClasses].join(" ");
			}
		},
		vBox() {
			return this.viewBox ? this.viewBox : "0 0 24 24";
		},
		stroke() {
			return this.strokeWidth ? this.strokeWidth : "2";
		}
	}
}
</script>
