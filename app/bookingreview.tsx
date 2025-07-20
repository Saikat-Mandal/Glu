import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { formatToUTCBookingReview } from '@/utils/hostelUtils';

import UserInfo from '@/components/UserInfo';
import image from '../assets/images/c1.jpg';

const BookingReview = () => {

    const { hostelImage, checkInDate, checkOutDate, selectedRooms, totalPrice, tax, grandTotal, totalNights } = useLocalSearchParams();

    let rooms: any[] = [];

    try {
        const selectedRoomsStr = Array.isArray(selectedRooms)
            ? selectedRooms[0] // Take the first element if it's an array
            : selectedRooms;   // Use directly if it's a string

        rooms = selectedRoomsStr ? JSON.parse(selectedRoomsStr) : [];
    } catch (e) {
        console.error("Invalid selectedRooms", e);
    }

    const getTotalNights = (param: string | string[] | undefined): number => {
        if (!param) return 1; // Default to 1 night if undefined

        const value = Array.isArray(param) ? param[0] : param;

        const parsed = parseInt(value, 10);
        return isNaN(parsed) ? 1 : parsed;
    };

    const nights = getTotalNights(totalNights);


    return (
        <View className='mt-20 flex-1 '>
            <Pressable className='mt-4 mb-6 px-8' onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </Pressable>
            <ScrollView>

                {/* dates  */}
                <Text className='text-3xl font-fbold px-8'>Review your details</Text>

                <View className='flex-row items-center justify-between mt-8 border-b border-gray-200 pb-8 pt-4 mx-8'>
                    <View>
                        <Text >Check-In</Text>
                        <Text className=' text-xl font-fbold'>{formatToUTCBookingReview(checkInDate)}</Text>
                    </View>
                    <Ionicons name="arrow-forward-outline" size={24} color="black" />
                    <View>
                        <Text>Check-Out</Text>
                        <Text className=' text-xl font-fbold'>{formatToUTCBookingReview(checkOutDate)}</Text>
                    </View>
                </View>


                {/* rooms info  */}
                <Text className='text-2xl font-fbold py-6 px-8'>Room info</Text>

                {
                    rooms?.map((item, index) => (
                        <View
                            key={index} // ✅ Add key here
                            className='flex-row justify-between items-center border-b border-gray-200 pb-8 pt-4 mx-8'
                        >
                            <View className='flex-row items-center gap-x-4 '>
                                <Image
                                    source={hostelImage ? { uri: Array.isArray(hostelImage) ? hostelImage[0] : hostelImage } : image}
                                    className='h-20 w-20 rounded-2xl'
                                />

                                <View>
                                    <Text className=' font-fbold '>{item.roomType}</Text>
                                    <Text className=' font-fbold '>₹ {item.price} x {item.beds}</Text>

                                    <Text className=' font-fregular text-sm'>
                                        for {nights} {nights > 1 ? 'nights' : 'night'}
                                    </Text>


                                </View>
                            </View>
                            <Text className=' font-fregular '>₹ {item.price * item.beds}</Text>
                        </View>
                    ))
                }

                {/* guest info  */}
                <Text className='text-2xl font-fbold py-6 px-8'>Guest info</Text>

                <View className='border-b border-gray-200 pb-8 pt-4 mx-8'>
                    <UserInfo
                        name='saikat'
                        phone="7894561231"
                        email="s@gmail.com"
                    />
                    <UserInfo
                        name='saikat'
                        phone="7894561231"
                        email="s@gmail.com"
                    />
                </View>


                {/* payment info  */}
                <Text className='text-2xl font-fbold py-6 mx-8'>Payment info</Text>

                <View className='px-8'>
                    <View className='flex-row items-center justify-between mb-4'>
                        <Text className='text-xl font-fregular'>Stay total</Text>
                        <Text className='text-xl font-fregular'>₹ {totalPrice}</Text>
                    </View>
                    <View className='flex-row items-center justify-between mb-4'>
                        <Text className='text-xl font-fregular'>Offer</Text>
                        <Text className='text-xl font-fregular text-green-500'>- ₹ 0</Text>
                    </View>
                    <View className='flex-row items-center justify-between mb-4'>
                        <Text className='text-xl font-fregular'>Total taxes</Text>
                        <Text className='text-xl font-fregular'>₹ {tax}</Text>
                    </View>
                </View>

                <View className='flex-row items-center justify-between mb-4 p-4 rounded-xl mx-4 bg-[#FFFAFA] '>
                    <Text className='text-xl font-fbold'>Grand total</Text>
                    <Text className='text-xl font-fsemibold'>₹ {grandTotal}</Text>
                </View>


                <View className='mt-8 border-t border-gray-200 mx-8 mb-8' />
                <Text className=' mx-8'>By proceeding you acknowledge and accept the terms and conditions mentioned in the property policy
                    and cancellation policy
                </Text>

                <TouchableOpacity className='bg-primary mx-8 p-4 flex justify-center items-center mt-10 mb-10 rounded-lg'>
                    <Text className='text-xl font-fbold'>Proceed to pay</Text>
                </TouchableOpacity>

                {/* <View className='mt-40' /> */}

            </ScrollView>
        </View>

    );
};

export default BookingReview;
