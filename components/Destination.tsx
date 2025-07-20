import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import image from '../assets/images/c1.jpg';
import { router } from 'expo-router';

interface DestinationProps {
    name: string,
    imageUrl: string,
    id: number
}

const Destination: React.FC<DestinationProps> = ({ name, imageUrl, id }) => {
    return (
        <TouchableOpacity
            onPress={() => router.push({ pathname: "/[hostel]", params: { hostelId: id } })}
            className='flex-row items-center gap-x-4 mb-4'>
            <Image
                source={imageUrl ? { uri: imageUrl } : image}
                // resizeMode='contain'
                className='h-20 w-20 rounded-2xl'
            />
            <Text>{name}</Text>
        </TouchableOpacity>
    )
}

export default Destination