<template>
    <div class="Home">
        <!--Header-->
        <UiFlex class="Header" justify="space-between">
            <!--State Server-->
            <UiButton avatar circle text size="auto" disabled :color="colorState('server')" :loading="state.server.loading">
                <UiIcon :src="icon.server" size="1.5rem" />
            </UiButton>

            <!--Title-->
            <UiText size="1.1rem" weight="700">Tiktok Live</UiText>

            <!--Setting-->
            <UiButton avatar circle text color="light" size="auto">
                <UiIcon :src="icon.config" size="1.5rem" />
            </UiButton>
        </UiFlex>

        <!--Body-->
        <div class="Body">
            <!--Connect-->
            <UiGroup class="Connect">
                <UiInput
                    content border
                    width="100%" 
                    placeholder="User ID"
                    v-model="config.user"
                    :color="colorState('live')"
                    :disabled="!!isActive || !!state.live.loading || !state.server.connected"
                >
                </UiInput>

                <UiButton
                    :disabled="!state.server.connected"
                    :loading="!!state.live.loading"
                    :color="colorState('live')"
                    @click="connect"
                >
                    <UiText class="mx-1">
                        {{ !state.live.connected ? 'Connect' : 'Disconnect' }}
                    </UiText>
                </UiButton>
            </UiGroup>

            <!--Config Noftications-->
            <transition name="show">
                <UiFlex content justify="space-between" class="mt-1" v-if="!!isActive">
                    <UiButton
                        avatar size="50px"
                        v-for="(value, key) in config.noftication"
                        :key="key"
                        :disabled="!isActive"
                        :flat="!value"
                        :color="!value ? 'light' : 'primary'"
                        @click="updateConfig('noftication', `${key}`)"
                    >
                        <UiIcon :src="icon[key]" size="1.5rem"></UiIcon>
                    </UiButton>
                </UiFlex>
            </transition>
        </div>

        <!--Noftications-->
        <transition-group tag="div" name="list" class="Noftications">
            <UiAlert 
                v-for="(item) in noftications.slice().reverse()" 
                :key="item.id" 
                :color="item.color" 
                :icon="item.icon"
            >
                {{ item.text }}
            </UiAlert>
        </transition-group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            config: {
                user: 'jiachan.99',
                noftication: {
                    gift: false,
                    share: true,
                    follow: true,
                    envelope: false,
                    chat: false
                },
            },

            state: {
                server: {
                    connected: false,
                    loading: true
                },
                live: {
                    connected: false,
                    loading: false
                }
            },

            icon: {
                success: 'bxs-check-circle',
                warn: 'bx-loader',
                danger: 'bxs-error-circle',
                gift: 'bxs-gift',
                share: 'bxs-share',
                follow: 'bxs-user-plus',
                envelope: 'bxs-package',
                chat: 'bxs-chat',
                config: 'bxs-cog',
                server: 'bxs-server',
            },

            noftications: [],
        }
    },

    computed: {
        isActive () {
            return (!!this.state.server.connected && !!this.state.live.connected && !this.state.live.loading)
        }
    },

    mounted () {
        this.serverSocket()
        this.liveSocket()
    },

    methods: {
        // Color State
        colorState (type) {
            if(!!this.state[type].loading){
                return 'warn'
            }
            else {
                if(!!this.state[type].connected){
                    return 'success'
                }
                else {
                    return 'danger'
                }
            }
        },

        // Server Socket
        serverSocket () {
            // Connect
            this.$socket.on('connect', () => {
                this.state.server.connected = true
                this.state.server.loading = false

                // If Live is Connected, Reconnect Live
                if(!!this.state.live.connected){
                    this.connect()
                }
            })

            // Disconnect
            this.$socket.on('disconnect', () => {
                this.state.server.connected = false
                this.state.server.loading = true

                // If Live is Connected, Loading Reconnect Live
                if(!!this.state.live.connected){
                    this.state.live.loading = true
                }
            })

            // Reconnect Attempt
            this.$socket.io.on("reconnect_attempt", () => {
                if(!!this.state.server.loading) return
                
                this.state.server.loading = true
            })

            // Reconnect Failed
            this.$socket.io.on("reconnect_failed", () => {
                // Update State Server
                this.state.server.connected = false
                this.state.server.loading = false
                
                // Update State Live
                this.state.live.connected = false
                this.state.live.connecting = false
            })
        },

        // Live Socket
        liveSocket () {
            // Listen Live Connect
            this.$socket.on('live-on-connect', (status) => {
                this.state.live.loading = false
                this.state.live.connected = status
            })

            // Listen Live Disconnect
            this.$socket.on('live-on-disconnect', () => {
                this.state.live.loading = false
                this.state.live.connected = false
            })
            
            // Listen Live Noftication
            this.$socket.on('live-on-noftication', (noftication) => {
                this.PushNoftication(noftication)
            })
        },

        // Connect LiveStream
        connect () {
            // Check State Server
            if(!this.state.server.connected) return
            
            // Check Connected
            if(!!this.state.live.connected) return this.disconnect()

            // Update State Live Loading
            this.state.live.loading = true

            // Emit Live Connect
            this.$socket.emit('live-emit-connect', this.config)
        },

        // Disvonnect LiveStream
        disconnect () {
            // Update State Live Loading
            this.state.live.loading = true

            // Emit Live Disconnect
            this.$socket.emit('live-emit-disconnect', true)
        },

        // Update Config
        updateConfig (type, key, value) {
            this.config[type][key] = !this.config[type][key]
            this.$socket.emit('live-emit-config', this.config)
        },

        // Push Noftication
        PushNoftication ({id, type, color, text}) {
            this.noftications.push({
                id: id,
                type: type,
                color: color,
                text: text,
                icon: this.icon[type]
            })
        },
    }
}
</script>

<style lang="sass">
.Home
    position: relative
    display: flex
    flex-direction: column
    width: 100%
    height: 100vh
    min-height: 0px
    max-height: 100vh
    overflow: hidden

    .Header, .Body, .Noftications
        padding: var(--space)

    .Noftications
        padding-top: 0
        flex-grow: 1
        overflow: auto
        .Alert
            width: 100%
            margin-bottom: var(--space)
            user-select: none
            &:last-child
                margin-bottom: 0

</style>
