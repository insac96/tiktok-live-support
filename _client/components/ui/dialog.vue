<template>
    <transition name="show">
        <div 
            v-if="!!show"
            :class="{
                'Dialog': true,
                'Dialog--Bottom': !!bottom,
                'Dialog--Top': !!top,
                'Dialog--Blur': !!blur && !!overlay,
            }"
            :style="{
                '--ui-dialog-max-width': maxWidth
            }"
        >
            <div 
                :class="{
                    'Dialog__Overlay': true,
                    'Dialog__Overlay--Hidden': !overlay
                }"
                @click="hide"
            ></div>

            <div class="Dialog__Content">
                <slot></slot>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        'show': { type: Boolean },
        'blur': { type: Boolean, default: true },
        'overlay': { type: Boolean, default: true },
        'bottom': { type: Boolean },
        'top': { type: Boolean },
        'maxWidth': { type: String }
    },
    model: {
        prop: 'show',
        event: 'change'
    },
    methods: {
        hide () {
            this.$emit('change', false)
        }
    }
}
</script>

<style lang="sass">
.Dialog
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    display: flex
    align-items: center
    justify-content: center
    padding: var(--space)
    overflow: hidden
    z-index: 999

    &__Overlay
        position: absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        background: rgba(0, 0, 0, 0.5)
        &--Hidden
            background: none

    &__Content
        position: relative
        width: 100%
        max-width: var(--ui-dialog-max-width)
        background: rgb(var(--background))
        padding: var(--space)
        border-radius: var(--radius)
        animation: var(--ui-dialog-animation)

    &--Blur
        backdrop-filter: saturate(180%) blur(15px)
    &--Bottom
        align-items: flex-end
    &--Top
        align-items: flex-start

.show-enter-active 
    &.Dialog
        --ui-dialog-animation: zoom-effect .25s cubic-bezier(.3, .5 , 0 , 1.5) forwards
    &.Dialog--Bottom
        --ui-dialog-animation: up-effect .25s cubic-bezier(.3, .5 , 0 , 1.5) forwards
    &.Dialog--Top
        --ui-dialog-animation: down-effect .25s cubic-bezier(.3, .5 , 0 , 1.5) forwards

.show-leave-active 
    &.Dialog
        --ui-dialog-animation: zoom-effect .25s reverse cubic-bezier(.3, .5 , 0 , 1.5) forwards
    &.Dialog--Bottom
        --ui-dialog-animation: up-effect .25s reverse cubic-bezier(.3, .5 , 0 , 1.5) forwards
    &.Dialog--Top
        --ui-dialog-animation: down-effect .25s reverse cubic-bezier(.3, .5 , 0 , 1.5) forwards
</style>