<template>
    <div>
        <BaseModal 
            v-if="!granted"
            :popupClasses="[
                'bg-pastel-yellow-100',
                'border-pastel-yellow-500',
            ]"
        >
            <template v-slot:body>
                <div class="text-center">
                    We need permission to notify you when each interval ends!
                </div>
            </template>

            <template v-slot:footer>
                <div class="flex justify-center gap-4">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-6 w-6 stroke-pastel-orange-400 clickable" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        stroke-width="2"
                        @click="granted = true"
                    >
						<path stroke-linecap="round" stroke-linejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                    </svg>

                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-6 w-6 stroke-pastel-green-400 clickable" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        stroke-width="2"
                        @click="requestPermission"
                    >
						<path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                </div>
            </template>
        </BaseModal>

        <BaseModal 
            v-if="!hasNotifications"
            :popupClasses="[
                'bg-pastel-yellow-100',
                'border-pastel-yellow-500',
            ]"
        >
            <template v-slot:body>
                <div class="text-center">
                    Your browser does not support notifications so we will not be able to notify you when each interval ends.
                </div>
            </template>

            <template v-slot:footer>
                <div class="flex justify-center gap-2">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-6 w-6" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        stroke-width="2"
                        @click="hasNotifications = true"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            </template>
        </BaseModal>
    </div>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";

export default {
    name: "NotificationPermissions",
    data() {
        return {
            hasNotifications: true,
            granted: true,
        }
    },
    components: {
        BaseModal,
    },
    mounted() {
        console.log(this.granted);
        if ('Notification' in window) {
            this.granted = Notification.permission === 'granted';
            console.log(Notification.permission);
        } else {
            this.hasNotifications = false;
        }
    },
    methods: {
        requestPermission() {
            if ('Notification' in window) {
                Notification.requestPermission(res => {
                    this.granted = res === 'granted';
                });
            }
        },
    },
};
</script>
