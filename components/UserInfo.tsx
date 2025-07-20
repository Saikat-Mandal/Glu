import { View, Text } from 'react-native'
import React from 'react'

interface UserInfoProps {
    name: string,
    phone: string,
    email: string
}

const UserInfo: React.FC<UserInfoProps> = ({ name, phone, email }) => {
    return (
        <View className='bg-[#FFFAFA] p-4 mb-2 rounded-xl'>
            <Text className=' font-fsemibold text-xl'>{name ? name : "N/A"}</Text>
            <Text className=' font-fregular'>{phone ? phone : "N/A"}</Text>
            <Text className=' font-fregular'>{email ? email : "N/A"}</Text>
        </View>
    )
}

export default UserInfo