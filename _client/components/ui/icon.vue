<template>
    <i 
        :class="['bx', `${src}`]"
        :style="{
            'color': !!color ? `rgb(var(--${color}))` : null,
            'font-size': size 
        }"
    ></i>
</template>

<script>
export default {
    props: {
        'src': { type: String },
        'color': { type: String },
        'size': { type: String },
    }
}
</script>