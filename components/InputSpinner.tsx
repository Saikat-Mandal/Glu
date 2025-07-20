import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

const InputSpinner = ({ onBedsChange }) => {

    const [beds, setBeds] = useState<number>(1);

    useEffect(() => {
        onBedsChange(beds);
    }, [beds]);

    const increase = () => {
        setBeds(prev => prev + 1);
    };

    const decrease = () => {
        setBeds(prev => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <View className='flex-row items-center rounded-md'>
            <Pressable onPress={decrease} >
                <AntDesign style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }} className=' p-3 bg-primary' name="minus" size={18} color="black" />
            </Pressable>

            <Text className='bg-white px-4 py-3'>
                {beds === 0 ? "No beds selected" : beds}
            </Text>

            <Pressable onPress={increase}>
                <AntDesign style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20 }} className=' p-3 bg-primary' name="plus" size={18} color="black" />
            </Pressable>
        </View>
    );
};

export default InputSpinner;
