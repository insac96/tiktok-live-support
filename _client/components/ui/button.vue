<template>
    <button 
        :class="[
            'Button',
            {
                'Button--Avatar': !!avatar,
                'Button--Square': !!square,
                'Button--Circle': !!circle,
                'Button--Border': !!border, 
            },
            {
                'Button--Flat': !!flat,
                'Button--Content': !!content,
                'Button--Text': !!text,
            },
            {
                'Button--Disabled': !!disabled,
                'Button--Loading': !!loading
            }
        ]"

        :style="{
            '--ui-button-width': width,
            '--ui-button-height': size,
            '--ui-button-color': !!color ? `var(--${color})` : null,
        }"

        @click="$emit('click')"
    >   
        <UiIcon class="spin" src="bx-loader-alt" v-if="!!loading"></UiIcon>
        <slot v-else></slot>
    </button>
</template>

<script>
export default {
    props: {
        'flat': { type: Boolean },
        'content': { type: Boolean },
        'text': { type: Boolean },

        'avatar': { type: Boolean },
        'square': { type: Boolean },
        'circle': { type: Boolean },
        'border': { type: Boolean },

        'disabled': { type: Boolean },
        'loading': { type: Boolean },

        'size': { type: String, default: '40px'},
        'width': { type: String },
        'color': { type: String },
    }
}
</script>

<style lang="sass">
.Button
    --ui-button-color: var(--primary)
    --ui-button-bg-color: var(--ui-button-color)
    --ui-button-bg-opacity: 1
    --ui-button-text-color: 255,255,255

.Button
    display: inline-flex
    align-items: center
    justify-content: center
    width: var(--ui-button-width)
    height: var(--ui-button-height)
    max-height: var(--ui-button-height)
    background: rgba(var(--ui-button-bg-color), var(--ui-button-bg-opacity))
    color: rgb(var(--ui-button-text-color))
    font-size: 0.9rem
    font-weight: 600
    padding: 0 var(--space)
    border-radius: var(--radius)
    transition: all 0.25s ease
    overflow: hidden

    // Type
    &--Avatar
        width: var(--ui-button-height)
        max-width: var(--ui-button-height)
        padding: 0
    &--Square
        border-radius: 0
    &--Circle
        border-radius: 50%
    &--Border
        border: 1px solid rgb(var(--ui-button-text-color))

    // Status
    &--Disabled, &--Loading
        pointer-events: none

    // Style
    &--Flat, &--Content, &--Text
        --ui-button-text-color: var(--ui-button-color)
    &--Flat
        --ui-button-bg-opacity: 0.1
    &--Content
        --ui-button-bg-color: var(--content)
    &--Text
        --ui-button-bg-opacity: 0
</style>