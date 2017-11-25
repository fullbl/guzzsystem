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
      let formData = new FormData(event.target),
        keys = Array.from(formData.keys()),
        values = Array.from(formData.values()),

        data = keys.reduce(function (previous, key, index) {
          previous[key] = values[index];
          return previous
        }, {});

      axios.post(event.target.action, data)
        .then((response) => {
          alert(response.data.message);
        })
        .catch((response) => {
          try{
            alert(response.response.data.message);
          }
          catch(e){
            try{
              alert(response.message);
            }
            catch(e){
              alert('errore sconosciuto');
            }
          }
        });
    }
  },
  props: ['inputs', 'title']  
};
</script>