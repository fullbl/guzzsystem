<template>
	<div>
	  <form v-on:submit.prevent="load" method="GET" v-bind:action="listUrl">
	  	<label>Dal giorno
	  		<input type="date" name="from" required>
	  	</label>
	  	<label>Al giorno
	  		<input type="date" name="to">
	  	</label>
	    <input type="submit" value="carica" class="btn btn-success">
	  </form>

	  <table>
	  	<tr>
	  		<th>Nome</th>
	  		<th>Valore</th>
	  	</tr>
	  	<tr v-for="row in rows">
	  		<td>{{row.name}}</td>
	  		<td>{{row.value}}</td>
	  	</tr>
	  </table>
	</div>
</template>

<script>
import resources from '../services/resources';
import errorHandler from '../mixins/errorHandler'

export default {
	name: 'List',
  
  	methods: {
		load: function(event){
			let params;
			if(!event.target.from){
				alert('Inserire la data di inizio');
			}
			if(!event.target.to){
				event.target.to = event.target.from;
			}
			params = {
				'from' => event.target.from,
				'to' => event.target.to
			}

			resources.get(
				event.target.action,
				params,
				function(data){
					this.rows = data;
				},
				function(error){
					formController.handleError(response);
				}

			)
			

		}
  	},
  	props: ['listUrl', 'rows'] ,
  	mixins: [errorHandler] 

}
</script