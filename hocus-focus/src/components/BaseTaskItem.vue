<template>
	<div class="card task-item">
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

		<!-- media query display sliders on desktop but not on phone; made percentage editable -->
		<div class="flex flex-initial justify-end">
			<div
				class="task-progress flex-initial sm:w-96 flex justify-end items-center pr-2"
			>
				<div class="pr-4 hidden sm:block">
					<div>
						<div class="flex mb-2 items-center justify-between">
							<div>
								<span
									v-if="progress < 100"
									class="text-xs inline-block py-1 px-2 uppercase status"
								>
									Task in progress
								</span>
								<span
									v-if="progress == 100"
									class="text-xs inline-block py-1 px-2 uppercase status"
								>
									Task Completed
								</span>
							</div>
							<div class="text-right">
								<span class="text-xs inline-block text-pink-600">
									{{ progress }}%
								</span>
							</div>
						</div>
						<input
							type="range"
							list="tickmarks"
							:value="progress"
							min="0"
							max="100"
							step="10"
							class="w-full"
							v-on:change="(event) => updateProgress(event)"
						/>
						<div class="sliderticks">
							<p>0%</p>
							<p></p>
							<p></p>
							<p></p>
							<p></p>
							<p>50%</p>
							<p></p>
							<p></p>
							<p></p>
							<p></p>
							<p>100%</p>
						</div>
					</div>
				</div>
			</div>

			<div class="w-7 text-center progress">
				<span v-if="!editProgress" @click="editProgress = true"
					>{{ progress }}%</span
				>
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
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
// import VueSlideBar from 'vue-slide-bar';

// CTN_TODO: disable edit mode of component when user edits a different component or clicks out
export default {
	name: "BaseTaskItem",
	data() {
		return {
			editProgress: false,
			editTitle: false,
			editTags: false,
			progress: null,
			title: null,
			tags: null,
		};
	},
	props: {
		task: Object,
	},
	emits: ["delete"],
	components: {
		// VueSlideBar,
	},

	watch: {
		progress() {
			console.log("emit progress to parent...");
		},
	},

	mounted() {
		this.progress = this.task.progress;
		this.title = this.task.title;
		this.tags = this.task.tags.join(", ");
	},

	methods: {
		updateProgress(event) {
			this.progress = event.target.value;
			console.log("emit progress to parent...");
			console.log(this.progress);
		},
		updateTags() {
			console.log("emit new tags array to parent...");
			console.log(this.tags.split(", "));
			this.editTags = false;
		},
		updateTitle() {
			console.log("emit new title to parent...");
			console.log(this.title);
			this.editTitle = false;
		},
	},
};
</script>

<style scoped>
.sliderticks {
	display: flex;
	justify-content: space-between;
	padding: 0 10px;
}

.sliderticks p {
	position: relative;
	display: flex;
	justify-content: center;
	text-align: center;
	width: 1px;
	background: #d3d3d3;
	height: 10px;
	line-height: 40px;
	margin: 0 0 20px 0;
}

.status {
	@apply rounded-full;
}
</style>
