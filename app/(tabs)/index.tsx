import {View, Text, Button, ImageBackground} from 'react-native'
import React, {useEffect} from 'react'
import {logoutAPI} from '@/app/api/auth/auth_api'
import {useAuth} from '../store/hooks'
import {useRouter} from 'expo-router'

export default function HomePage() {

    return (

        <ImageBackground
            source={require('../../assets/images/logo-1.png')}
            resizeMode="cover"
            className="flex-1"
        >
            <View className='flex-1 items-center justify-center h-screen w-screen'>
                <Button title="Logout" onPress={logoutAPI}/>
            </View>
        </ImageBackground>
    )
}