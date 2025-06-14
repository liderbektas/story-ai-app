import axios, {AxiosError} from "axios";
import {Alert} from "react-native";

type storyType = {
    topic: string,
    character: string
}

type tokenType = string | null;

export const createStoryAPI = async (storeData: storyType, token: tokenType) => {
    try {
        await axios.post('http://127.0.0.1:8000/generate',
            {
                topic: storeData.topic,
                character: storeData.character,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        Alert.alert('Success', 'Story created!')
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message);
        }
        throw new Error('Unexpected Create-Story Error');
    }
}

export const getMyStoriesAPI = async (token: tokenType) => {
    try {
        const {data} = await axios.get('http://127.0.0.1:8000/story/list', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message);
        }
        throw new Error('Unexpected Get-My-Story Error');
    }
}

export const getMyStoryDetailsAPI = async(story_id: string, token: tokenType) => {
    try {
    const {data} = await axios.get(`http://127.0.0.1:8000/story/text/${story_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
        return data
    }catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message);
        }
        throw new Error('Unexpected Get-My-Story Error');
    }
}