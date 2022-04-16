<template>
	<div class="task-item flex justify-between items-center p-3 m-2 rounded-lg bg-rose-200 border border-red-500">
		<div class="task-title flex-initial w-96 text-left flex flex-col">
			<div class="line-clamp">
				<span v-if="!editTitle" class="clickable" @click="editTitle = !editTitle">
					{{ title }}
				</span>

				<input 
					v-if="editTitle" 
					type="text" 
					v-model="title" 
					v-on:keyup.enter="editTitle = !editTitle"
					class="w-full rounded bg-rose-100 border border-red-500"
				/>
			</div>

			<div class="line-clamp italic text-rose-500">
				<small v-if="!editTags" class="clickable" @click="editTags = !editTags">
					<span v-for="tag in tagArray" :key="tag">
						#{{ tag }}
					</span>
				</small>

				<input
					v-if="editTags"
					type="text"
					v-model="tags"
					v-on:keyup.enter="editTags = !editTags"
					class="w-full rounded bg-rose-100 border border-red-500"
				/>
			</div>
		</div>

		<div class="flex flex-initial justify-end">
			<div class="task-progress flex-initial w-96 text-center flex justify-end pr-4">
				<div class="pr-4">
					------ slider goes here -------
				</div>
				<div class="w-7">
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
					@click="addTask"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
// CTN_TODO: disable edit mode of component when user edits a different component or clicks out
import { auth, db } from '@/main';
import firebase from "firebase/app";

export default {
	name: 'BaseAddTaskItem',
	data() {
		return {
			editTitle: false,
			editTags: false,
			title: 'Click here to add a task',
			tags: 'clickHereToAddTags',
			tagArray: ['clickHereToAddTags'],
			progress: 0,
		}
	},

	watch: {
		editTitle() {
			if (!this.editTitle && !this.title) {
				this.title = 'Click here to add a task';
			} else if (this.editTitle) {
				this.title = '';
			}
		},
		editTags() {
			if (!this.editTags && !this.tags) {
				this.tags = 'clickHereToAddTags';
			} else if (this.editTags) {
				this.tags = '';
			}
		},
		tags() {
			// replace hashtags and commas with spaces, then split by space
			let cleansed = this.tags.replace(',', ' ').replace('#', ' ');
			this.tagArray = cleansed.split(' ').filter(tag => tag);
		},
	},

	methods: {
		addTask() {
			db.collection("tasks").add({
				userId: auth.currentUser.uid,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				title: this.title,
				tags: this.tagArray.filter(tag => tag != 'clickHereToAddTags'),
				progress: this.progress,
			}).then(ref => {
				console.log(ref.id);

				this.title = 'Click here to add a task',
				this.tags = 'clickHereToAddTags',
				this.tagArray = [this.tags],
				this.progress = 0;
			});
		}
	}
}
</script>
