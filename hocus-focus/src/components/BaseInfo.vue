<template>
	<BaseModal
		v-if="show"
		:popupClasses="['bg-pastel-yellow-200', 'border-pastel-yellow-500']"
	>
		<template v-slot:header>
			<div class="card">
				<div class="flex gap-2 sm:gap-10 items-center">
					<BaseIcon :dArray="['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z']" />
					<h1 class="text-xl sm:text-3xl text-center">
						what is the pomodoro technique?
					</h1>
					<BaseIcon :dArray="['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z']" />
				</div>
			</div>
		</template>

		<template v-slot:body>
			<div class="m-auto">
				<h3>
					the pomodoro technique is a method for staying focused and mentally
					fresh!
				</h3>
			</div>
			<br />
			<br />

			<div class="grid grid-cols-4 text-center flex">
				<div class="step">Step 1</div>
				<div class="text-center">
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
						]"
					/>
				</div>
				<div class="cols-span-2">Create tasks</div>
			</div>
			<div class="grid grid-cols-4 text-center">
				<div class="step">Step 2</div>
				<div>
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="['M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z']"
					/>
				</div>
				<div class="cols-span-2">
					Set your timer settings or use the default
				</div>
			</div>

			<div class="grid grid-cols-4 text-center">
				<div class="step">Step 3</div>
				<div>
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
						]"
					/>
				</div>
				<div class="cols-span-2">
					Complete a 25 (recommended) minute pomodoro session
				</div>
			</div>

			<div class="grid grid-cols-4 text-center">
				<div class="step">Step 4</div>
				<div>
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
						]"
					/>
				</div>
				<div class="cols-span-2">Work on your tasks until the time is up</div>
			</div>

			<div class="grid grid-cols-4 text-center">
				<div class="step">Step 5</div>
				<div>
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
						]"
					/>
				</div>
				<div class="cols-span-2">Take a 5 (recommended) minute break</div>
			</div>

			<div class="grid grid-cols-4 text-center">
				<div class="step">Step 6</div>
				<div>
					<BaseIcon
						:properties="{
							height: 'h-8',
							width: 'w-8',
							strokeWidth: '1.5',
							classes: ['stroke-pastel-green-500'],
						}"
						:dArray="[
							'M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z',
						]"
					/>
				</div>
				<div class="cols-span-2">
					Every 4 (recommended) pomodoros, take a longer 15-20 minute break
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
							height: 'h-8',
							width: 'w-8',
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
	@apply items-center;
	@apply m-4;
	@apply border;
	@apply rounded-full;

	@apply mt-4;
	@apply border-pastel-blue-500;
	@apply bg-pastel-blue-100;
	@apply text-pastel-yellow-500;
}
</style>
