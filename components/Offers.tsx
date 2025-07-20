import { View, Dimensions, Text } from 'react-native';
import React from 'react';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate } from 'react-native-reanimated';

import image1 from '../assets/images/c1.jpg';
import image2 from '../assets/images/c2.jpg';
import image3 from '../assets/images/c3.jpg';
import image4 from '../assets/images/c4.jpg';

const { width } = Dimensions.get('screen');
const imageWidth = width * 0.7;
const imageHeight = imageWidth * 1.76;
const gaping = 5; // Spacing between images


const Photo = ({ item, index, scrollX }) => {
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(
            scrollX.value,
            [(index - 1) * (imageWidth + gaping), index * (imageWidth + gaping), (index + 1) * (imageWidth + gaping)],
            [1.6, 1, 1.6]
        );
        const rotate = interpolate(
            scrollX.value,
            [
                (index - 1) * (imageWidth + gaping),
                index * (imageWidth + gaping),
                (index + 1) * (imageWidth + gaping)
            ],
            [10, 0, -10]
        );

        return {
            // transform: [],
            borderRadius: 30, // Rounded corners
        };
    });

    return (
        <View style={{
            width: imageWidth,
            height: imageHeight,
            overflow: 'hidden',
            borderRadius: 30,
            position: 'relative'
        }}>
            <Animated.Image
                source={item.image}
                resizeMode="cover"
                style={[{ width: '100%', height: '100%', borderRadius: 30 }, animatedStyle]}
            />
            <Text className='bg-primary text-black rounded-full p-4 absolute bottom-4 left-4 font-fbold'>
                {item.name}
            </Text>

        </View>
    );

};

const Offers = () => {
    const data = [
        { id: 1, image: image1, name: "Hosteller Hanle" },
        { id: 2, image: image2, name: "Hosteller Shilma" },
        { id: 3, image: image3, name: "Hosteller Tawang" },
        { id: 4, image: image4, name: "Hosteller Ooty" },
    ];

    const scrollX = useSharedValue(0);

    const onScroll = useAnimatedScrollHandler((event) => {
        scrollX.value = event.contentOffset.x;
    });

    return (
        <View className='my-10'>
            <View>

            </View>
            <Animated.FlatList
                data={data}
                horizontal
                keyExtractor={(item) => String(item.id)}
                snapToInterval={imageWidth + gaping}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: (width - imageWidth) / 2,
                    gap: gaping,
                }}
                renderItem={({ item, index }) => <Photo item={item} index={index} scrollX={scrollX} />}
                onScroll={onScroll}
                scrollEventThrottle={16}
            />
        </View>
    );
};

export default Offers;
