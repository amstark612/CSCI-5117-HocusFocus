<template>
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
            <div class="flex justify-center gap-2">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    stroke-width="2"
                    @click="granted = true"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    stroke-width="2"
                    @click="requestPermission"
                >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
        </template>
    </BaseModal>
</template>

<script>
import BaseModal from "@/components/BaseModal.vue";

export default {
    name: "NotificationPermissions",
    data() {
        return {
            granted: true,
        }
    },
    components: {
        BaseModal,
    },
    mounted() {
        if ('Notification' in window) {
            this.granted = Notification.permission === 'granted';
            console.log(this.granted);
        } else {
            console.log('something about We cannot send you notifications when your time is up');
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
