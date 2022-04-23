<template>
	<div class="card task-item">
		<div class="task-title">
			<div class="line-clamp">
				<span v-if="!editTitle" class="clickable" @click="editTitle = true">
					{{ title }}
				</span>

				<input
					v-if="editTitle"
					type="text"
					v-model="title"
					v-on:keyup.enter="editTitle = false"
					@blur="editTitle = false"
				/>
			</div>

			<div class="line-clamp muted">
				<small v-if="!editTags" class="clickable" @click="editTags = true">
					<span v-for="tag in tagArray" :key="tag">#{{ tag }}</span>
				</small>

				<input
					v-if="editTags"
					type="text"
					v-model="tags"
					v-on:keyup.enter="editTags = false"
					@blur="editTags = false"
				/>
			</div>
		</div>

		<div class="flex flex-initial justify-end">
			<div
				class="task-progress flex-initial sm:w-96 flex justify-end items-center pr-2"
			>
				<div class="mx-4">
					<BaseProgressSlider :percentage="this.progress" @progress="updateProgress" />
				</div>
			</div>

			<div class="task-actions">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 clickable"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="1"
					@click="$emit('delete', task.id)"
				>
					<path 
						stroke-linecap="round" 
						stroke-linejoin="round" 
						d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" 
					/>
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
// CTN_TODO: disable edit mode of component when user edits a different component or clicks out
import { auth, db, fieldValueUtility } from "@/main";
import BaseProgressSlider from "./BaseProgressSlider.vue";

export default {
	name: "BaseAddTaskItem",
	data() {
		return {
			editProgress: false,
			editTitle: false,
			editTags: false,
			title: "Click here to add a task",
			tags: "clickHereToAddTags",
			tagArray: ["clickHereToAddTags"],
			progress: 0,
		};
	},
	components: {
    BaseProgressSlider,
},

	watch: {
		editTitle() {
			if (!this.editTitle && !this.title) {
				this.title = "Click here to add a task";
			} else if (this.editTitle) {
				this.title = "";
			}
		},
		editTags() {
			if (!this.editTags && !this.tags) {
				this.tags = "clickHereToAddTags";
			} else if (this.editTags) {
				this.tags = "";
			}
		},
		tags() {
			// replace hashtags and commas with spaces, then split by space
			let cleansed = this.tags.replace(",", " ").replace("#", " ");
			this.tagArray = cleansed.split(" ").filter((tag) => tag);
		},
	},

	methods: {
		addTask() {
			db.collection("tasks")
				.add({
					userId: auth.currentUser.uid,
					createdAt: fieldValueUtility.serverTimestamp(),
					title: this.title,
					tags: this.tagArray.filter((tag) => tag != "clickHereToAddTags"),
					progress: this.progress,
				})
				.then((ref) => {
					console.log(ref.id);

					this.title = "Click here to add a task",
					this.tags = "clickHereToAddTags",
					this.tagArray = [this.tags],
					this.progress = 0;
				});
		},
		updateProgress(percentage) {
			this.progress = parseInt(percentage);
			console.log("emit progress to parent...");
		},
	},
};
</script>
