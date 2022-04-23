<template>
	<div class="rankings">
		<RankingList />
	</div>
</template>

<script>
import RankingList from "@/components/RankingList.vue";

export default {
	name: "RankingView",
	components: {
		RankingList,
	},
};
</script>
