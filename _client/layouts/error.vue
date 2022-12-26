<template>
	<div class="Error">
		{{ error.statusCode }}
	</div>
</template>

<script>
export default {
  	props: ['error']
}
</script>