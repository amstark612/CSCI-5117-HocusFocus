<template>
    <transition name="fade">
        <div class="modal fix">
            <div class="backdrop fix"></div>

            <div class="dialog" :class="popup">
                <div class="modal-header">
                    <slot name="header"/>
                </div>

                <div class="modal-body">
                    <slot name="body"/>
                </div>

                <div class="modal-footer">
                    <slot name="footer"/>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "BaseModal",
    props: {
        popupClasses: Array,
        show: Boolean,
    },
    emits: ['close'],

    computed: {
        popup() {
            return this.popupClasses.join(' ');
        }
    }
};
</script>

<style scoped>
.fix {
    @apply fixed;
    @apply top-0;
    @apply bottom-0;
    @apply left-0;
    @apply right-0;
}

.modal {
    @apply overflow-x-hidden;
    @apply overflow-y-hidden;
    @apply z-30;
}

.backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    @apply z-0;
}

.dialog {
    @apply w-11/12;
    @apply lg:w-4/5;
    @apply xl:w-3/5;
    @apply 2xl:w-2/4;
    @apply relative;
    @apply mt-10;
    @apply mx-auto;
    @apply flex;
    @apply flex-col;
    @apply rounded-lg;
    @apply z-10;
    @apply p-4;
    @apply gap-4;
    @apply border;
}

.modal-body {
    @apply overflow-auto;
    @apply flex;
    @apply flex-col;
    @apply items-stretch;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
