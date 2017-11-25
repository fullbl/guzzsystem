<template>
  <form v-on:submit.prevent="save" v-bind:action="action" method="POST">
    <h1>{{ title }}</h1>
    <input-part v-for="input in inputs" key="input.name" v-bind:input="input" v-on:changeEl="handleChanges"></input-part>
    <input type="submit" value="salva">
  </form>
</template>

<script>
import InputPart from './InputPart';
import axios from 'axios';
import errorHandler from '../mixins/errorHandler'

export default {
  name: 'Form',
  components: {
  	InputPart
  },
  methods: {
    handleChanges: function(event) {
      switch(event.target.name){
        case 'date':
          var formController = this;
          event.target.form.disabled = true;
          axios.get(
            event.target.form.action, 
            {
              params: {
                date: event.target.value
              }
            })
          .then((data) => {
            event.target.form.disabled = false;
            console.log(data);
          }).catch((response) => {
            formController.handleError(response);
            event.target.form.disabled = false;
          });
          break;
      }
    },
    save: function(event) {
      event.target.disabled = true;
      let 
        formController = this,
        formData = new FormData(event.target),
        keys = Array.from(formData.keys()),
        values = Array.from(formData.values()),

        data = keys.reduce(function (previous, key, index) {
          previous[key] = values[index];
          return previous
        }, {});

      axios.post(event.target.action, data)
        .then((response) => {
          event.target.disabled = false;
          alert(response.data.message);
        })
        .catch((response) => {
          event.target.disabled = false;
          formController.handleError(response);
        });
    }
  },
  props: ['inputs', 'title', 'action'] ,
  mixins: [errorHandler] 
};
</script>