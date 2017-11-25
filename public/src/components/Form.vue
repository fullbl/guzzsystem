<template>
  <form v-on:submit.prevent="save" v-bind:action="action" method="POST">
    <h1>{{ title }}</h1>
    <input-part v-for="input in inputs" key="input.name" v-bind:input="input" v-on:changeEl="handleChanges"></input-part>
    <input type="submit" value="salva" class="btn btn-success">
  </form>
</template>

<script>
import InputPart from './InputPart';
import resources from '../services/resources';
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
          resources.get(
            event.target.form.action, 

            {date: event.target.value},

            (data) => {
              event.target.form.disabled = false;
              for(let i in event.target.form.elements){
                if(!event.target.form.elements.hasOwnProperty(i))
                  continue;
                let input = event.target.form.elements[i];
                if(data.data.hasOwnProperty(input.name))
                  input.value = data.data[input.name];
              }
            },

            (response) => {
              formController.handleError(response);
              event.target.form.disabled = false;
            }
          );
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

      resources.post(
        event.target.action, 

        data,

        (response) => {
          event.target.disabled = false;
          alert(response.data.message);
        },

        (response) => {
          event.target.disabled = false;
          formController.handleError(response);
        }

      );
    }
  },
  props: ['inputs', 'title', 'action'] ,
  mixins: [errorHandler] 
};
</script>