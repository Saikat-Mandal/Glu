import { View, Text } from 'react-native'
import React from 'react'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import RoomCard from '@/components/RoomCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

interface AmenitiyProp {
    name: string,
}

const Amenitiy: React.FC<AmenitiyProp> = ({ name }) => {

    const amenityIcons: Record<string, React.ReactNode> = {
        WiFi: <FontAwesome5 name="wifi" size={20} color="black" />,
        Reception: <FontAwesome5 name="concierge-bell" size={20} color="black" />,
        Breakfast: <FontAwesome5 name="utensils" size={20} color="black" />,
        Pool: <FontAwesome5 name="swimmer" size={20} color="black" />,
        AC: <FontAwesome5 name="snowflake" size={20} color="black" />,
    };

    return (
        <View className='flex-row items-center justify-between my-3 font-fregular'>
            <Text className=' font-fmedium'>{name}</Text>
            {amenityIcons[name] ?? <FontAwesome5 name="question-circle" size={20} color="gray" />}
        </View>
    )
}

export default Amenitiy