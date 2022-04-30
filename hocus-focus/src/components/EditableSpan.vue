<template>
  <span v-if="!editMode" @click="editMode=true" >{{ text }}</span>
  <input 
		:type="t"
		v-else
        v-focus
		@blur="clickOut" 
		@keyup.enter="clickOut" 
        v-hideOnClickOut
		v-model="inputContent"
		:class="classes"
	/>
</template>

<script>
// CTN_TODO this is hacky idk how else to make it available to both directives
let outsideClickHandler = null;

export default {
    name: 'EditableSpan',
    props: {
        classes: String,
        inputType: String,
        text: String,
    },
    data: function() {
        return {
            editMode: false,
            inputContent: this.text,
        }
    },
	computed: {
		t() {
			return this.inputType ? this.inputType : "text";
		},
	},
    methods: {
        clickOut: function() {
            this.editMode = false;
            this.$emit("edited", this.inputContent)
        },
    },
    directives: {
        focus: {
            inserted: (element) => element.focus(),
        },
        hideOnClickOut: {
            inserted: (element) => {
                outsideClickHandler = (evt) => {
                    if (!element.contains(evt.target)) {
                        // CTN_TODO surprisingly, we do not need additional code to update things
                        // just doing this somehow makes clicks outside of the element detectable
                        console.log('updating field');
                    }
                }

                document.addEventListener('click', outsideClickHandler);
                document.addEventListener('touchstart', outsideClickHandler);
            },
            unbind: () => {
                document.removeEventListener('click', outsideClickHandler);
                document.removeEventListener('touchstart', outsideClickHandler);
            }
        },
    },
};
</script>

<style scoped>
input[type=text],
input[type=text]:active,
input[type=text]:focus {
	@apply bg-pastel-yellow-100;
	@apply border-pastel-yellow-500;
    @apply outline-none;
}
</style>
