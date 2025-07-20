import { View, Text, Pressable, Linking } from 'react-native'
import React from 'react'
import * as Haptics from 'expo-haptics';

interface SettingsTabProps {
    id: string;
    name: string;
    icon?: React.ReactNode,
    textStyles?: string,
    pagelink: string
}


const SettingsTab: React.FC<SettingsTabProps> = ({ id, name, icon, textStyles, pagelink }) => {


    const handleSocialLink = async (pagelink: string) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        await Linking.openURL(pagelink);
    };


    return (
        <>
            <Pressable onPress={() => handleSocialLink(pagelink)} className='gap-x-3 flex-row pb-4'>
                <Text> {icon ? icon : ""}</Text>
                <Text className={`font-fbold text-xl ${textStyles}`}>{name}</Text>
            </Pressable>
            <View className='w-80 h-[1px] bg-gray-50 rounded-full self-center mb-7' /></>
    )
}

export default SettingsTab