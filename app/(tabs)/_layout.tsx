import {Tabs} from 'expo-router'
import React from 'react'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons';

export default function TabsLayout() {

    const insets = useSafeAreaInsets()

    return <Tabs
        screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FACC14',
            tabBarInactiveTintColor: '#fff',
            tabBarStyle: {
                height: 25 + insets.bottom,
                position: 'absolute',
                bottom: 40,
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 34,
                shadowOffset: {width: 0, height: 10},
                shadowRadius: 10,
                shadowOpacity: 0.1,
                borderRadius: 20,
                borderTopWidth: 0,
                backgroundColor: '',
            }
        }}
    >
        <Tabs.Screen
            name='index'
            options={{
                title: 'Home',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='home' size={size} color={color}/>
                )
            }}
        />
        <Tabs.Screen
            name='create'
            options={{
                title: 'Create',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='add-outline' size={size} color={color}/>
                )
            }}
        />
        <Tabs.Screen
            name='story'
            options={{
                title: 'Story',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='albums-outline' size={size} color={color}/>
                )
            }}
        />
        <Tabs.Screen
            name='settings'
            options={{
                title: 'Settings',
                tabBarIcon: ({color, size}) => (
                    <Ionicons name='cog-outline' size={size} color={color}/>
                )
            }}
        />
    </Tabs>

}