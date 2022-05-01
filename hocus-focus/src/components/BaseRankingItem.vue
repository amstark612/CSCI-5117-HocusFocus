<template>
	<div class="card from-pastel-yellow-100 to-pastel-yellow-200">
		<div class="grid grid-cols-5">
			<div class="number text-5xl ml-4">
				{{ index }}
			</div>
			<div class="ranking-picture">
				<div class="w-6/12 sm:w-4/12">
					<img
						:src="this.profilePicture"
						alt="..."
						class="shadow rounded max-w-full h-auto align-middle border-none"
					/>
				</div>
			</div>
			<div class="ranking-name col-span-2 grid-rows-2">
				<div class="line-clamp">
					<span class="clickable">
						{{ this.displayName }}
					</span>
				</div>
				<div class="line-clamp">
					<span class="clickable"> {{ this.joinDate }} </span>
				</div>
			</div>
			<div class="text-center">
				<div class="line-clamp">
					{{ this.focusTimeString }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "BaseTaskItem",
	data() {
		return {
			displayName: null,
			joinDate: null,
			profilePicture: null,
			focusTime: null,
			focusTimeString: null,
			date: null,
		};
	},
	props: {
		ranking: Object,
		index: Number,
	},

	mounted() {
		this.displayName = this.ranking.displayName;
		this.profilePicture = this.ranking.photoUrl;
		this.focusTime = this.ranking.focusTime;
		this.getFocusTimeString();
		this.getJoinDate();
	},
	methods: {
		getFocusTimeString() {
			const hours = parseInt(this.focusTime / 60);
			const minutes = Math.floor(this.focusTime % 60);
			if (hours < 10 && minutes < 10) {
				this.focusTimeString = `0${hours}:0${minutes}`;
			} else if (hours > 10 && minutes < 10) {
				this.focusTimeString = `${hours}:0${minutes}`;
			} else if (hours < 10 && minutes > 10) {
				this.focusTimeString = `0${hours}:${minutes}`;
			} else {
				this.focusTimeString = `${hours}:${minutes}`;
			}
		},
		getJoinDate() {
			this.joinDate = this.ranking.joinDate.toDate().toDateString();
		},
	},
};
</script>
