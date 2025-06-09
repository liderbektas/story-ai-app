import React, {useState} from 'react';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {Dropdown} from 'react-native-element-dropdown';
import {registerStep2API} from "@/app/api/auth/auth_api";
import {SEX_ENUM, SEX_OPTIONS} from "@/enum/sex";
import {AGE_RANGES, LANGUAGES} from "@/app/utils/utils";

type UserStep2State = {
    name: string;
    ageRange: string;
    language: string;
    sex: SEX_ENUM
};

export default function RegisterStep2() {
    const router = useRouter();
    const [userStep2State, setUserStep2State] = useState<UserStep2State>({
        name: '',
        ageRange: '',
        language: '',
        sex: '' as SEX_ENUM
    });
    const [loading, setLoading] = useState(false);
    const {email} = useLocalSearchParams<{ email?: string }>();

    const handleChange = (field: keyof UserStep2State, value: string) => {
        setUserStep2State(prev => ({...prev, [field]: value}));
    };

    const handleRegisterStep2 = async () => {
        const {name, ageRange, language, sex} = userStep2State;

        if (!name || !ageRange || !language) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        setLoading(true);
        try {
            await registerStep2API({
                full_name: name,
                email,
                age_group: ageRange,
                language,
                sex
            });
        } catch (error: any) {
            Alert.alert('Register error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/login.jpeg')}
            style={{flex: 1}}
            resizeMode="cover"
        >
            <View style={{flex: 1, backgroundColor: 'rgba(30, 41, 59, 0.4)'}}>
                <SafeAreaView className="flex-1 justify-between">
                    <View className="mt-28 items-center">
                        <Text className="text-white text-6xl font-extrabold tracking-widest">AI</Text>
                        <Text className="text-white text-4xl font-semibold tracking-wide mt-2">FAIRYTALES</Text>
                        <Text className="text-white text-base opacity-70 mt-2">Tell us more about yourself</Text>
                    </View>

                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                        className="px-8 pb-10"
                    >
                        <View className="bg-blue-950/60 p-6 rounded-3xl">
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor="#e5e7eb"
                                value={userStep2State.name}
                                onChangeText={text => handleChange('name', text)}
                                className="text-white bg-white/10 px-4 py-4 rounded-2xl mb-4"
                            />

                            <Dropdown
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: 20,
                                    paddingHorizontal: 16,
                                    height: 48,
                                    marginBottom: 16,
                                }}
                                placeholderStyle={{color: '#e5e7eb'}}
                                selectedTextStyle={{color: 'white'}}
                                data={AGE_RANGES.map(item => ({label: item, value: item}))}
                                labelField="label"
                                valueField="value"
                                placeholder="Select your age range"
                                value={userStep2State.ageRange}
                                onChange={item => handleChange('ageRange', item.value)}
                                dropdownPosition="bottom"
                                maxHeight={150}
                                showsVerticalScrollIndicator={false}
                            />

                            <Dropdown
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: 20,
                                    paddingHorizontal: 16,
                                    height: 48,
                                    marginBottom: 24,
                                }}
                                placeholderStyle={{color: '#e5e7eb'}}
                                selectedTextStyle={{color: 'white'}}
                                data={LANGUAGES}
                                labelField="label"
                                valueField="value"
                                placeholder="Select language"
                                value={userStep2State.language}
                                onChange={item => handleChange('language', item.value)}
                                dropdownPosition="bottom"
                                maxHeight={150}
                                showsVerticalScrollIndicator={false}
                            />

                            <View className="mb-6 px-4">
                                <View className="flex-row justify-between">
                                    {SEX_OPTIONS.map(option => (
                                        <TouchableOpacity
                                            key={option.value}
                                            className="flex-row items-center"
                                            onPress={() => handleChange('sex', option.value)}
                                        >
                                            <View
                                                className={`w-5 h-5 rounded-full border-2 ${
                                                    userStep2State.sex === option.value ? 'border-yellow-400 bg-yellow-400' : 'border-white'
                                                } mr-2`}
                                            />
                                            <Text className="text-white">{option.label}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>


                            <TouchableOpacity
                                onPress={handleRegisterStep2}
                                className="bg-yellow-500 py-4 rounded-2xl mb-3 shadow-lg flex-row justify-center items-center"
                                disabled={loading}
                            >
                                {loading && <ActivityIndicator size="small" color="#fff" style={{marginRight: 10}}/>}
                                <Text className="text-center text-white text-lg font-semibold">
                                    {loading ? 'Loading...' : 'Complete Registration'}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => router.push('/(auth)')}>
                                <Text className="text-center text-white text-base">
                                    Already have an account? <Text className="underline">Login</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </ImageBackground>
    );
}
