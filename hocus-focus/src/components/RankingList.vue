<template>
	<div id="task-list" class="mt-6">
		<header class="flex justify-center gap-x-1">
			<div>
				<h1>rankings</h1>
			</div>
		</header>
		<div class="grid grid-cols-5">
			<div class="ml-4">rank</div>
			<div class="col-span-2 ml-4">user</div>
			<div></div>
			<div class="text-center">time (hh:mm)</div>
		</div>

		<BaseRankingItem
			v-for="(ranking, index) in rankings"
			:key="ranking.id"
			:ranking="ranking"
			:index="index + 1"
		/>
	</div>
</template>

<script>
import { db } from "@/main";
import BaseRankingItem from "@/components/BaseRankingItem.vue";

export default {
	name: "RankingList",
	data() {
		return {
			rankings: null,
		};
	},
	components: {
		BaseRankingItem,
	},

	firestore() {
		return {
			rankings: db.collection("users").orderBy("focusTime", "desc"),
		};
	},
};
</script>
