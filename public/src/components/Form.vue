<template>
  <form>
    <h1>{{ title }}</h1>
    <input-part v-for="input in inputs" key="input.name" v-bind:input="input"></input-part>
    <input type="button" value="salva">
  </form>
</template>

<script>
import InputPart from './InputPart';
export default {
  name: 'Form',
  components: {
  	InputPart
  },
  props: ['inputs', 'title']  
};
</script>