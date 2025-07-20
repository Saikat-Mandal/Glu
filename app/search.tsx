import Destination from '@/components/Destination';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';



// types 
interface ImageType {
    id: number;
    imageUrl: string
}

interface HostelType {
    id: number;
    name: string,
    images: ImageType[]
}

const Search = () => {

    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<HostelType[] | null>(null);


    const debounceRef = useRef<number | null>(null);

    // Function to fetch destinations from API
    const fetchDestinations = async (query: string) => {
        if (!query.trim()) {
            setResults(null); // Reset results when search is empty
            return;
        }// Avoid unnecessary API calls

        try {
            const response = await fetch(`http://192.168.29.221:8080/api/v1/hostel/search?name=${query}`);
            const data = await response.json();
            setResults(data as HostelType[]); // Assuming API returns a list of destinations
        } catch (error) {
            console.error("Error fetching destinations:", error);
        }
    };

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            fetchDestinations(search);
        }, 500);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [search]);

    return (
        <View className="flex-1">
            <View className="mt-20 mx-10">
                <Pressable className='mt-4 mb-10' onPress={() => router.back()}>
                    <AntDesign name="close" size={24} color="black" />
                </Pressable>
                <View className="border-gray-400 border rounded-full flex-row items-center p-3">
                    <AntDesign name="search1" size={24} color="black" style={{ marginRight: 8 }} />
                    <TextInput
                        value={search}
                        onChangeText={setSearch}
                        className="flex-1 text-black"
                        placeholder="Search"
                        placeholderTextColor="gray"
                    />
                </View>

                {/* destinations  */}
            </View>

            <View className='mt-10'>
                <Text className='font-fbold text-xl bg-[#FFFAFA] pl-10 py-2 text-gray-500'>Destinations</Text>
            </View>

            <ScrollView className="ml-10 mt-10">
                <View>
                    {(results === null) ? (
                        <Text className="text-gray-400 pl-10 mt-2">Search for a stay...</Text>
                    ) : results?.length ? (
                        results?.map((item) => (
                            <Destination
                                id={item.id}
                                key={item.id}
                                name={item.name}
                                imageUrl={item.images[0]?.imageUrl}
                            />
                        ))
                    ) : (
                        <Text className="text-gray-400 pl-10 mt-2">No results found</Text>
                    )}
                </View>
            </ScrollView>

        </View>
    );
};

export default Search;
