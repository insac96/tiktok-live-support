<template>
    <input 
        :value="value"
        :type="type"
        :placeholder="placeholder"
        :readonly="readOnly"
        :disabled="disabled"
        @input="onInput"
        :class="[
            'Input',
            {
                'Input--Flat': !!flat,
                'Input--Content': !!content,
                'Input--Border': !!border,
                'Input--Disabled': !!disabled
            }
        ]"
        :style="{
            '--ui-input-width': width,
            '--ui-input-height': height,
            '--ui-input-color': !!color ? `var(--${color})` : null,
        }"
    />
</template>

<script>
export default {
    props: {
        'value': { type: String || Boolean || Number },
        'placeholder': { type: String },
        'type': { type: String, default: 'text' },
        'readOnly': { type: Boolean },
        'disabled': { type: Boolean },

        'width': { type: String },
        'height': { type: String, default: '40px' },
        'color': { type: String },

        'flat': { type: Boolean },
        'content': { type: Boolean },
        'border': { type: Boolean },
        
    },
    model: {
        prop: 'value',
        event: 'change'
    },
    methods: {
        onInput (e) {
            this.$emit('change', e.target.value)
            this.$emit('input', e.target.value)
        }
    }
}
</script>

<style lang="sass">
.Input
    --ui-input-color: var(--primary)
    --ui-input-width: auto
    --ui-input-height: auto
    --ui-input-bg-color: var(--ui-input-color)
    --ui-input-bg-opacity: 1
    --ui-input-text-color: 255,255,255
    
.Input
    display: block
    width: var(--ui-input-width)
    height: var(--ui-input-height)
    max-height: var(--ui-input-height)
    background: rgba(var(--ui-input-bg-color), var(--ui-input-bg-opacity))
    color: rgb(var(--ui-input-text-color))
    padding: var(--space)
    border-radius: var(--radius)
    font-size: 0.85rem
    transition: all 0.25s ease

    &::placeholder
       color: rgb(var(--ui-input-text-color))

    &--Border
        border: 1px solid rgb(var(--ui-input-text-color))

    &--Disabled
        pointer-events: none

    &--Flat, &--Content
        --ui-input-text-color: var(--ui-input-color)
        &::placeholder
            color: rgba(var(--ui-input-color), 0.5)
    &--Flat
        --ui-input-bg-opacity: 0.1
    &--Content
        --ui-input-bg-color: var(--content)

    
</style>