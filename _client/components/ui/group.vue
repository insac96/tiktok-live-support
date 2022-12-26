<template>
    <div
        :class="{
            'Group': true,
            'Group--FullWidth': !!fullWidth
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        'fullWidth': { type: Boolean },
    }
}
</script>

<style lang="sass">
.Group
    display: flex
    align-items: center
    &--FullWidth
        width: 100%
    *
        border-radius: 0 !important
    :first-child
        border-top-left-radius: var(--radius) !important
        border-bottom-left-radius: var(--radius) !important
    :last-child
        border-top-right-radius: var(--radius) !important
        border-bottom-right-radius: var(--radius) !important

</style>