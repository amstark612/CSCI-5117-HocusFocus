<template>
	<div class="card task-item from-pastel-orange-100 to-pastel-orange-200">
		<div class="task-title">
			<div class="line-clamp">
				<span v-if="!editTitle" class="clickable" @click="editTitle = true">
					{{ task.title }}
				</span>

				<input 
					v-if="editTitle" 
					type="text" 
					v-model="title" 
					v-on:keyup.enter="updateTitle"
					@blur="updateTitle"
				/>
			</div>

			<div class="line-clamp muted">
				<small v-if="!editTags" class="clickable" @click="editTags = true">
					<span v-for="tag in task.tags" :key="tag">
						#{{ tag }}
					</span>
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

		<!-- CTN_TODO: media query to not display slider on phones; make percentage editable -->
		<div class="flex flex-initial justify-end">
			<div class="task-progress flex-initial sm:w-96 flex justify-end items-center pr-2">
				<div class="pr-4 hidden sm:block">
					<!-- <vue-slide-bar v-model="progress" /> -->
					------ slider goes here -------
				</div>
				<div class="w-7 text-center">
					<span v-if="!editProgress" @click="editProgress = true">{{ progress }}%</span>
					<input 
						v-if="editProgress" 
						v-model="progress" 
						v-on:keyup.enter="updateProgress"
						@blur="updateProgress"
						class="w-7"
						type="number" 
						min="0" 
						max="100" 
					/>
				</div>
			</div>

			<div class="task-actions">
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
// import VueSlideBar from 'vue-slide-bar';

// CTN_TODO: disable edit mode of component when user edits a different component or clicks out
export default {
	name: 'BaseTaskItem',
	data() {
		return {
			editProgress: false,
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
	components: {
		// VueSlideBar,
	},

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
		updateProgress() {
			console.log('emit progress to parent...');
			console.log(this.progress);
			this.editProgress = false;
		},
		updateTags() {
			console.log('emit new tags array to parent...');
			console.log(this.tags.split(', '));
			this.editTags = false;
		},
		updateTitle() {
			console.log('emit new title to parent...');
			console.log(this.title);
			this.editTitle = false;
		},
	}
}
</script>
