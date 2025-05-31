import {useRouter} from 'expo-router';
import React, {useState} from 'react';
import {
    ImageBackground,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {resetPasswordAPI} from "@/app/api/auth/auth_api";

export default function ForgotPassword() {

    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!email) {
            Alert.alert('Hata', 'Please enter an email');
            return;
        }
        setLoading(true);
        try {
            await resetPasswordAPI(email);
        } catch (error: any) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/forgot-password.png')}
            style={{flex: 1}}
            resizeMode="cover"
        >
            <View style={{flex: 1, backgroundColor: 'rgba(30, 41, 59, 0.4)'}}>
                <SafeAreaView className="flex-1 justify-center px-8">
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        style={{width: '100%'}}
                    >
                        <View style={{backgroundColor: 'rgba(30, 41, 59, 0.6)'}} className="p-6 rounded-3xl">
                            <Text className="text-white text-4xl font-semibold tracking-wide mb-6 text-center">
                                Reset Password
                            </Text>

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#e5e7eb"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="text-white bg-white/10 px-4 py-4 rounded-2xl mb-6"
                            />

                            <TouchableOpacity
                                onPress={handleSend}
                                disabled={loading}
                                className={`py-4 rounded-2xl mb-3 shadow-lg ${loading ? 'bg-yellow-300' : 'bg-yellow-500'
                                }`}
                            >
                                <View className='flex-row justify-center items-center'>
                                    {loading && (
                                        <ActivityIndicator size="small" color="#fff" style={{marginRight: 10}}/>
                                    )}
                                    <Text className="text-center text-white text-lg font-semibold">
                                        {loading ? 'Sending...' : 'Send'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => router.push('/(auth)')}>
                                <Text className="text-center text-white text-base underline">
                                    Return to login page
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}
