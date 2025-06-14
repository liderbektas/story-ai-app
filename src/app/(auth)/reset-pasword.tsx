import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ImageBackground} from 'react-native';
import {resetPasswordConfirmAPI} from "@/src/api/auth/auth_api";

export default function ResetPassword() {
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async () => {
        if (!code || !password || !confirmPassword) {
            Alert.alert('Hata', 'Tüm alanları doldurun');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Hata', 'Şifreler eşleşmiyor');
            return;
        }
        setLoading(true);
        try {
            await resetPasswordConfirmAPI(code, password);
        } catch (error) {
            Alert.alert('Error', 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('@/src/assets/images/forgot-password.png')}
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
                                placeholder="Code"
                                placeholderTextColor="#e5e7eb"
                                value={code}
                                onChangeText={setCode}
                                keyboardType="number-pad"
                                className="text-white bg-white/10 px-4 py-4 rounded-2xl mb-4"
                            />

                            <TextInput
                                placeholder="New Password"
                                placeholderTextColor="#e5e7eb"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                className="text-white bg-white/10 px-4 py-4 rounded-2xl mb-4"
                            />

                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor="#e5e7eb"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                                className="text-white bg-white/10 px-4 py-4 rounded-2xl mb-6"
                            />

                            <TouchableOpacity
                                onPress={handleReset}
                                disabled={loading}
                                className={`py-4 rounded-2xl mb-3 shadow-lg ${loading ? 'bg-yellow-300' : 'bg-yellow-500'}`}
                            >
                                <View className='flex-row justify-center items-center'>
                                    {loading &&
                                        <ActivityIndicator size="small" color="#fff" style={{marginRight: 10}}/>}
                                    <Text className="text-center text-white text-lg font-semibold">
                                        {loading ? 'Updating...' : 'Update Password'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}
