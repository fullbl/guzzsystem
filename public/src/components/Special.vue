<template>
	<div>
      <iframe src="https://www.youtube.com/embed/UUXi26yhUiM?rel=0&amp;controls=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </div>
</template>

<script>
	export default {
	  name: 'Special'
	};
</script>

<style scoped>
 iframe{
 	width: 100%;
 	position: absolute;
 	top: 0;
 	left: 0;
 	height: 100%;
 	z-index: -1;
 }
 #app{
 	background: rgba(255,255,255,0.5);
 }
</style>