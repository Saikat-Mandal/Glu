import axios from 'axios'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'



const SignUp = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);


    const onSignUp = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`${process.env.EXPO_PUBLIC_API_URL}/auth/signup`, {
                username,
                email,
                password
            });
            if (response?.data) {
                setEmail('')
                setPassword('')
                setUsername('')
                Alert.alert("Sign up successfull! please login");
                router.replace("/(auth)/login")
            }
        } catch (error) {
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as any;
                Alert.alert("Login Failed", axiosError.response?.data?.message || "Something went wrong. Please try again.");
            } else {
                Alert.alert("Login Failed", "Something went wrong. Please try again.");
            }
        }
        finally {
            setIsLoading(false)
        }
    };

    return (
        <View className='mt-20 px-6'>
            {/* <View className='flex-row items-center gap-x-6 '>
                <Pressable onPress={() => router.back()}>
                    <FontAwesome5 name="arrow-left" size={19} color="black" />
                </Pressable>
                <View className='flex-row items-center gap-x-1'>
                    <Image
                        source={logo}
                        resizeMode='cover'
                        className='h-8 w-8'
                    />
                    <Text className='text-xl font-mbold text-primary'>Skoutt.</Text>
                </View>
            </View> */}
            <Text className='font-mbold text-3xl my-10'>Sign up</Text>

            <View

                className="gap-y-4 mt-4"
            >
                <TextInput
                    placeholder="Email"
                    placeholderTextColor="black"
                    className="border border-gray-300 rounded-xl h-16 px-4 text-lg"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Username"
                    placeholderTextColor="black"
                    className="border border-gray-300 rounded-xl h-16 px-4 text-lg"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                />

                <TextInput
                    placeholder="Password"
                    placeholderTextColor="black"
                    className="border border-gray-300 rounded-xl h-16 px-4 text-lg"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity
                    className="bg-black p-4 rounded-xl mt-2"
                    onPress={onSignUp}
                >
                    {
                        isLoading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text className="text-white text-center font-mbold">Continue</Text>
                        )
                    }
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default SignUp