<template>
<div class="home">
    <TimerManager ref="timer" v-if="!showSummaryPrompt" @sessionComplete="sessionComplete" />

    <div v-else class="card prompt">
        <div class="flex gap-2 sm:gap-10 items-center">
            <BaseIcon :dArray="['M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z']" />
            <h1 class="text-xl sm:text-3xl">Mission accomplished!</h1>
            <BaseIcon :dArray="['M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z']" />
        </div>

        <div class="sm:px-16">
            Update your progress on any tasks and click below when you're ready to view your session summary!
        </div>

        <div @click="showSummary = true">
            <BaseIcon :properties="{
                        height: 'h-8',
                        width: 'w-8',
                        strokeWidth: '1.5',
                        classes: ['stroke-pastel-green-500'],
                    }" :dArray="   ['M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z']" />
        </div>
    </div>

    <!-- short summary -->
    <div>
        <BaseModal v-if="showSummary" :popupClasses="[
                'bg-pastel-yellow-100',
                'border-pastel-yellow-500',
            ]">
            <template v-slot:body>
                <div class="text-center">

                    <div class="sm:px-16">
                        You have concentrated for {{focusTime/60000}} minutes
                    </div>

                    <br />
                    <div class="sm:px-16">
                        You have been working on {{taskIds}}
                    </div>

                    <br />

                    <div class="flex justify-center" @click="showSummaryPrompt = false, showSummary = false">
                        Start a new session &nbsp;
                        <BaseIcon :properties="{
                        height: 'h-8',
                        width: 'w-8',
                        strokeWidth: '1.5',
                        classes: ['stroke-pastel-green-500'],
                    }" :dArray="   ['M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z']" />
                    </div>

                    <div class="flex justify-center" @click="showDetailSummary = true, showSummary = false">
                        See detail report &nbsp;
                        <BaseIcon :properties="{
                        height: 'h-8',
                        width: 'w-8',
                        strokeWidth: '1.5',
                        classes: ['stroke-pastel-green-500'],
                    }" :dArray="   ['M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z']" />

                    </div>
                </div>
            </template>

            <template v-slot:footer>
            </template>
        </BaseModal>
    </div>

    <!-- complete long summary -->
    <div>
        <BaseModal v-if="showDetailSummary" :popupClasses="[
                'bg-pastel-yellow-100',
                'border-pastel-yellow-500',
            ]">
            <template v-slot:body>
                <div class="text-center">

                    <div v-if="data===false">
                        loading
                    </div>

                    <div v-else>
                        {{data.displayName}}
                        <br />
                        Total Focus Time is: &nbsp; {{data.focusTime}}
                        <br />
                        We have been together for {{date_diff()}} secs? or millisecond?
                        <br />

                        You have worked on {{numberOfTasks}} tasks!!!!
                        <br/>
                        <div class="flex justify-center" @click="showSummaryPrompt = false, showDetailSummary = false">
                            Start a new session &nbsp;
                            <BaseIcon :properties="{
                                height: 'h-8',
                                width: 'w-8',
                                strokeWidth: '1.5',
                                classes: ['stroke-pastel-green-500'],
                            }" :dArray="   ['M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z']" />
                        </div>
                    </div>

                </div>
            </template>

            <template v-slot:footer>
            </template>
        </BaseModal>
    </div>

    <TaskList @trackTask="trackTask" />
    <TimerSettingModal @updated="settingsKey++" />

</div>
</template>

<script>
import BaseIcon from "@/components/BaseIcon.vue";
import BaseModal from "@/components/BaseModal.vue";
import TaskList from "@/components/TaskList.vue";
import TimerManager from "@/components/TimerManager.vue";
import TimerSettingModal from '../components/TimerSettingModal.vue';
import {
    auth,
    db,
} from "@/main";

export default {
    name: "HomeView",
    data() {
        return {
            focusTime: null,
            showSummaryPrompt: false,
            showSummary: false,
            taskIds: [],
            showDetailSummary: false,
            firstDay: 0,
            numberOfTasks: 0,
        }
    },
    components: {
        BaseIcon,
        TaskList,
        TimerManager,
        TimerSettingModal,
        BaseModal,
    },
    firestore: function () {
        return {
            dataSubTask: db.collection('users')
                .doc(auth.currentUser.uid)
                .collection("tasks"),
            data: db.collection('users')
                .doc(auth.currentUser.uid)
        }
    },
    methods: {
        trackTask(taskId) {
            // this will push duplicate values
            // but is filtered before sending to summary modal
            let mode = this.$refs.timer.currentIntervalType;
            let inProgress = this.$refs.timer.timer.running;
            if (mode === "pomodoro" && inProgress) {
                this.taskIds.push(taskId);
            }
        },
        sessionComplete(focusTime) {
            this.focusTime = focusTime;
            this.taskIds = [...(new Set(this.taskIds))];
            this.showSummaryPrompt = true;
        },
        date_db() {
            db.collection('users').doc(auth.currentUser.uid).get().then((doc) => {
                if (doc.exists) {
                    console.log("hello")
                    this.firstDay = doc.data().joinDate;
                } else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        },
        date_diff() {
            return Date.now() - this.firstDay
        },
        db_numberOfTasks() {
            db.collection('users')
                .doc(auth.currentUser.uid)
                .collection("tasks").get().then(snap => {
                    this.numberOfTasks = snap.size // will return the collection size
                });
        }
    },

    watch: {
        taskIds() {
            console.log(this.taskIds);
        },
        focusTime() {
            console.log(this.focusTime);
        }
    },
    created() {
        this.date_db();
        this.db_numberOfTasks();
    }

};
</script>

<style>
.prompt {
    @apply flex;
    @apply flex-col;
    @apply gap-y-4;
    @apply items-center;

    @apply mt-4;
    @apply p-10;
    @apply text-center;

    @apply border-pastel-green-500;
    @apply bg-pastel-green-100;
    @apply text-pastel-green-500;
}
</style>
