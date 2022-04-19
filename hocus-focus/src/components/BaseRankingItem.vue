<template>
	<div class="card from-pastel-yellow-100 to-pastel-yellow-200">
		<div class="grid grid-cols-4">
			<div class="ranking-picture">
				<div class="w-6/12 sm:w-4/12">
					<img
						:src="this.profilePicture"
						alt="..."
						class="shadow rounded max-w-full h-auto align-middle border-none"
					/>
				</div>
			</div>
			<div class="ranking-name grid-rows-2">
				<div class="line-clamp">
					<span class="clickable">
						{{ this.displayName }}
					</span>
				</div>
				<div class="line-clamp">
					<span class="clickable">
						{{ this.email }}
					</span>
				</div>
			</div>
			<div></div>
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
			email: null,
			profilePicture: null,
			focusTime: null,
			focusTimeString: null,
		};
	},
	props: {
		ranking: Object,
	},

	mounted() {
		this.displayName = this.ranking.displayName;
		this.email = this.ranking.email;
		this.profilePicture = this.ranking.profilePicture;
		this.focusTime = this.ranking.focusTime;
		this.getFocusTimeString();
	},
	methods: {
		getFocusTimeString() {
			const hours = parseInt(this.focusTime / 60);
			const minutes = this.focusTime % 60;
			if (hours < 10) {
				this.focusTime = `0${hours}`;
			}
			if (minutes < 10) {
				this.focusTime += `:0${minutes}`;
			} else {
				this.focusTimeString = `${hours}:${minutes}`;
			}
		},
	},
};
</script>
