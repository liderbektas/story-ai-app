import {ScrollView, Text, View, TouchableOpacity, Image} from "react-native";
import {Stack, useGlobalSearchParams, useRouter} from "expo-router";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import useStoryDetails from "@/hooks/story-details";
import {Ionicons} from '@expo/vector-icons';
import {BlurView} from "expo-blur";
import {speakText, stopSpeak} from "@/app/lib/speech";

export default function StoryDetails() {
    const {id} = useGlobalSearchParams();
    const router = useRouter();
    const {data} = useStoryDetails({id});

    const [bookmarked, setBookmarked] = useState(false);
    const [open, setOpen] = useState(false);
    const [rate, setRate] = useState(1.0);

    const handlePlay = () => {
        if (!open) {
            setOpen(true);
            speakText(data, rate);
        } else {
            setOpen(false);
            stopSpeak();
        }
    };

    const handleRateChange = () => {
        const newRate = rate === 1.0 ? 1.2 : rate === 1.2 ? 0.8 : 1.0;
        setRate(newRate);
        if (open) {
            stopSpeak();
            speakText(data, newRate);
        }
    };

    return (
        <>
            <Stack.Screen options={{headerShown: false}}/>

            <Image
                source={require("../../assets/images/story-d1.png")}
                resizeMode="cover"
                className="absolute w-screen h-screen z-0"
                blurRadius={1}
            />

            <View className='absolute w-full h-full bg-[rgba(30,41,59,0.6)] z-0'/>

            <View className='flex-1 z-10'>
                <SafeAreaView className='p-6 flex-1'>
                    <View className='flex-row items-center justify-between mb-8'>
                        <TouchableOpacity
                            onPress={() => router.back()}
                            className='h-12 w-12 rounded-full flex items-center justify-center shadow-lg bg-white/10 border border-white/30'>
                            <Ionicons name='chevron-back-outline' size={20} color='white'/>
                        </TouchableOpacity>

                        <Text className='text-2xl text-white font-bold'>Chapter</Text>

                        <TouchableOpacity
                            onPress={() => setBookmarked(!bookmarked)}
                            className='h-12 w-12 rounded-full flex items-center justify-center shadow-lg bg-white/10 border border-white/30'>
                            <Ionicons
                                name={bookmarked ? 'bookmark' : 'bookmark-outline'}
                                size={20}
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                <BlurView
                    intensity={60}
                    tint="light"
                    className="relative top-0 left-0 h-[520px] rounded-t-[60px] z-10 border border-white/20 overflow-hidden p-4"
                >
                    <ScrollView
                    >
                        <Text className="text-center text-base text-slate-800 leading-7 font-medium">
                            {data}
                        </Text>
                    </ScrollView>

                    <View
                        className="absolute bottom-6 left-6 right-6 z-20 bg-white/20 border border-white/30 rounded-full h-20 flex-row items-center justify-between px-6 shadow-xl backdrop-blur-md">
                        <TouchableOpacity className="p-3">
                            <Ionicons name="library-outline" size={26} color="white"/>
                        </TouchableOpacity>

                        <TouchableOpacity className="p-3">
                            <Ionicons name="play-skip-back-circle-outline" size={32} color="white"/>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={handlePlay}
                            className="bg-white/30 p-4 rounded-full border border-white/40 shadow-md"
                        >
                            <Ionicons
                                name={open ? "pause-outline" : "play-outline"}
                                size={32}
                                color="white"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity className="p-3">
                            <Ionicons name="play-skip-forward-circle-outline" size={32} color="white"/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleRateChange} className="p-3 items-center">
                            <Ionicons name="speedometer-outline" size={24} color="white"/>
                            <Text className="text-[10px] text-white text-center">{rate}x</Text>
                        </TouchableOpacity>
                    </View>
                </BlurView>
            </View>
        </>
    );
}
