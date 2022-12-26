const { WebcastPushConnection } = require('tiktok-live-connector')
const GoogleTTS = require('../google/tts')

class TiktokLiveWrapper {
    constructor (socket) {
        this.socket = socket
        this.config = null
        this.live = null

        this.init()
    }

    isConnected () {
        if(!this.live) return false
        if(!this.live.getState().isConnected) return false

        return true
    } 

    setConfig (config){
        this.config = config
    }

    init () {
        this.socket.on('live-emit-connect', async (config) => {
            this.setConfig(config)
            await this.connect()
        })

        this.socket.on('live-emit-disconnect', () => {
            this.disconnect()
        })

        this.socket.on('live-emit-config', (config) => {
            if(!this.isConnected()) return

            this.setConfig(config)
        })

        this.socket.on('disconnect', () => {
            this.disconnect()
        })
    }

    async connect () {
        try {
            if(!!this.isConnected()) {
                this.disconnect()
            }

            this.live = new WebcastPushConnection(this.config.user, {
                processInitialData: false,
                requestPollingIntervalMs: 2000,
                sessionId: this.config.bot.session
            })

            await this.live.connect()

            this.listenLiveConnect()
            this.listenLiveAction()

            this.socket.emit('live-on-connect', {
                err: false,
                mesage: 'Đã kết nối với Livestream'
            })
        }
        catch (err) {
            this.socket.emit('live-on-connect', {
                err: true,
                mesage: err.toString()
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
            this.socket.emit('live-on-disconnect', 'Livestream đã kết thúc')
        })

        this.live.on('disconnected', () => {
            this.socket.emit('live-on-disconnect', 'Đã ngắt kết nối với Livestream')
        })
    }

    listenLiveAction () {
        // Gifts
        this.live.on('gift', (data) => {
            if(data.giftType === 1 && !data.repeatEnd) return
            this.createNoftication('gift', data)
        })

        // Envelope
        this.live.on('envelope', (data) => {
            if(!data.nickname || !data.coins) return
            this.createNoftication('envelope', data)
        })

        // Follow
        this.live.on('follow', (data) => {
            this.createNoftication('follow', data)
        })

        //  Share
        this.live.on('share', (data) => {
            this.createNoftication('share', data)
        })

        // Chat
        this.live.on('chat', (data) => {
            this.createNoftication('chat', data)
        })
    }

    async createNoftication (type, data) {
        const noftication = {
            id: `${type}-${data.msgId || Date.now()}`,
            type: type,
        }

        // Create Text
        if(type === 'gift'){
            noftication.text = `Cảm ơn ${data.nickname} đã tặng ${data.repeatCount} ${data.giftName}`
            this.botChat(noftication.text)
        }
        if(type === 'envelope'){
            noftication.text = `Cảm ơn ${data.nickname} đã thả rương ${data.coins} xu`
            this.botChat(noftication.text)
        }
        if(type === 'follow'){
            noftication.text = `Cảm ơn ${data.nickname} đã theo dõi`
        }
        if(type === 'share'){
            noftication.text = `Cảm ơn ${data.nickname} đã chia sẻ`
        }
        if(type === 'chat'){
            noftication.text = `${data.nickname} nói ${data.comment}`
            this.botChat(noftication.text)
        }

        // Create Audio
        if(!!this.config.tts.active && !!this.config.noftication[type]){
            noftication.audio = await GoogleTTS(this.config.tts, {
                id: noftication.id,
                text: noftication.text
            })
        }
        
        // Emit Noftication
        if(!!this.config.noftication[type]){
            this.socket.emit('live-on-noftication', noftication)
        }
    }

    async botChat (mesage) { 
        if(!this.isConnected()) return
        if(!this.config.bot.active) return

        try {
            await this.live.sendMessage(mesage)
        }
        catch(err){
            console.log('BotChat:', err.toString())
        }
    }
}

module.exports = TiktokLiveWrapper