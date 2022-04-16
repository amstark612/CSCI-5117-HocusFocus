<template>
	<div class="task-item flex justify-between items-center p-3 rounded-lg bg-rose-300 border border-red-500">
		<div class="task-title flex-initial w-96 text-left flex flex-col">
			<div class="line-clamp">
				<span v-if="!editTitle" class="clickable" @click="editTitle = !editTitle">
					{{ task.title }}
				</span>

				<input 
					v-if="editTitle" 
					type="text" 
					v-model="title" 
					v-on:keyup.enter="updateTitle"
					class="w-full rounded bg-rose-100 border border-red-500"
				/>
			</div>

			<div class="line-clamp italic text-rose-500">
				<small v-if="!editTags" class="clickable" @click="editTags = !editTags">
					<span v-for="tag in task.tags" :key="tag">
						#{{ tag }}
					</span>
				</small>

				<input
					v-if="editTags"
					type="text"
					v-model="tags"
					v-on:keyup.enter="updateTags"
					class="w-full rounded bg-rose-100 border border-red-500"
				/>
			</div>
		</div>

		<div class="flex flex-initial justify-end">
			<div class="task-progress flex-initial w-96 text-center flex justify-end pr-4">
				<div class="pr-4">
					---------------- slider goes here -----------------
				</div>
				<div>
					{{ progress * 100 }}%
				</div>
			</div>

			<div class="task-actions flex-none w-9 text-center align-middle">
				<svg 
					xmlns="http://www.w3.org/2000/svg" 
					class="h-6 w-6 clickable" 
					fill="none" 
					viewBox="0 0 24 24" 
					stroke="currentColor" 
					stroke-width="2"
					@click="$emit('delete', task.id)"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'BaseTaskItem',
	data() {
		return {
			editTitle: false,
			editTags: false,
			progress: null,
			title: null,
			tags: null,
		}
	},
	props: {
		task: Object,
	},
	emits: ['delete'],

	watch: {
		progress() {
			console.log('emit progress to parent...');
		},
	},

	mounted() {
		this.progress = this.task.progress;
		this.title = this.task.title;
		this.tags = this.task.tags.join(', ');
	},

	methods: {
		updateTitle() {
			console.log('emit new title to parent...');
			console.log(this.title);
			this.editTitle = false;
		},
		updateTags() {
			console.log('emit new tags array to parent...');
			console.log(this.tags.split(', '));
			this.editTags = false;
		}
	}
}
</script>
