import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import UserInfo from '@/components/UserInfo';
import image from '../assets/images/c1.jpg';

const BookingReview = () => {



    return (
        <View className='mt-20 flex-1 '>
            <Pressable className='mt-4 mb-6 px-8' onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </Pressable>
            <ScrollView>


                <Text className='text-3xl font-fbold px-8'>Review your details</Text>

                <View className='flex-row items-center justify-between mt-8 border-b border-gray-200 pb-8 pt-4 mx-8'>
                    <View>
                        <Text >Check-In</Text>
                        <Text className=' text-xl font-fbold'>Tue, 01 Apr'25</Text>
                    </View>
                    <Ionicons name="arrow-forward-outline" size={24} color="black" />
                    <View>
                        <Text>Check-Out</Text>
                        <Text className=' text-xl font-fbold'>Tue, 05 Apr'25</Text>
                    </View>
                </View>

                <Text className='text-2xl font-fbold py-6 px-8'>Room info</Text>
                <View className='flex-row justify-between items-center border-b border-gray-200 pb-8 pt-4 mx-8'>
                    <View className='flex-row items-center gap-x-4 '>
                        <Image
                            source={image}
                            // resizeMode='contain'
                            className='h-20 w-20 rounded-2xl'
                        />
                        <View>
                            <Text className=' font-fbold '>4 bed mixed dorm AC</Text>
                            <Text className=' font-fbold '>₹ 699 x 2</Text>
                            <Text className=' font-fregular text-sm'>for 1 night</Text>
                        </View>
                    </View>
                    <Text className=' font-fregular '>₹ 699</Text>
                </View>

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

                <Text className='text-2xl font-fbold py-6 mx-8'>Payment info</Text>
                <View className='px-8'>
                    <View className='flex-row items-center justify-between mb-4'>
                        <Text className='text-xl font-fregular'>Stay total</Text>
                        <Text className='text-xl font-fregular'>₹ 699</Text>
                    </View>
                    <View className='flex-row items-center justify-between mb-4'>
                        <Text className='text-xl font-fregular'>Offer</Text>
                        <Text className='text-xl font-fregular text-green-500'>- ₹ 0</Text>
                    </View>
                    <View className='flex-row items-center justify-between mb-4'>
                        <Text className='text-xl font-fregular'>Total taxes</Text>
                        <Text className='text-xl font-fregular'>₹ 185</Text>
                    </View>

                </View>

                <View className='flex-row items-center justify-between mb-4 p-4 rounded-xl mx-4 bg-[#FFFAFA] '>
                    <Text className='text-xl font-fbold'>Grand total</Text>
                    <Text className='text-xl font-fsemibold'>₹ 983</Text>
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
