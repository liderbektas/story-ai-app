import { useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./store/hooks";

export default function Index() {


    useEffect(() => {
        const checkUser = async () => {
            const userDataRaw = await AsyncStorage.getItem('user');
            const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
            if (!userData) {
                router.replace('/onboard');
            } else {
                router.replace('/(tabs)');
            }
        };
        checkUser();
    }, []);

    return null;
}
