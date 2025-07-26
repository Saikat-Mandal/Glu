import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface UserInfoProps {
    name: string;
    phone: string;
    email: string;
    setEditGuestModal: () => void;
    index: number;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, phone, email, setEditGuestModal, index }) => {
    const isInfoFilled = name.trim() !== '' || phone.trim() !== '' || email.trim() !== '';

    return (
        <View className='bg-[#FFFAFA] px-6 py-4 mb-2 rounded-xl flex-row items-center justify-between'>
            <View>
                {isInfoFilled ? (
                    <>
                        <Text className='font-fsemibold text-xl'>{name || "N/A"}</Text>
                        <Text className='font-fregular'>{phone || "N/A"}</Text>
                        <Text className='font-fregular'>{email || "N/A"}</Text>
                    </>
                ) : (
                    <Text className='font-fsemibold text-xl'>Guest {index + 1}</Text>
                )}
            </View>

            <TouchableOpacity onPress={setEditGuestModal}>
                {isInfoFilled ? (
                    <Feather name="edit-2" size={18} color="black" />
                ) : (
                    <FontAwesome name="plus" size={24} color="black" />
                )}
            </TouchableOpacity>
        </View>
    );
};

export default UserInfo;
