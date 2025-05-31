import { ImageBackground, ScrollView, Text, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useStoryDetails from "@/hooks/story-details";

export default function StoryDetails() {

    const { id } = useGlobalSearchParams();
    const { data } = useStoryDetails({id})

    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <ImageBackground
                source={require("../../assets/images/story-detail.png")}
                resizeMode="cover"
                className="flex-1"
            >
                <SafeAreaView
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        backgroundColor: "rgba(0,0,0,0.5)",
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "rgba(255, 255, 255, 0.15)",
                            borderRadius: 25,
                            padding: 25,
                            maxWidth: 350,
                            maxHeight: "70%",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 6 },
                            shadowOpacity: 0.4,
                            shadowRadius: 10,
                            elevation: 10,
                        }}
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text
                                style={{
                                    color: "white",
                                    fontSize: 20,
                                    lineHeight: 30,
                                    fontFamily: "serif",
                                    textAlign: "center",
                                }}
                            >
                                {data || "Masal içeriği bulunamadı."}
                            </Text>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </>
    );
}
