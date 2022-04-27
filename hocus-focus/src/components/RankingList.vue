<template>
	<div id="task-list" class="mt-6">
		<header class="flex justify-center gap-x-1">
			<div>
				<h1>rankings</h1>
			</div>
		</header>
		<div class="grid grid-cols-4">
			<div class="col-span-2 ml-4">user</div>
			<div></div>
			<div class="text-center">time (hh:mm)</div>
		</div>

		<BaseRankingItem
			v-for="ranking in rankings"
			:key="ranking.id"
			:ranking="ranking"
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
