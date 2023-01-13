<template>
    <div class="Game">
        <div id="Screen"></div>
    </div>
</template>

<script>
import Launch from '@/game/main'

export default {
    mounted() {
        Launch('Screen')
    }
}
</script>