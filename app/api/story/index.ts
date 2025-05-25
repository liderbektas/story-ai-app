import axios, { AxiosError } from "axios";
import { Alert } from "react-native";

type storyType = {
    language: string,
    topic: string,
    character: string
}

type tokenType = {
    token: string
}

export const createStoryAPI = async (storeData: storyType, token: tokenType) => {
    console.log(token);
    
    try {
        const { data } = await axios.post('http://127.0.0.1:8000/story/generate',
            {
                topic: storeData.topic,
                language: storeData.language,
                character: storeData.character,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        console.log(data);
        Alert.alert('Success', 'Story created!')
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message);
        }
        throw new Error('Unexpected Create-Story Error');
    }
}