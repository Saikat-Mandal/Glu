import { View, Text, TextInput } from 'react-native'
import React from 'react'

import AntDesign from '@expo/vector-icons/AntDesign';

interface SearchFieldPorps {
    onChangeText: () => null,
    value: string
}

const SearchField: React.FC<SearchFieldPorps> = ({ onChangeText, value }) => {


    return (
        <View className='flex-row items-center mt-4 mx-4'>
            <View className=' bg-zinc-200 rounded-full flex-row items-center'>
                <AntDesign name="search1" size={24} color="black" className='px-3' />
                <TextInput
                    onChangeText={onChangeText}
                    placeholder="Search"
                    value={value}
                    className='w-4/6 text-xl'
                />
            </View>
            <Text className=' text-xl ml-6  font-semibold'>
                Cancel
            </Text>
        </View>
    )
}

export default SearchField