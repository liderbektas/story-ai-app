import React from 'react';
import {
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    Text,
    View,
    TouchableOpacity,
    RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Feather} from '@expo/vector-icons';
import {useRouter} from "expo-router";
import useMyStories from "@/src/hooks/use-my-stories";


export default function MyStory() {

    const {data, isLoading, refetch, isFetching} = useMyStories()
    const router = useRouter();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-slate-900">
                <ActivityIndicator size="large" color="#facc15" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('@/src/assets/images/logo-1.png')}
            resizeMode="cover"
            style={{flex: 1}}
        >
            <SafeAreaView className="flex-1 bg-slate-900/60">
                <ScrollView
                    contentContainerStyle={{padding: 20, paddingBottom: 100}}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isFetching}
                            onRefresh={() => refetch()}
                            tintColor="#facc15"
                        />
                    }
                >
                    <Text className="text-slate-100 text-3xl font-bold text-center mt-4 mb-6 tracking-wider">
                        My Stories
                    </Text>

                    {data?.length === 0 ? (
                        <View className="mt-10 items-center">
                            <Feather name="clock" size={14} color="#94a3b8" />
                            <Text className="text-slate-400 text-base mt-2">
                                You have no stories yet.
                            </Text>
                        </View>
                    ) : (
                        data?.map((story: any, index: number) => (
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: `/story/${story.story_id}`,
                                        params: { index: index.toString() },
                                    })
                                }
                                key={index}
                                activeOpacity={0.85}
                            >
                                <View className="bg-white/10 p-5 rounded-2xl mb-4 shadow shadow-black">
                                    <Text className="text-yellow-400 text-lg font-semibold mb-1">
                                        {story.title || `Story ${index + 1}`}
                                    </Text>
                                    {story.description && (
                                        <Text className="text-slate-200 text-sm mb-2">
                                            {story.description}
                                        </Text>
                                    )}
                                    <View className="h-[1px] bg-white/20 my-2" />
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="clock" size={14} color="#94a3b8" />
                                        <Text className="text-slate-400 text-xs">
                                            {new Date(story.created_at).toLocaleString()}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}
