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
// import { auth, db } from "@/main";
import BaseRankingItem from "@/components/BaseRankingItem.vue";

export default {
	name: "RankingList",
	data() {
		return {
			rankings: [
				{
					displayName: "kinzaahmed",
					email: "ahme0170@umn.edu",
					profilePicture:
						"https://i.pinimg.com/222x/aa/cd/98/aacd98e4d486e4fa08728dfee36ef75c.jpg",
					focusTime: 45,
				},
				{
					displayName: "christina",
					email: "test@test.edu",
					profilePicture:
						"https://i.pinimg.com/236x/d1/4a/b5/d14ab57b9ddcfa1240ffabd13f8b609c.jpg",
					focusTime: 40,
				},
				{
					displayName: "anon",
					email: "anon@umn.edu",
					profilePicture:
						"https://i.pinimg.com/564x/1b/14/34/1b1434c7d78bca9e24bcb89e5126903c.jpg",
					focusTime: 3,
				},
			],
		};
	},
	components: {
		BaseRankingItem,
	},

	firestore() {
		// return {
		// 	tasks: db
		// 		.collection("tasks")
		// 		.where("userId", "==", auth.currentUser.uid)
		// 		.orderBy("createdAt"),
		// };
	},
};
</script>
