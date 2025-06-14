import React, {useCallback, useRef, useMemo, useState} from 'react'
import {
    View,
    Text,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    ImageBackground,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Ionicons} from '@expo/vector-icons'
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet'
import {useAuth} from '@/src/store/hooks'
import {createStoryAPI} from "@/src/api/story/story_api";

export default function CreateStory() {

    const {token} = useAuth()
    const bottomSheetModalRef = useRef<BottomSheetModal>(null)
    const snapPoints = ['60%']

    const [storyState, setStoryState] = useState({
        topic: '',
        character: ''
    })
    const [loading, setLoading] = useState(false)

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present()
    }, []);

    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            pressBehavior="close"
            appearsOnIndex={0}
            disappearsOnIndex={-1}
        />
    )

    const handleSubmit = async () => {
        setLoading(true)
        if (!storyState.topic || !storyState.character) {
            Alert.alert('Error', 'Please fill all field')
        }
        try {
            await createStoryAPI(storyState, token)
            setStoryState({
                topic: "",
                character: "",
            })
        } catch (error: any) {
            Alert.alert('Error', 'Something went wrong. Please try again.', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <BottomSheetModalProvider>
            <ImageBackground
                source={require('@/src/assets/images/create-story.png')}
                resizeMode="cover"
                className="flex-1"
            >
                <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>
                <View className="flex-1 bg-[rgba(30,41,59,0.6)] px-8 py-10 justify-between pt-16">
                    <SafeAreaView className="flex-1">
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <View className="mb-10 items-center">
                                <Text className="text-white text-[48px] font-extrabold tracking-widest">
                                    ✨
                                </Text>
                                <Text className="text-white text-4xl font-extrabold mt-2 tracking-wide">
                                    Create Story
                                </Text>
                            </View>

                            <View className="bg-[rgba(70,80,90,0.3)] rounded-3xl p-5">
                                <Text className="text-white text-xl font-bold mb-3">
                                    ✍️ Prompt
                                </Text>

                                <TextInput
                                    placeholder="Enter character name"
                                    placeholderTextColor="#e5e7eb"
                                    value={storyState.character}
                                    onChangeText={(text) => setStoryState(prev => ({...prev, character: text}))}
                                    style={{
                                        height: 48,
                                        color: 'white',
                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                        borderRadius: 16,
                                        paddingHorizontal: 16,
                                        paddingVertical: 12,
                                        fontSize: 16,
                                        marginBottom: 20,
                                    }}
                                />

                                <TouchableOpacity
                                    onPress={handlePresentModalPress}
                                    activeOpacity={0.8}
                                    className="bg-[rgba(255,255,255,0.15)] py-4 rounded-xl flex-row items-center justify-between px-5 mb-6"
                                >
                                    <View className="flex-row items-center gap-x-2">
                                        <Ionicons name="leaf-outline" size={22} color="white"/>
                                        <Text className="text-white text-base">
                                            {storyState.topic || 'Select Story Style'}
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward-outline" size={20} color="#ccc"/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                    disabled={loading}
                                    className={`${loading ? 'bg-[#d4af37]' : 'bg-yellow-400'} py-4 rounded-xl items-center shadow-lg shadow-yellow-900`}
                                >
                                    {loading ? (
                                        <View className='flex-row items-center gap-x-4'>
                                            <ActivityIndicator size="small" color="white"/>
                                            <Text className='text-white'>Story is being created...</Text>
                                        </View>
                                    ) : (
                                        <Text className="text-white font-bold text-lg">
                                            Create Story
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </SafeAreaView>
                </View>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{backgroundColor: '#1a1a1a'}}
                    handleIndicatorStyle={{backgroundColor: '#666'}}
                    backdropComponent={renderBackdrop}
                >
                    <BottomSheetView className="px-5 pt-2 pb-32">
                        <Text className="text-white text-xl font-bold mb-4">
                            🎨 Choose a Story Style
                        </Text>
                        {['Fantasy', 'Sci-Fi', 'Romance', 'Horror', 'Adventure'].map((style, index) => {
                            const isSelected = storyState.topic === style
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setStoryState(prev => ({...prev, topic: style}))
                                        bottomSheetModalRef.current?.dismiss()
                                    }}
                                    className={`py-3 px-3 rounded-xl mb-3 flex-row justify-between items-center ${isSelected ? 'bg-gray-800' : 'bg-transparent'}`}
                                >
                                    <Text className="text-white text-base">{style}</Text>
                                    {isSelected &&
                                        <Ionicons name="checkmark-circle-outline" size={20} color="#84e3f4"/>}
                                </TouchableOpacity>
                            )
                        })}
                    </BottomSheetView>
                </BottomSheetModal>
            </ImageBackground>
        </BottomSheetModalProvider>
    )
}
