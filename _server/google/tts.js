require('dotenv').config()
const fs = require('fs')
const util = require('util')
const path = require('path')
const textToSpeech = require('@google-cloud/text-to-speech')

module.exports = async ({name, pitch, speed}, { id, text }) => {
    try {
        const dir = '../public/audio/tts'
        const clientTTS = new textToSpeech.TextToSpeechClient()

        const [response] = await clientTTS.synthesizeSpeech({
            input: {
                text: text
            },
            voice: {
                languageCode: 'vi-VN', 
                name: `vi-VN-Wavenet-${name}`
            },
            audioConfig: {
                audioEncoding: 'MP3',
                pitch: pitch,
                speakingRate: speed
            }
        })
        
        const writeFile = util.promisify(fs.writeFile)
        await writeFile(path.join(__dirname, `${dir}/${id}.mp3`), response.audioContent, 'binary')

        return `${dir}/${id}.mp3`
    }
    catch (err) {
        console.error('TTS:', err.toString())
        
        return null
    }
}