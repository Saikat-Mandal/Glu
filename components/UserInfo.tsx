import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import Feather from '@expo/vector-icons/Feather';

interface UserInfoProps {
    name: string,
    phone: string,
    email: string,
    setEditGuestModal: (value: boolean) => void;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, phone, email, setEditGuestModal }) => {



    return (
        <View className='bg-[#FFFAFA] px-6 py-4 mb-2 rounded-xl flex-row items-center justify-between'>
            <View>
                <Text className=' font-fsemibold text-xl'>{name ? name : "N/A"}</Text>
                <Text className=' font-fregular'>{phone ? phone : "N/A"}</Text>
                <Text className=' font-fregular'>{email ? email : "N/A"}</Text>
            </View>
            <TouchableOpacity onPress={() => setEditGuestModal(true)}>
                <Feather name="edit-2" size={18} color="black" />
            </TouchableOpacity>
        </View>
    )
}

export default UserInfo