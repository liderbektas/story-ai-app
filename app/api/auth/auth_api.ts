import { setLogin, setLogout } from "@/app/store/auth/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios"
import { router } from "expo-router";
import { Alert } from "react-native";

type registerStep1DataProps = {
    email: string,
    password: string,
}

interface RegisterStep2DataProps {
    full_name: string;
    email?: string;
    age_group: string;
    language: string;
}

type loginDataProps = {
    username: string,
    password: string,
}

export const registerStep1API = async (registerStep1Data: registerStep1DataProps) => {
    try {
        await axios.post('http://127.0.0.1:8000/register/step1', {
            email: registerStep1Data.email,
            password: registerStep1Data.password,
        });
        router.push({
            pathname: '/(auth)/register-step2',
            params: { email: registerStep1Data.email }
        });
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.detail);
        }
        throw new Error('Unexpected Register-Step-1 Error');
    }
}

export const registerStep2API = async (registerStep2Data: RegisterStep2DataProps) => {
    console.log(registerStep2Data);
    try {
        await axios.post('http://127.0.0.1:8000/register/step2', {
            full_name: registerStep2Data.full_name,
            email: registerStep2Data.email,
            age_group: registerStep2Data.age_group,
            language: registerStep2Data.language,
        });
        router.push('/(auth)')
        Alert.alert('Success', 'Registered Succesfully');
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.detail || 'API Error');
        }
        throw new Error('Unexpected Register-Step-2 Error');
    }
};

export const resetPasswordAPI = async (email: string) => {
    try {
        await axios.post('http://127.0.0.1:8000/password-reset', {
            email
        })
        router.push('/(auth)/reset-pasword')
        Alert.alert('Success', 'Password reset email sent');
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.detail || 'API Error');
        }
        throw new Error('Unexpected Reset-Password Error');
    }
}

export const resetPasswordConfirmAPI = async (reset_token: string, new_password: string) => {
    try {
        await axios.post('http://127.0.0.1:8000/password-reset/confirm', {
            reset_token,
            new_password
        })
        router.push('/(auth)')
        Alert.alert('Success', 'Your password has been renewed');
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.detail || 'API Error');
        }
        throw new Error('Unexpected Reset-Password Error');
    }
}

export const loginAPI = async (loginData: loginDataProps) => {
    try {
        const params = new URLSearchParams();
        params.append('username', loginData.username);
        params.append('password', loginData.password);
        const { data } = await axios.post(
            'http://127.0.0.1:8000/token',
            params.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        setLogin({ token: data.access_token, user: data.user })
        await AsyncStorage.setItem('token', data.access_token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        Alert.alert('Success', 'User logged in successfully');
        router.push('/(tabs)');
    } catch (error) {
        if (axios.isAxiosError(error)) {
            Alert.alert('Error', error.response?.data?.detail);
        } else {
            Alert.alert('Error', 'Unexpected login error');
        }
    }
};

export const logoutAPI = async () => {
    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        setLogout()
        router.push('/onboard')
        Alert.alert('Success', 'Logout successfully');
    } catch (error) {
        console.log(error);
    }
}
