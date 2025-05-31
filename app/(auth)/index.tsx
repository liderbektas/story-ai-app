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
    StatusBar
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {loginAPI} from "@/app/api/auth/auth_api";

type UserState = {
    username: string;
    password: string;
};

export default function Index() {

    const router = useRouter();
    const [userState, setUserState] = useState<UserState>({
        username: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof UserState, value: string) => {
        setUserState(prev => ({...prev, [field]: value}));
    };

    const handleLogin = async () => {
        const {username, password} = userState;
        if (!username || !password) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            await loginAPI(userState);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/logo-1.png')}
            style={{flex: 1}}
            resizeMode="cover"
        >
            <StatusBar barStyle='light-content' backgroundColor='transparent' translucent/>
            <View style={{flex: 1, backgroundColor: 'rgba(30, 41, 59, 0.4)'}}>
                <SafeAreaView className="flex-1 justify-between">
                    <View className="mt-28 items-center">
                        <Text className="text-white text-6xl font-extrabold tracking-widest">AI</Text>
                        <Text className="text-white text-4xl font-semibold tracking-wide mt-2">FAIRYTALES</Text>
                        <Text className="text-white text-base opacity-70 mt-2">Welcome back. Let’s sign you in!</Text>
                    </View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        className="px-8 pb-10"
                    >
                        <View style={{backgroundColor: 'rgba(30, 41, 59, 0.6)'}} className="p-6 rounded-3xl">

                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#e5e7eb"
                                value={userState.username}
                                onChangeText={text => handleChange('username', text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
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
                                onPress={handleLogin}
                                disabled={loading}
                                className={`py-4 rounded-2xl mb-3 shadow-lg ${loading ? 'bg-yellow-300' : 'bg-yellow-500'}`}
                            >
                                <View className="flex-row justify-center items-center">
                                    {loading && (
                                        <ActivityIndicator
                                            size="small"
                                            color="#fff"
                                            style={{marginRight: 10}}
                                        />
                                    )}
                                    <Text className="text-white text-lg font-semibold">
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')} className="mb-4">
                                <Text className="text-center text-white text-base underline">
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => router.push('/(auth)/register-step1')}>
                                <Text className="text-center text-white text-base">
                                    Don't have an account?{' '}
                                    <Text className="underline text-base">Sign up</Text>
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}
