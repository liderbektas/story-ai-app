import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    TextInput
} from 'react-native';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { useAuth } from "@/src/store/hooks";

export default function Settings() {

    const { user } = useAuth();
    const insets = useSafeAreaInsets();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['75%'], []);

    const [userState, setUserState] = useState({
        name: user?.full_name || '',
        email: user?.email || '',
        password: '',
        language: user?.language || '',
        age_group: user?.age_group || ''
    });

    const { name, email, password, language, age_group } = userState;

    const changeHandler = (field: keyof typeof userState, value: string) => {
        setUserState(prev => ({ ...prev, [field]: value }));
    };

    const handlePresentModal = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleSaveProfile = () => {
        console.log('Profile updated:', userState);
        bottomSheetModalRef.current?.dismiss();
    };

    return (
        <BottomSheetModalProvider>
            <ImageBackground
                source={require('@/src/assets/images/register.png')}
                resizeMode="cover"
                className="flex-1"
            >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <View style={{ flex: 1, backgroundColor: 'rgba(30, 41, 59, 0.4)' }}>
                    <SafeAreaView className="flex-1">
                        <ScrollView
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: insets.bottom + 30,
                            }}
                        >
                            <View className="mx-6 mt-14 bg-white/10 rounded-3xl p-6 border border-white/10 shadow-xl relative items-center">
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -50,
                                        backgroundColor: '#1f2937',
                                        borderRadius: 9999,
                                        padding: 4,
                                        borderWidth: 3,
                                        borderColor: '#facc15',
                                    }}
                                >
                                    <Image
                                        source={{
                                            uri: `https://api.dicebear.com/7.x/adventurer/png?seed=${encodeURIComponent(name)}`,
                                        }}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                        }}
                                    />
                                </View>

                                <View style={{ marginTop: 60 }}>
                                    <Text className="text-white text-xl font-bold text-center">{user?.full_name}</Text>
                                    <Text className="text-white/70 text-sm text-center mt-2">Adventurer Profile</Text>
                                </View>
                            </View>


                            <View
                                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                                className="mx-6 mt-10 p-6 rounded-3xl border border-white/10 shadow-xl"
                            >
                                <Text className="text-white text-lg font-semibold mb-6">👤 Profile Summary</Text>

                                <View className="gap-y-4">
                                    {[
                                        { label: 'Name', value: user?.full_name },
                                        { label: 'Age', value: user?.age_group },
                                        { label: 'Language', value: user?.language },
                                        { label: 'Email', value: user?.email },
                                        { label: 'Sex', value: user?.sex },
                                    ].map((item, index) => (
                                        <View
                                            key={index}
                                            className="bg-white/10 px-4 py-4 rounded-xl flex-row justify-between items-center border border-white/5"
                                        >
                                            <Text className="text-white opacity-70">{item.label}</Text>
                                            <Text className="text-white font-semibold">{item.value}</Text>
                                        </View>
                                    ))}
                                </View>

                                <TouchableOpacity
                                    className="bg-yellow-400 py-4 rounded-2xl mt-8 shadow-lg active:opacity-80"
                                    onPress={handlePresentModal}
                                >
                                    <Text className="text-center text-white text-lg font-bold tracking-wide">Edit Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>

                        <BottomSheetModal
                            ref={bottomSheetModalRef}
                            index={0}
                            snapPoints={snapPoints}
                            backgroundStyle={{ backgroundColor: '#1f2937' }}
                            handleIndicatorStyle={{ backgroundColor: '#9ca3af' }}
                            backdropComponent={props => (
                                <BottomSheetBackdrop
                                    {...props}
                                    appearsOnIndex={0}
                                    disappearsOnIndex={-1}
                                    opacity={0.5}
                                />
                            )}
                        >
                            <BottomSheetView className="flex-1 p-6">
                                <View className="flex-row justify-between items-center mb-6">
                                    <Text className="text-white text-xl font-bold">Edit Profile</Text>
                                </View>

                                <View className="gap-y-4">
                                    <View>
                                        <Text className="text-white text-xs uppercase opacity-70 mb-1">Name</Text>
                                        <TextInput
                                            value={name}
                                            onChangeText={value => changeHandler('name', value)}
                                            className="text-white bg-white/10 px-4 py-3 rounded-xl"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>

                                    <View>
                                        <Text className="text-white text-xs uppercase opacity-70 mb-1">Age</Text>
                                        <TextInput
                                            value={age_group}
                                            onChangeText={value => changeHandler('age_group', value)}
                                            keyboardType="numeric"
                                            className="text-white bg-white/10 px-4 py-3 rounded-xl"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>

                                    <View>
                                        <Text className="text-white text-xs uppercase opacity-70 mb-1">Language</Text>
                                        <TextInput
                                            value={language}
                                            onChangeText={value => changeHandler('language', value)}
                                            className="text-white bg-white/10 px-4 py-3 rounded-xl"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>

                                    <View>
                                        <Text className="text-white text-xs uppercase opacity-70 mb-1">Email</Text>
                                        <TextInput
                                            value={email}
                                            onChangeText={value => changeHandler('email', value)}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            className="text-white bg-white/10 px-4 py-3 rounded-xl"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>

                                    <View>
                                        <Text className="text-white text-xs uppercase opacity-70 mb-1">Password</Text>
                                        <TextInput
                                            value={password}
                                            onChangeText={value => changeHandler('password', value)}
                                            secureTextEntry
                                            className="text-white bg-white/10 px-4 py-3 rounded-xl"
                                            placeholderTextColor="#9ca3af"
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity
                                    className="bg-yellow-400 py-4 rounded-2xl mt-8 shadow-lg active:opacity-80"
                                    onPress={handleSaveProfile}
                                >
                                    <Text className="text-center text-white text-lg font-bold tracking-wide">Save Changes</Text>
                                </TouchableOpacity>
                            </BottomSheetView>
                        </BottomSheetModal>
                    </SafeAreaView>
                </View>
            </ImageBackground>
        </BottomSheetModalProvider>
    );
}
