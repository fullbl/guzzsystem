<template>
	<div v-if="input.type==='group'" class="form-group">
		<h2>{{ input.label }}</h2>
		<input-part v-for="subinput in input.inputs" key="subinput.name" v-bind:input="subinput"></input-part>		
	</div>
	<label v-else>
		<span>{{ input.label }}</span>
		<input v-bind="input" class="form-control" v-on:change="changeEl">
	</label>
</template>

<script>
	export default {
	  name: 'InputPart',
	  props: ['input'],
	  methods: {
	  	changeEl: function(event) {
	  		this.$emit('changeEl', event);
	  	}
	  }

	};
</script>