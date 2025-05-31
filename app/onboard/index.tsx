import { View, Text, StatusBar, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function OnboardIndex() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../../assets/images/auth.jpeg')}
      style={{ flex: 1, width: '100%', height: '100%' }}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <SafeAreaView className="flex-1 justify-between px-6">
          <View className="items-center mt-28">
            <Text className="text-white text-7xl font-extrabold tracking-widest">Ai-Tale</Text>
            <Text className="text-white text-lg mt-4 opacity-80 text-center">
              Discover AI-generated stories{'\n'}crafted just for you.
            </Text>
          </View>

          <View className="items-center mb-16 space-y-5 gap-y-4">
            <TouchableOpacity
              className="bg-white/10  w-64 py-4 rounded-full border border-white/30"
              onPress={() => router.push('/(auth)')}
            >
              <Text className="text-center text-white font-semibold text-xl">Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="bg-[#3b82f6] w-64 py-4 rounded-full shadow-lg"
              onPress={() => router.push('/(auth)/register-step1')}
            >
              <Text className="text-center text-white font-semibold text-xl">Register</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
