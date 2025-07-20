import { View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'


import Entypo from '@expo/vector-icons/Entypo';

type InputField = {
    onChangeText: (text: string) => void,
    text: string,
    value: string,
    placeholder: string
}


const InputField = ({ onChangeText, text, placeholder, value }: InputField) => {

    const [showPassword, setShowPassword] = useState(false)

    return (
        <View className="w-full h-16 flex-row border-2 px-6 justify-center border-black-200 text-black rounded-2xl focus:border-secondary items-center my-2">

            <TextInput
                className="flex-1 font-psemibold text-base"
                onChangeText={onChangeText}
                value={value}
                placeholderTextColor="#7b7b8b"
                placeholder={placeholder}
                secureTextEntry={text === 'Password' && !showPassword}
            />
            {
                text === "Password" && (
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        {
                            !showPassword ? (<Entypo name="eye-with-line" size={24} color="black" />) :
                                (
                                    <Entypo name="eye" size={24} color="black" />
                                )
                        }
                    </Pressable>
                )
            }
        </View>
    )
}

export default InputField