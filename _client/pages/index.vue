<template>
    <div class="Home">
        <!--Header-->
        <UiFlex class="Header" justify="space-between">
            <!--State Server-->
            <UiButton avatar circle text size="auto" disabled :color="colorState('server')" >
                <UiIcon :src="icon.server" size="1.5rem" />
            </UiButton>

            <!--Title-->
            <UiText size="1.1rem" weight="700">Tiktok Live Support</UiText>

            <!--Setting-->
            <UiButton avatar circle text color="light" size="auto">
                <UiIcon :src="icon.config" size="1.5rem" />
            </UiButton>
        </UiFlex>

        <!--Body-->
        <div class="Body">
            <!--Audio-->
            <audio src="/public/audio/system/connect.mp3" preload="auto" ref="audio"></audio>

            <!--Connect-->
            <UiGroup class="Connect">
                <UiInput
                    content border
                    width="100%" 
                    placeholder="User ID"
                    v-model="config.user"
                    :color="colorState('live')"
                    :disabled="!!isActive || !!state.live.loading"
                >
                </UiInput>

                <UiButton
                    :loading="!!state.live.loading"
                    :color="colorState('live')"
                    @click="actionButtonConnect"
                >
                    <UiText class="mx-1">
                        {{ !state.live.connected ? 'Connect' : 'Disconnect' }}
                    </UiText>
                </UiButton>
            </UiGroup>

            <!--Config TTS, Bot-->
            <transition name="show">
                <UiFlex content class="mt-1" v-if="!!isActive">
                    <!--TTS-->
                    <UiGroup class="mr-1">
                        <UiButton 
                            flat
                            :disabled="!isActive"
                            :color="!!config.tts.active ? 'primary' : 'light'"
                            @click="updateConfig('tts', 'active', null)"
                        >
                            <UiIcon :src="icon.tts" class="mr-1" size="1rem"></UiIcon>
                            Voice
                        </UiButton>

                        <UiButton 
                            flat color="light" 
                            v-if="!!config.tts.active" 
                            :disabled="!isActive"
                            @click="dialog.tts = true"
                        >
                            <UiIcon :src="icon.config" size="1rem"></UiIcon>
                        </UiButton>
                    </UiGroup>

                    <!--Bot-->
                    <UiGroup>
                        <UiButton 
                            flat 
                            :disabled="!isActive"
                            :color="!!config.bot.active ? 'primary' : 'light'"
                            @click="updateConfig('bot', 'active', null)"
                        >
                            <UiIcon :src="icon.bot" class="mr-1" size="1rem"></UiIcon>
                            Bot
                        </UiButton>

                        <UiButton
                            flat color="light" 
                            v-if="!!config.bot.active" 
                            :disabled="!isActive"
                            @click="dialog.bot = true"
                        >
                            <UiIcon :src="icon.config" size="1rem"></UiIcon>
                        </UiButton>
                    </UiGroup>
                </UiFlex>
            </transition>

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

        <!--Dialog Config TTS-->
        <UiDialog v-model="dialog.tts">
            <!--Voice Person-->
            <UiFlex type="column" align="flex-start" class="mb-1">
                <UiText weight="700" class="mb-1">Giọng đọc</UiText>
                <UiGroup full-width>
                    <UiButton width="100%" :flat="config.tts.name !== 'A'" @click="updateConfig('tts', 'name', 'A')">A</UiButton>
                    <UiButton width="100%" :flat="config.tts.name !== 'B'" @click="updateConfig('tts', 'name', 'B')">B</UiButton>
                    <UiButton width="100%" :flat="config.tts.name !== 'C'" @click="updateConfig('tts', 'name', 'C')">C</UiButton>
                    <UiButton width="100%" :flat="config.tts.name !== 'D'" @click="updateConfig('tts', 'name', 'D')">D</UiButton>
                </UiGroup>
            </UiFlex>

            <!--Speed-->
            <UiFlex type="column" align="flex-start" class="mb-1">
                <UiFlex justify="space-between" full-width class="mb-1">
                    <UiText weight="700">Tốc độ đọc</UiText>
                    <UiText weight="700" color="primary">{{ config.tts.speed }}</UiText>
                </UiFlex>

                <input 
                    class="mb-1"
                    type="range" 
                    min="0.25" max="2" step="0.25" 
                    v-model="config.tts.speed" 
                    :disabled="!isActive"
                    @change="updateConfig('ttf', 'speed', config.tts.speed)"
                />
            </UiFlex>

            <!--Pitch-->
            <UiFlex type="column" align="flex-start">
                <UiFlex justify="space-between" full-width class="mb-1">
                    <UiText weight="700">Cao độ giọng</UiText>
                    <UiText weight="700" color="primary">{{ config.tts.pitch }}</UiText>
                </UiFlex>

                <input 
                    class="mb-1"
                    type="range" 
                    min="0.25" max="2" step="0.25" 
                    v-model="config.tts.pitch" 
                    :disabled="!isActive"
                    @change="updateConfig('ttf', 'pitch', config.tts.pitch)"
                />
            </UiFlex>
        </UiDialog>

        <!--Dialog Config Bot-->
        <UiDialog v-model="dialog.bot">
            <!--Session-->
            <UiFlex type="column" align="flex-start">
                <UiText weight="700" class="mb-1">Mã xác thực</UiText>
                <UiGroup full-width>
                    <UiInput
                        content border
                        width="100%" 
                        placeholder="Bot Session"
                        v-model="config.bot.session"
                        :disabled="!isActive"
                    >
                    </UiInput>

                    <UiButton 
                        :disabled="!isActive"
                        @click="updateConfig('bot', 'session', config.bot.session)"
                    >
                        <UiText class="mx-1">Save</UiText>
                    </UiButton>
                </UiGroup>
            </UiFlex>
        </UiDialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            dialog: {
                tts: false,
                bot: false
            },

            config: {
                user: 'jiachan.99',
                tts: {
                    active: false,
                    name: 'A',
                    pitch: 0,
                    speed: 1,
                },
                bot: {
                    active: false,
                    session: 'e4a4e8c1c1254d90f2eccb320815f66f'
                },
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
                    loading: false
                },
                live: {
                    connected: false,
                    loading: false
                }
            },

            audio: {
                running: false,
                loop: null,
                list: [],
            },

            icon: {
                connect: 'bxs-check-circle',
                connecting: 'bx-loader',
                disconnect: 'bxs-error-circle',
                error: 'bxs-error',
                gift: 'bxs-gift',
                share: 'bxs-share',
                follow: 'bxs-user-plus',
                envelope: 'bxs-package',
                chat: 'bxs-chat',
                config: 'bxs-cog',
                server: 'bxs-server',
                tts: 'bxs-user-voice',
                bot: 'bxs-bot',
                male: 'bx-male',
                female: 'bx-female'
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
        this.PushNoftication({
            text: 'Xin chào, ứng dụng đã sẵn sàng để hoạt động',
            color: 'primary',
            icon: 'bxs-wink-smile'
        })

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
                    this.connect(true)
                }

                // Push Noftication
                this.PushNoftication({
                    text: 'Server đã kết nối',
                    color: 'success',
                    icon: this.icon.connect
                })
            })

            // Disconnect
            this.$socket.on('disconnect', () => {
                this.state.server.connected = false
                this.state.server.loading = false

                // Hide All Dialog
                this.dialog.tts = false
                this.dialog.bot = false

                // If Live is Connected, Loading Reconnect Live
                if(!!this.state.live.connected){
                    this.state.live.loading = true
                }

                // Push Noftication
                this.PushNoftication({
                    text: 'Server mất kết nối',
                    color: 'danger',
                    icon: this.icon.disconnect
                })
            })

            // Reconnect Attempt
            this.$socket.io.on("reconnect_attempt", () => {
                if(!!this.state.server.loading) return

                this.state.server.loading = true

                // Push Noftication
                this.PushNoftication({
                    text: 'Đang kết nối lại với Server',
                    color: 'warn',
                    icon: this.icon.connecting
                })
            })

            // Reconnect Failed
            this.$socket.io.on("reconnect_failed", () => {
                this.state.server.loading = false
                
                // Update State Live
                this.state.live.connected = false
                this.state.live.connecting = false

                // Push Noftication
                this.PushNoftication({
                    text: 'Server không thể kết nối lại, vui lòng thoát và mở lại ứng dụng',
                    color: 'danger',
                    icon: this.icon.disconnect
                })
            })
        },

        // Live Socket
        liveSocket () {
            // Listen Live Connect
            this.$socket.on('live-on-connect', (result) => {
                this.state.live.loading = false

                // Success Connect
                if(result.err === false){
                    this.state.live.connected = true

                    this.createLoopAudio()

                    this.PushNoftication({
                        text: result.mesage,
                        color: 'success',
                        icon: this.icon.connect
                    })
                }

                // Error Connect
                if(result.err === true){
                    this.state.live.connected = false

                    this.clearLoopAudio()

                    this.PushNoftication({
                        text: 'Kết nối Livetream không thành công',
                        color: 'danger',
                        icon: this.icon.disconnect
                    })
                    this.PushNoftication({
                        text: result.mesage,
                        color: 'danger',
                        icon: this.icon.disconnect
                    })
                }
            })

            // Listen Live Disconnect
            this.$socket.on('live-on-disconnect', (message) => {
                this.state.live.connected = false
                this.state.live.loading = false

                // Hide All Dialog
                this.dialog.tts = false
                this.dialog.bot = false

                // Reset Audio
                this.$refs.audio.src = '/public/audio/system/connect.mp3'
                this.clearLoopAudio()

                // Push Noftication
                this.PushNoftication({
                    text: message,
                    color: 'danger',
                    icon: this.icon.disconnect
                })
            })
            
            // Listen Live Noftication
            this.$socket.on('live-on-noftication', (noftication) => {
                if(!!noftication.audio){
                    this.audio.list.push(noftication.audio)
                }

                this.PushNoftication({
                    text: noftication.text,
                    color: 'primary',
                    icon: this.icon[noftication.type]
                })
            })
        },

        // Action Button Connect
        actionButtonConnect () {
            if(!this.state.live.connected){
                this.connect()
            }
            else {
                this.disconnect()
            }
        },

        // Connect LiveStream
        connect (reconnect) {
            // Check User
            if(!this.config.user) {
                this.PushNoftication({
                    text: 'Vui lòng cung cấp User ID',
                    color: 'danger',
                    icon: this.icon.error
                })

                return
            } 

            // Check State Server
            if(!this.state.server.connected) {
                this.PushNoftication({
                    text: 'Server chưa được kết nối vui lòng đợi',
                    color: 'danger',
                    icon: this.icon.error
                })

                return
            }

            // Play Audio Connect
            this.$refs.audio.play()

            // Update State Live Loading
            this.state.live.loading = true

            // Emit Live Connect
            this.$socket.emit('live-emit-connect', this.config)

            // Push Noftication
            this.PushNoftication({
                text: !reconnect ? 'Đang kết nối vào Livestream' : 'Đang kết nối lại vào Livestream',
                color: 'warn',
                icon: this.icon.connecting
            })
        },

        // Disvonnect LiveStream
        disconnect () {
            // Update State Live Loading
            this.state.live.loading = true

            // Reset Noftication
            this.noftications = []
            
            // Emit Live Disconnect
            this.$socket.emit('live-emit-disconnect', true)
        },

        // Update Config
        updateConfig (type, key, value) {
            this.config[type][key] = !!value ? value : !this.config[type][key]
            this.$socket.emit('live-emit-config', this.config)
        },

        // Push Noftication
        PushNoftication ({text, color, icon}) {
            this.noftications.push({
                id: (this.noftications.length + 1),
                text: text,
                color: color,
                icon: icon
            })
        },

        // Create Loop Audio
        createLoopAudio () {
            this.clearLoopAudio()

            this.audio.loop = setInterval(() => {
                if(!!this.audio.running) return
                if(this.audio.list.length < 1) return
                
                const audioControl = this.$refs.audio
                audioControl.src = this.audio.list[0]
                audioControl.onended = () => {
                    this.audio.running = false
                    this.$delete(this.audio.list, 0)
                }

                this.audio.running = true
                audioControl.play()
            }, 500)
        },

        // Clear Loop Audio
        clearLoopAudio () {
            if(!this.audio.loop) return

            clearInterval(this.audio.loop)
            this.audio.loop = null
        }
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
