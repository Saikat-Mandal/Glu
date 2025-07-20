import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, Text, View } from 'react-native'

const Bookings = () => {
    return (
        <View className='flex-1 '>

            <View className='mt-20 px-8 items-center '>
                <Text className='font-fbold text-3xl text-center '>Book a hosteller now!</Text>
            </View>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    )
}

export default Bookings