import * as Speech from "expo-speech"

export const speakText = (text: string, rate: number = 1.0) => {
    Speech.speak(text, {
        language: 'tr-TR',
        pitch: 1.0,
        rate: rate,
    })
}

export const stopSpeak = () => {
    Speech.stop()
}
