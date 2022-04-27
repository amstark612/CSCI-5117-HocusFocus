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
