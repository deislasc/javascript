<template>
	<div class="layout-footer">
		<span class="footer-text" style="margin-right: 5px"></span>
		<img src="../public/assets/layout/images/betalog.jpg" />
	</div>
</template>

<script>
	export default {
		name: "AppFooter"
	}
</script>

<style scoped>
.layout-footer img{
    width: 50px;
	margin-left: auto;
	margin-right: auto;
	transition: 0.3s;
	opacity: 1;
}
.layout-footer img:hover{
	opacity: 0.7;
}

</style>