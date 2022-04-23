<template>
  <span v-if="!editMode" @click="editMode=true" >{{text}}</span>
  <input 
		type="text"
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
    text: String,
		width: String,
  },
  data: function() {
      return {
          editMode: false,
          inputContent: this.text,
      }
  },
  methods:{
      clickOut: function() {
          this.editMode = false;
          this.$emit("edited", this.inputContent)
      }
  }
}
</script>

<style scoped>
/* CTN_TODO: figure out why no rounded borders when active */
input[type=text],
input[type=text]:active,
input[type=text]:focus {
	@apply bg-pastel-yellow-100;
	@apply border-pastel-yellow-500;
}
</style>
