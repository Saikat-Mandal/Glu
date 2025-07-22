import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import React, { useRef, useState } from 'react'
import { ActivityIndicator, Alert, Animated, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import logo from "../../assets/images/icon.png"
import { useAuth } from '@/context/AuthContext'
import axios from "axios"
import { router } from 'expo-router'

const Login = () => {
    const { login } = useAuth()

    // const [email, setEmail] = useState<string>('');
    const [username, setusername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showEmailPasswordsFields, setShowEmailPasswordsFields] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fadeAnim = useRef(new Animated.Value(0)).current
    const slideAnim = useRef(new Animated.Value(20)).current

    const triggerAnimation = () => {
        fadeAnim.setValue(0)
        slideAnim.setValue(20)

        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const handleEmailPress = () => {
        if (!showEmailPasswordsFields) {
            setShowEmailPasswordsFields(true)
            triggerAnimation()
        } else {
            setShowEmailPasswordsFields(false)
        }
    }

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`http://192.168.29.221:8080/api/v1/auth/signin`, {
                username,
                password
            });
            if (response?.data) {
                const userData = response.data;


                login(response?.data.jwtToken, userData)
                setusername('')
                setPassword('')
                router.replace("/(tabs)/home")
            }
        } catch (error) {
            Alert.alert("Login Failed", error?.response?.data?.message || "Something went wrong. Please try again.");
        }
        finally {
            setIsLoading(false)
        }

    };

    return (
        <View className='mt-20 px-6'>
            {/* Header */}
            {/* <View className='flex-row items-center gap-x-6 '>
                <Pressable onPress={() => router.back()}>
                    <AntDesign name="close" size={18} color="black" />
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

            {/* Title */}
            <Text className='font-mbold text-3xl my-10'>Log in or sign up</Text>

            {/* Social Logins */}
            <Pressable className='flex-row items-center justify-between bg-gray-200 p-3 rounded-2xl mb-3'>
                <AntDesign name="google" size={24} color="black" />
                <Text className='text-xl font-mbold'>Google</Text>
                <View className='ml-6' />
            </Pressable>

            <Pressable className='flex-row items-center justify-between bg-[black] p-3 rounded-2xl mb-3'>
                <AntDesign name="apple1" size={24} color="white" />
                <Text className='text-xl font-mbold text-white'>Continue with Apple</Text>
                <View className='ml-6' />
            </Pressable>

            {/* Email Login Toggle */}
            <TouchableOpacity
                onPress={handleEmailPress}
                className='flex-row items-center justify-between border-2 border-black p-3 rounded-2xl mb-3'
            >
                <MaterialIcons name="email" size={24} color="black" />
                <Text className='text-xl font-mbold'>Username</Text>
                <View className='ml-6' />
            </TouchableOpacity>

            {/* Animated Email/Password Fields */}
            {
                showEmailPasswordsFields && (
                    <Animated.View
                        style={{
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }],
                        }}
                        className="gap-y-4 mt-4"
                    >
                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="black"
                            className="border border-gray-300 rounded-xl h-16 px-4 text-lg"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={username}
                            onChangeText={setusername}
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
                            onPress={fetchData}
                        >
                            {
                                isLoading ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text className="text-white text-center font-mbold">Continue</Text>
                                )
                            }
                        </TouchableOpacity>
                        <View className='flex-row justify-between items-center px-3 mt-2'>
                            <Pressable onPress={() => router.push("/(auth)/signup")}>
                                <Text className=' text-blue-500 font-mbold'>Sign up</Text>
                            </Pressable>
                            <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
                                <Text className=' text-blue-500 font-mbold'>Forgot password</Text>
                            </Pressable>
                        </View>
                    </Animated.View>
                )
            }
        </View>
    )
}

export default Login