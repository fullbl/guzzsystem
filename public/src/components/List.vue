<template>
	<div>
	  <form v-on:submit.prevent="load" method="GET" v-bind:action="listUrl">
	  	<label>Dal giorno
	  		<input type="date" name="from" required>
	  	</label>
	  	<label>Al giorno
	  		<input type="date" name="to">
	  	</label>
	  	<label>Lista
	  		<select name="type">
	  			<option value="">entrambi</option>
	  			<option value="bar">bar</option>
	  			<option value="ingresso">ingresso</option>
	  		</select>
	  	</label>
	    <input type="submit" value="carica" class="btn btn-success">
	  </form>

	  <table class="table table-striped">
	  	<tr v-for="name in names">
	  		<td>{{name}}</td>
	  		<td v-for="row in rows">
	  			<span v-if="row.hasOwnProperty(name)">{{row[name]}}</span>
	  			<span v-else>&nbsp;</span>
	  		</td>
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
  		return {'rows': this.rows, 'names': this.names};
  	},
  	rows: [],
  	names: [],
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
				'to': event.target.to.value,
				'type': event.target.type.value
			}

			resources.get(
				event.target.action,
				params,
				function(data){
					if(0 === data.data.length){
						listController.rows = {};
						return;
					}

					let totals = data.data.reduce((carry, el) => {
						if('Totale' === el.date)
							return carry;
						for(let i in el){
							if(!el.hasOwnProperty(i) || isNaN(el[i]))
								continue;
							if(!carry.hasOwnProperty(i)){
								carry[i] = 0;
							}

							carry[i] += el[i];
						}
						return carry;	
					}, {});

					let names = data.data.reduce((carry, row)=> {
						return carry.concat(Object.keys(row));
					}, []);
					listController.names = [...new Set(names)];

					listController.rows = data.data.map((el) => {
						delete el[''];
						if('Totale' !== el.date ){
							let date = new Date(el.date);
							el.date = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(); 
						}
						else{
							for(let i in listController.names){
								let name = listController.names[i];
								if(totals.hasOwnProperty(name)){
									el[name] = totals[name];
								}
							}
						}
						return el;
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