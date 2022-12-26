<template>
    <div 
        :class="{
            'Flex': true,
            'Flex--Content': !!content,
            'Flex--FullWidth': !!fullWidth
        }"
        :style="{
            'align-items': align,
            'justify-content': justify,
            'flex-direction': type,
            'flex-wrap': wrap,
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        'align': { type: String, default: 'center' },
        'justify': { type: String },
        'type': { type: String },
        'wrap': { type: String },
        'content': { type: Boolean },
        'fullWidth': { type: Boolean },
    }
}
</script>

<style lang="sass" scoped>
.Flex
    display: flex
    &--Content
        background: rgb(var(--content))
        border-radius: var(--radius)
        box-shadow: var(--shadow)
        padding: var(--space)
    &--FullWidth
        width: 100%
</style>