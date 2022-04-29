<template>
  <span v-if="!editMode" @click="editMode=true" >{{ text }}</span>
  <input 
		:type="t"
		v-else
		@blur="clickOut" 
		@keyup.enter="clickOut" 
		v-model="inputContent"
		:class="classes"
	/>
</template>

<script>
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
  methods:{
      clickOut: function() {
          this.editMode = false;
          this.$emit("edited", this.inputContent)
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
