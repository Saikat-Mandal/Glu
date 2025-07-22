import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, FlatList, Image, Platform, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';


import image from "@/assets/images/c1.jpg";
import Button from '@/components/Button';
import Caraousal from '@/components/Caraousal';
import Offers from '@/components/Offers';
import { useAuth } from '@/context/AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';

// types 
// types 
interface RoomType {
    id: number;
    roomType: string;
    price: number;
    availability: boolean;
    numberOfBeds: number;
}

interface HostelType {
    id: number;
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    description: string;
    initialPrice: number;
    latitude: number;
    longitude: number;
    rooms: RoomType[];
    amenities: string[];
    images: string[];
}


const Home = () => {
    const { user } = useAuth()
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const [curlocation, setCurlocation] = useState('');
    const [tab, setTab] = useState('Love'); // Set "Love" as the default tab
    const [hostel, setHostel] = useState<HostelType | null>(null); // Set "Love" as the default tab
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // globe animation 
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 4000, // 4 seconds for a full rotation
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const rotateInterpolate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const data = [
        { id: '1', icon: <MaterialCommunityIcons name="calendar-heart" size={24} color="black" />, name: 'Love' },
        // { id: '2', icon: <Feather name="plus-circle" size={24} color="black" />, name: 'New' },
        { id: '3', icon: <FontAwesome name="arrow-up" size={24} color="black" />, name: 'North' },
        { id: '4', icon: <FontAwesome name="arrow-down" size={24} color="black" />, name: 'South' },
        { id: '5', icon: <FontAwesome name="arrow-left" size={24} color="black" />, name: 'West' },
        // { id: '6', icon: <FontAwesome6 name="mountain" size={24} color="black" />, name: 'Mountain' },
        // { id: '7', icon: <MaterialCommunityIcons name="beach" size={24} color="black" />, name: 'Beach' },
        // { id: '8', icon: <Entypo name="globe" size={24} color="black" />, name: 'Offbeat' },
        // { id: '9', icon: <FontAwesome6 name="person-skiing" size={24} color="black" />, name: 'Adventure' },
        // { id: '10', icon: <Entypo name="laptop" size={24} color="black" />, name: 'Workathon' },
        // { id: '11', icon: <FontAwesome6 name="city" size={24} color="black" />, name: 'City' },
        // { id: '12', icon: <MaterialCommunityIcons name="party-popper" size={24} color="black" />, name: 'Party' },
    ];

    // tab select 
    useEffect(() => {
        try {
            const getHostels = async () => {
                let res: any
                if (tab === "Love") {
                    res = await fetch(`http://192.168.29.221:8080/api/v1/hostel`)
                }
                else if (tab === "North") {
                    res = await fetch(`http://192.168.29.221:8080/api/v1/hostel/northfilter?latitude=28.7041`)
                }
                else if (tab === "South") {
                    res = await fetch("http://192.168.29.221:8080/api/v1/hostel/southfilter?latitude=24.5000")
                }
                else if (tab === "West") {
                    res = await fetch("http://192.168.29.221:8080/api/v1/hostel/westfilter?longitude=75.00&latitude=31.00")
                }
                const json = await res.json()
                setHostel(json)
            }

            getHostels()
        } catch (error) {
            console.log(error);
        }

    }, [tab])



    return (
        <ScrollView className="flex-1 px-6">
            <View className="flex-row items-center mt-20 justify-between">
                <Text className="font-fbold text-3xl">Ohai👋{user ? user : "pookie"}</Text>
                <View className="flex-row items-center bg-black rounded-full px-3 py-2 gap-x-1">
                    <Text className="text-white">700</Text>
                    <Text>🪙</Text>
                </View>
            </View>

            <Pressable className="font-fmedium text-base mt-10 self-start border-gray-400 border px-4 py-2 rounded-full">
                <Text>📍 {curlocation || errorMsg || 'Set Location'}</Text>
            </Pressable>

            {/* search  */}
            <View className="flex-row items-center mt-4 justify-between">
                <Pressable onPress={() => router.push("/search")} className="border-gray-400 border rounded-full flex-row items-center p-3" >
                    <AntDesign name="search1" size={24} color="black" className="px-3" />
                    <View className=' w-2/3'>
                        <Text>Search</Text>
                    </View>
                </Pressable>
                <TouchableOpacity onPress={() => router.push("/map")}>
                    <Animated.Text style={{ transform: [{ rotate: rotateInterpolate }], fontSize: 40 }}>🌎</Animated.Text>
                </TouchableOpacity>
            </View>

            {/* Carousel */}
            <Caraousal />

            <View className="mt-10">
                <FlatList
                    data={data}
                    horizontal
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className={`px-6 py-2 rounded-full ${tab === item.name ? 'border border-primary' : ''}`}
                            onPress={() => setTab(item.name)}
                        >
                            <Text className="text-xl self-center">{item.icon}</Text>
                            <Text className="text-black text-xs">{item.name}</Text>
                        </TouchableOpacity>
                    )}
                />


                <View>
                    {hostel?.length > 0 ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {/* First 3x3 Grid */}
                            <View style={{ width: 300, height: 350, marginRight: 10 }}>
                                <FlatList
                                    data={hostel?.slice(0, 9)} // Take only first 9 items for first grid
                                    numColumns={3}
                                    scrollEnabled={false}
                                    keyExtractor={(item, index) => `grid1-${index}`}
                                    renderItem={({ item }) => (
                                        <Pressable
                                            className="mt-3 items-center"
                                            style={{ width: '33%' }}
                                            onPress={() => router.push({ pathname: "/[hostel]", params: { hostelId: item.id } })}
                                        >
                                            <Image
                                                source={item.images?.length > 0 ? { uri: item.images[0].imageUrl } : image}
                                                className="h-20 w-20 rounded-full"
                                            />
                                            <Text className="text-center text-xs mt-1" numberOfLines={2}>{item.name}</Text>
                                        </Pressable>
                                    )}
                                />
                            </View>

                            {/* Additional grids if more than 9 items */}
                            {hostel?.length > 9 && (
                                <View style={{ width: 300, height: 300 }}>
                                    <FlatList
                                        data={hostel?.slice(9)} // Take remaining items
                                        numColumns={3}
                                        scrollEnabled={false}
                                        keyExtractor={(item, index) => `grid2-${index}`}
                                        renderItem={({ item }) => (
                                            <Pressable
                                                className="mt-3 items-center"
                                                style={{ width: '33%' }}
                                                onPress={() => router.push({ pathname: "/[hostel]", params: { hostelId: item.id } })}
                                            >
                                                <Image
                                                    source={item.images?.length > 0 ? { uri: item.images[0].imageUrl } : image}
                                                    className="h-20 w-20 rounded-full"
                                                />
                                                <Text className="text-center text-xs mt-1" numberOfLines={2}>{item.name}</Text>
                                            </Pressable>
                                        )}
                                    />
                                </View>
                            )}
                        </ScrollView>
                    ) : (
                        <Text className="text-center my-4">No hostels found</Text>
                    )}
                </View>


            </View>


            {/* Offers */}
            <View>
                <Text className="font-fbold text-3xl mt-10">Hurray! Here are some exciting offers for you</Text>
                <Offers />
            </View>

            <View className="items-center mb-20">
                <Ionicons name="ellipsis-horizontal-outline" size={24} color="#E8D2BC" />
                <Text className="font-fbold text-3xl text-center mt-10">
                    Turn Stays into Success Partner with Us for a Thriving Hostel Franchise!
                </Text>
                <Button
                    text="Apply Now!"
                    textStyles="text-black text-xl font-fbold"
                    onPress={() => router.replace('/home')}
                    containerStyles="bg-primary w-20 rounded-2xl mb-6 mt-10"
                />
                <Ionicons name="ellipsis-horizontal-outline" size={24} color="#E8D2BC" />
            </View>

            <StatusBar style={Platform.OS === 'ios' ? 'dark' : 'auto'} />
        </ScrollView>
    )
}

export default Home