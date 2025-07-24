import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import image from '../assets/images/c1.jpg';
import InputSpinner from './InputSpinner';

const RoomCard = ({ roomId, roomType, price, availability, onBedsChange, imageUrl }) => {

    const [onSelectBedPress, setOnSelectBedPress] = useState(false);
    const [bedsCount, setBedsCount] = useState(1);


    const handleBedsChange = (beds) => {
        setBedsCount(beds);
        onBedsChange(beds);
        // If beds drop to 0, hide InputSpinner
        if (beds < 1) {
            setOnSelectBedPress(false);
        }
    };

    return (
        <Pressable className=' rounded-xl bg-slate-200 mb-6' >
            <Image source={imageUrl ? { uri: imageUrl } : image} resizeMode='cover' className='h-44 w-full rounded-t-xl' />
            <View className='px-4 pb-6'>
                <View className='flex-row items-center justify-between mt-4'>
                    <Text className=' font-fbold text-lg w-1/2'>{roomType} </Text>
                    <Text className=' font-fbold'>₹{price} / <Text className='text-sm font-fbold'>night</Text></Text>
                </View>

                <View className='mt-2 flex-row items-center'>
                    <Ionicons name="person-circle-outline" size={20} color="black" />
                    <Text>x 1</Text>
                </View>

                <Text className='mt-4 font-fregular text-base'>
                    A bed in a luxe mixed dorm with private lockers, AC, a shared en suite, and a balcony with a garden view.
                </Text>

                <View className='flex-row items-center justify-between mt-6'>
                    <Text className='font-fbold '>{availability ? "Available" : "NA"}</Text>

                    {onSelectBedPress ? (
                        <InputSpinner onBedsChange={handleBedsChange} />
                    ) : (
                        <Pressable onPress={() => setOnSelectBedPress(true)} className='py-3 px-4 bg-yellow-300 rounded-full'>
                            <Text className='font-fbold'>Select Bed</Text>
                        </Pressable>
                    )}
                </View>

            </View>
        </Pressable>
    );
};

export default RoomCard;
