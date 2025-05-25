import { View, Text, ImageBackground } from 'react-native'
import React from 'react'

export default function MyStory() {
    return (

        <ImageBackground
            source={require('../../assets/images/logo-1.png')}
            resizeMode="cover"
            className="flex-1"
        >
            <View className='flex-1 items-center justify-center h-screen w-screen'>
                <Text className='text-white'>MyStory</Text>
            </View>
        </ImageBackground>
    )
}