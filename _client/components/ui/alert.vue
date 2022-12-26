<template>
    <div 
        :class="{
            'Alert': true,
        }" 
        
        :style="{
            '--ui-alert-color': !!color ? `var(--${color})` : null,
        }"
    >   
        <div class="Alert__Icon" v-if="!!icon">
            <UiIcon :src="icon" size="1.1rem"></UiIcon>
        </div>

        <div class="Alert__Content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        'color': { type: String },
        'icon': { type: String },
    }
}
</script>

<style lang="sass">
.Alert
    --ui-alert-color: var(--primary)

.Alert
    display: flex
    align-items: center
    justify-content: space-between
    background: rgb(var(--content))
    color: rgb(var(--ui-alert-color))
    font-size: 0.85rem
    font-weight: 600
    padding: var(--space)
    border-radius: var(--radius)
    box-shadow: var(--shadow)
    transition: all 0.25s ease
    overflow: hidden

    &__Icon
        display: flex
        align-items: center
        justify-content: center
        min-width: 30px
        min-height: 30px
        max-width: 30px
        max-height: 30px
        border-radius: var(--radius)
        background: rgb(var(--ui-alert-color))
        color: #ffffff
        margin-right: var(--space)

    &__Content
        flex-grow: 1
        word-wrap: break-word
        overflow: hidden
</style>