<template>
	<BaseModal
		v-if="show"
		:popupClasses="['bg-pastel-yellow-200', 'border-pastel-yellow-500']"
	>
		<template v-slot:header>
			<div class="card">
				<div class="flex gap-2 sm:gap-10 justify-center items-center">
					<BaseIcon :dArray="['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z']" />
					<h1 class="sm:text-3xl text-center">
						what is the pomodoro technique?
					</h1>
					<BaseIcon :dArray="['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z']" />
				</div>
			</div>
		</template>

		<template v-slot:body>
			<div class="text-center justify-center items-center">
				<div class="m-auto sm:text-xl text-center">
					<h4>
						the pomodoro technique is a method for staying focused and mentally
						fresh!
					</h4>
				</div>
				<br />
				<br />

				<div
					class="grid grid-cols-4 text-center flex justify-center items-center"
				>
					<div class="step">
						<div>step</div>
						<p class="number">1</p>
					</div>
					<div class="m-2">
						<div class="w-6/12 sm:w-4/12">
							<img
								src="../assets/step1.svg"
								alt="..."
								class="shadow rounded max-w-full h-auto align-middle border-none"
							/>
						</div>
					</div>
					<div class="col-span-2">Create tasks</div>
				</div>
				<div class="grid grid-cols-4 text-center">
					<div class="step">
						<div>step</div>
						<p class="number">2</p>
					</div>
					<div class="m-2">
						<div class="w-6/12 sm:w-4/12">
							<img
								src="../assets/step2.svg"
								alt="..."
								class="shadow rounded max-w-full h-auto align-middle border-none"
							/>
						</div>
					</div>
					<div class="col-span-2">
						Set your timer settings or use the default
					</div>
				</div>

				<div class="grid grid-cols-4 text-center">
					<div class="step">
						<div>step</div>
						<p class="number">3</p>
					</div>
					<div class="m-2">
						<div class="w-6/12 sm:w-4/12">
							<img
								src="../assets/step3.svg"
								alt="..."
								class="shadow rounded max-w-full h-auto align-middle border-none"
							/>
						</div>
					</div>
					<div class="col-span-2">
						Complete a 25 (recommended) minute pomodoro session
					</div>
				</div>

				<div class="grid grid-cols-4 text-center justify-center items-center">
					<div class="step">
						<div>step</div>
						<p class="number">4</p>
					</div>
					<div class="m-2">
						<div class="w-6/12 sm:w-4/12">
							<img
								src="../assets/step4.svg"
								alt="..."
								class="shadow rounded max-w-full h-auto align-middle border-none"
							/>
						</div>
					</div>

					<div class="col-span-2">Work on your tasks until the time is up</div>
				</div>

				<div class="grid grid-cols-4 text-center">
					<div class="step">
						<div>step</div>
						<p class="number">5</p>
					</div>
					<div class="m-2">
						<div class="w-6/12 sm:w-4/12">
							<img
								src="../assets/step5.svg"
								alt="..."
								class="shadow rounded max-w-full h-auto align-middle border-none"
							/>
						</div>
					</div>
					<div class="col-span-2">Take a 5 (recommended) minute break</div>
				</div>

				<div class="grid grid-cols-4 text-center">
					<div class="step">
						<div>step</div>
						<p class="number">6</p>
					</div>
					<div class="m-2">
						<div class="w-6/12 sm:w-4/12">
							<img
								src="../assets/step6.svg"
								alt="..."
								class="shadow rounded max-w-full h-auto align-middle border-none"
							/>
						</div>
					</div>
					<div class="col-span-2">
						Every 4 (recommended) pomodoros, take a longer 15-20 minute break
					</div>
				</div>
			</div>
		</template>

		<template v-slot:footer>
			<div class="flex justify-around text-xsm sm:text-base">
				<button
					@click="$emit('close')"
					class="flex items-center gap-2"
					title="Close out!"
				>
					<BaseIcon
						:properties="{
							height: 'h-10',
							width: 'w-10',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
						]"
					/>
				</button>
			</div>
		</template>
	</BaseModal>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";
import BaseIcon from "@/components/BaseIcon.vue";

export default {
	name: "BaseInfo",
	return: {},
	props: {
		show: Boolean,
	},
	components: {
		BaseModal,
		BaseIcon,
	},
};
</script>

<style scoped>
.step {
	@apply gap-y-6;
	@apply m-4;
	@apply text-xl;
	@apply text-pastel-yellow-500;
	@apply tracking-wide;
}
.number {
	@apply text-2xl;
	@apply ordinal;
}
</style>
