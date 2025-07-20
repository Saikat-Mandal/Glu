import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface ButtonProps {
    containerStyles: string,
    text: string
    textStyles: string,
    onPress?: () => void
}

const Button: React.FC<ButtonProps> = ({ containerStyles, text, textStyles, onPress }) => {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className={`${containerStyles} rounded-full min-h-[62px] min-w-36 justify-center items-center `}
            onPress={onPress}
        >
            <Text className={`font-psemibold text-lg ${textStyles}`}
            >{text}</Text>
        </TouchableOpacity>
    )
}

export default Button