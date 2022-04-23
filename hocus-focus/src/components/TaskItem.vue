<template>
	<div class="card task-item">
		<div class="task-title">
			<div class="line-clamp">
				<EditableSpan 
					:text="task.title" 
					@edited="$emit('title', task.id, { title: $event })" 
					class="w-32 sm:w-full" 
				/>
			</div>

			<div class="line-clamp muted">
				<small v-if="!editTags" class="clickable" @click="editTags = true">
					<span v-for="tag in task.tags" :key="tag"> #{{ tag }} </span>
				</small>

				<input
					v-if="editTags"
					type="text"
					v-model="tags"
					v-on:keyup.enter="updateTags"
					@blur="updateTags"
				/>
			</div>
		</div>

		<div class="flex flex-initial justify-end gap-2">
			<div class="w-36 sm:w-60">
				<BaseProgressSlider 
					:percentage="parseInt(task.progress)" 
					@progress="$emit('progress', task.id, { progress: parseInt($event) })" />
			</div>

			<div class="task-actions">
				<BaseIcon
					:d="'M6 18L18 6M6 6l12 12'"
					:clickable="true"
					@click="$emit('delete', task.id)"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";
import BaseProgressSlider from "./BaseProgressSlider.vue";
import EditableSpan from "@/components/EditableSpan.vue";

// CTN_TODO: disable edit mode of component when user edits a different component or clicks out
export default {
	name: "TaskItem",
	data() {
		return {
			editTags: false,
			tags: null,
		};
	},
	props: {
		task: Object,
	},
	emits: [
		"delete",
		"progress",
		"tags",
		"title",
	],
	components: {
    BaseIcon,
    BaseProgressSlider,
    EditableSpan,
	},

	mounted() {
		this.tags = this.task.tags.join(", ");
	},

	methods: {
		updateTags() {
			this.$emit('tags', this.task.id, { tags: this.tags });
			this.editTags = false;
		},
	},
};
</script>

<style scoped>
.task-item {
	/* @apply block; */
	@apply flex;
	@apply justify-between;
	@apply: gap-4;
	@apply sm:items-center;
	@apply border-pastel-yellow-500;
	@apply text-pastel-yellow-500;
	background-color: #fef6eb;
	/* @apply bg-pastel-yellow-100; */
}

.task-item .muted {
	@apply italic;
	@apply text-pastel-orange-300;
}

.task-title {
	@apply flex-initial;
	@apply sm:w-96;
	@apply flex;
	@apply flex-col;
	@apply gap-y-1;
	@apply pr-2;
}

.task-actions {
	@apply flex-none;
	@apply w-7;
	@apply text-center;
	@apply align-middle;
	@apply justify-center;
	@apply flex;
	@apply items-center;
}
</style>
