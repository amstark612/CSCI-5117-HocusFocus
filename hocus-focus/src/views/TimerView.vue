<template>
  <div class="card setting-timer">
      <svg xmlns="http://www.w3.org/2000/svg" 
           class="h-6 w-6 clickable" 
           fill="none" viewBox="0 0 24 24" 
           stroke="currentColor" 
           stroke-width="2">
            <path stroke-linecap="round" 
                  stroke-linejoin="round" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <button>Timer</button>
      <!-- <button disabled> Theme </button> -->
      <br/>
      <h4> promodora duration : <editable-span :text="25" @edited="updatePromo"/></h4> 
      <br/>
      <h4> short break duration : <editable-span :text="5" @edited="updateShort"/></h4>
      <br/>
      <h4> long break duration : <editable-span :text="10" @edited="updateLong"/></h4>
      <br/>
      <label> long break delay : <editable-span :text="4" @edited="updateDelay"/></label>
      <br/>
      <label> atuo start breaks : </label>
      <br/>
      <button>close X </button>

  </div>
</template>

<script>
import EditableSpan from '../components/EditableSpan.vue'
export default {
  components: { EditableSpan },

}
</script>

<style>
button {
    border-radius: 50px;
    border-color: #d09098;
    background-color: #d09098;
    padding-left: 1%;
    padding-right: 1%;
    margin-left: 2%;
}
</style>