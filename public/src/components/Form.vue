<template>
  <form v-on:submit.prevent="save" v-bind:action="action" method="POST">
    <h1>{{ title }}</h1>
    <input-part v-for="input in inputs" key="input.name" v-bind:input="input"></input-part>
    <input type="submit" value="salva">
  </form>
</template>

<script>
import InputPart from './InputPart';
import axios from 'axios';

export default {
  name: 'Form',
  components: {
  	InputPart
  },
  methods: {
    save: (event)=> {
      let formData = new FormData(event.target);
      axios.post(event.target.action)
        .then((response) => {
          alert('ok');
        })
        .catch((response) => {
          alert('ko');
        });
    }
  },
  props: ['inputs', 'title']  
};
</script>