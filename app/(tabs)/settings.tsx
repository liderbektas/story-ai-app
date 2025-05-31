import {View, Text, ImageBackground} from 'react-native'
import React from 'react'

export default function Settings() {
    return (
        <ImageBackground
            source={require('../../assets/images/register.png')}
            resizeMode="cover"
            className="flex-1"
        >
            <View className='flex-1 items-center justify-center h-screen w-screen'>
                <Text className='text-white'>Settings</Text>
            </View>
        </ImageBackground>

    )
}