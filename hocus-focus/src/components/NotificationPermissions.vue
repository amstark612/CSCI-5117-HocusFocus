<template>
    <span v-if="!granted" @click="requestPermission">Click me</span>
</template>

<script>
export default {
    name: "NotificationPermissions",
    data() {
        return {
            granted: false,
        }
    },
    mounted() {
        if ('Notification' in window) {
            this.granted = Notification.permission === 'granted';
        } else {
            console.log('show modal asking user for permission');
        }
    },
    methods: {
        requestPermission() {
            if ('Notification' in window) {
                console.log('we have notifications, request permission');
                Notification.requestPermission(res => {
                    if (res === 'granted') {
                        this.granted = true;
                    }
                });
            }
        },
    },
};
</script>
