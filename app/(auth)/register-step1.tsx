import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { registerStep1API } from '../api/auth/auth_api';

type UserState = {
  email: string;
  password: string;
};

export default function RegisterStep1() {

  const router = useRouter();
  const [userState, setUserState] = useState<UserState>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof typeof userState, value: string) => {
    setUserState(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    const { email, password } = userState;
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    setLoading(true);
    try {
      await registerStep1API(userState);
    } catch (error: any) {
      Alert.alert('Register error', error.message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/new-register.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(30, 41, 59, 0.4)' }}>
        <SafeAreaView className="flex-1 justify-between">
          <View className="mt-28 items-center">
            <Text className="text-white text-6xl font-extrabold tracking-widest">AI</Text>
            <Text className="text-white text-4xl font-semibold tracking-wide mt-2">FAIRYTALES</Text>
            <Text className="text-white text-base opacity-70 mt-2">Create your magical account</Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="px-8 pb-10"
          >
            <View style={{ backgroundColor: 'rgba(30, 41, 59, 0.6)' }} className="p-6 rounded-3xl">
              <TextInput
                placeholder="Email"
                placeholderTextColor="#e5e7eb"
                value={userState.email}
                onChangeText={text => handleChange('email', text)}
                keyboardType="email-address"
                autoCapitalize="none"      
                autoCorrect={false}       
                className="text-white bg-white/10 px-4 py-4 rounded-2xl mb-4"
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#e5e7eb"
                secureTextEntry
                value={userState.password}
                onChangeText={text => handleChange('password', text)}
                className="text-white bg-white/10 px-4 py-4 rounded-2xl mb-6"
              />

              <TouchableOpacity
                onPress={handleRegister}
                className="bg-yellow-500 py-4 rounded-2xl mb-3 shadow-lg flex-row justify-center items-center"
                disabled={loading}
              >
                {loading && (
                  <ActivityIndicator
                    size="small"
                    color="#fff"
                    style={{ marginRight: 10 }}
                  />
                )}
                <Text className="text-center text-white text-lg font-semibold">
                  {loading ? 'Loading...' : 'Continou with step-2'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/(auth)')}>
                <Text className="text-center text-white text-base">
                  Already have an account? <Text className="underline text-base">Login</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}
