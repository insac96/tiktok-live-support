const { WebcastPushConnection } = require('tiktok-live-connector')

class TiktokLiveWrapper {
    constructor (socket) {
        this.socket = socket
        this.config = null
        this.live = null

        this.init()
    }

    isConnected () {
        if(!this.live) return false
        return this.live.getState().isConnected
    }

    init () {
        this.socket.on('live-emit-connect', (config) => {
            this.connect(config)
        })

        this.socket.on('live-emit-disconnect', () => {
            this.disconnect()
        })

        this.socket.on('live-emit-config', (config) => {
            if(!this.isConnected()) return
            this.config = config
        })

        this.socket.on('disconnect', () => {
            this.disconnect()
        })
    }

    async connect (config) {
        try {
            // Check Connected
            if(!!this.isConnected()){
                this.disconnect()
            }

            // Set Config
            this.config = config

            // Check User
            if(!this.config.user) throw 'Vui lòng nhập User ID' 
            
            // Create Webcast
            this.live = new WebcastPushConnection(this.config.user, {
                processInitialData: false,
                requestPollingIntervalMs: 2000,
            })

            // Send Noftication Loading
            this.sendNoftication({
                type: 'warn',
                color: 'warn',
                text: 'Đang kết nối với Livestream'
            })

            // Connect
            await this.live.connect()

            // Init Socket
            this.listenLiveConnect()
            this.listenLiveAction()

            // End Connect
            this.socket.emit('live-on-connect', true)

            this.sendNoftication({
                type: 'success',
                color: 'success',
                text: 'Đã kết nối với Livestream'
            })
        }
        catch (err) {
            this.socket.emit('live-on-connect', false)

            this.sendNoftication({
                type: 'error',
                color: 'error',
                text: err.toString()
            })
        }
    }

    disconnect () {
        if(!this.isConnected()) return

        this.live.disconnect()
        this.live = null
        this.config  = null
    }
    
    listenLiveConnect () {
        this.live.on('streamEnd', () => {
            this.socket.emit('live-on-disconnect')

            this.sendNoftication({
                type: 'danger',
                color: 'danger',
                text: 'Livestream đã kết thúc'
            })
        })

        this.live.on('disconnected', () => {
            this.socket.emit('live-on-disconnect')

            this.sendNoftication({
                type: 'danger',
                color: 'danger',
                text: 'Đã ngắt kết nối với Livestream'
            })
        })
    }

    listenLiveAction () {
        // Gifts
        this.live.on('gift', (data) => {
            if(data.giftType === 1 && !data.repeatEnd) return
            
            this.sendNoftication({
                type: 'gift',
                text: `Cảm ơn ${data.nickname || data.uniqueId} đã tặng ${data.repeatCount} ${data.giftName}`
            })
        })

        // Envelope
        this.live.on('envelope', (data) => {
            if(!data.nickname || !data.coins) return

            this.sendNoftication({
                type: 'envelope',
                text: `Cảm ơn ${data.nickname || data.uniqueId} đã thả rương ${data.coins} xu`
            })
        })

        // Follow
        this.live.on('follow', (data) => {
            this.sendNoftication({
                type: 'follow',
                text: `Cảm ơn ${data.nickname || data.uniqueId} đã theo dõi`
            })
        })

        //  Share
        this.live.on('share', (data) => {
            this.sendNoftication({
                type: 'share',
                text: `Cảm ơn ${data.nickname || data.uniqueId} đã chia sẻ`
            })
        })

        // Chat
        this.live.on('chat', (data) => {
            this.sendNoftication({
                type: 'chat',
                text: `${data.nickname || data.uniqueId} nói ${data.comment}`
            })
        })
    }

    sendNoftication ({type, color, text}, action) {
        if(!!action && !this.config.noftication[type]) return

        this.socket.emit('live-on-noftication', {
            id: `${type}-${Date.now()}`,
            type: type,
            color: color || 'primary',
            text: text
        })
    }
}

module.exports = TiktokLiveWrapper