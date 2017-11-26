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

	  <table class="table table-striped">
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
  	data: function(){
  		return {'rows': this.rows};
  	},
  	rows: [],
  	methods: {
		load: function(event){
			let params;
			let listController = this;
			if(!event.target.from.value){
				alert('Inserire la data di inizio');
			}
			if(!event.target.to.value){
				event.target.to.value = event.target.from.value;
			}
			params = {
				'from': event.target.from.value,
				'to': event.target.to.value
			}

			resources.get(
				event.target.action,
				params,
				function(data){
					listController.rows = Object.entries(data.data[0]).map(function(el){
						return {"name": el[0], "value": el[1]};
					});
				},
				function(error){
					listController.handleError(error);
				}

			)
			

		}
  	},
  	props: ['listUrl'],
  	mixins: [errorHandler] 

};
</script>
<style scoped>
	table{
		display: inline-block;
		width: auto;
	}
</style>