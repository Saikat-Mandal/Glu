import Amenitiy from '@/components/Amenitiy';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

import RoomCard from '@/components/RoomCard';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import image from '../assets/images/c1.jpg';

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


const Hostel: React.FC = () => {

    const { hostelId } = useLocalSearchParams<{ hostelId: string }>();

    const [hostel, setHostel] = useState<HostelType | null>(null)
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [summaryModalVisible, setSummaryModalVisible] = useState<boolean>(false);
    const [imagesModal, setImagesModal] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [selectedRooms, setSelectedRooms] = useState<{ [roomId: number]: number }>({});


    // total nights 
    const getTotalNights = () => {
        if (!dateRange.start || !dateRange.end) return 0;

        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);

        const diffInMs = end.getTime() - start.getTime();
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        return diffInDays; // 2025-07-23 to 2025-07-26 = 3 nights
    };


    // room selection 
    const handleRoomSelection = (roomId: number, beds: number, pricePerBed: number) => {
        setSelectedRooms(prev => {
            const updated = { ...prev, [roomId]: beds };

            const nights = getTotalNights();

            // Calculate total price = beds × price × nights
            let total = 0;
            for (const id in updated) {
                const bedCount = updated[id];
                const room = hostel?.rooms.find(r => r.id === Number(id));
                if (room) {
                    total += bedCount * room.price * nights; // price per night × beds × nights
                }
            }

            setTotalPrice(total);
            return updated;
        });
    };





    // Range picking state
    const [dateRange, setDateRange] = useState<{ start: string | null, end: string | null }>({
        start: null,
        end: null,
    });



    // Helper to format display
    const monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const changeToUTC = (date: string): string => {
        const year = date.slice(0, 4);
        const month = parseInt(date.slice(5, 7), 10);
        const day = date.slice(8, 10);

        return `${day} ${monthArray[month - 1]} ${year}`;
    };

    function formatRange({ start, end }: { start: string | null, end: string | null }) {
        if (!start) return 'Select dates';
        if (!end) return 'Select dates';
        return `${changeToUTC(start)} - ${changeToUTC(end)}`;
    }

    // Marked dates for calendar
    const markedDates = {};
    if (dateRange.start && dateRange.end) {
        // Range selection visual feedback
        let start = new Date(dateRange.start);
        let end = new Date(dateRange.end);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            const dateString = d.toISOString().split('T')[0];
            markedDates[dateString] = {
                color: "#FFE700", textColor: "black"
            };
        }
        markedDates[dateRange.start] = { startingDay: true, color: "#FFD600", textColor: "black" };
        markedDates[dateRange.end] = { endingDay: true, color: "#FFD600", textColor: "black" };
    } else if (dateRange.start) {
        markedDates[dateRange.start] = { startingDay: true, color: "#FFD600", textColor: "black" };
    }

    const screenWidth = Dimensions.get('window').width;

    useEffect(() => {
        const getHostelpData = async () => {
            try {
                const res = await fetch(`http://192.168.29.221:8080/api/v1/hostel/${hostelId}`)
                const json = await res.json()
                setHostel(json as HostelType);


            } catch (error) {
                console.log("Error in fetching hostels ", error);

            }
        }

        if (!hostel) {
            getHostelpData()
        }
    })


    // tax calculation 
    const calcTax = (price: number) => {
        return 0.18 * price
    }

    // change route to booking review 
    const changeToReview = () => {
        setSummaryModalVisible(false)
        const nights = getTotalNights();
        const selectedRoomDetails = hostel?.rooms
            .filter(room => selectedRooms[room.id] > 0)
            .map(room => ({
                id: room.id,
                roomType: room.roomType,
                beds: selectedRooms[room.id],
                price: room.price,
                nights: nights
            }));

        router.push({
            pathname: "/bookingreview",
            params: {
                hostelImage: hostel?.images[0] || '',
                checkInDate: dateRange.start,
                checkOutDate: dateRange.end,
                totalNights: nights.toString(),
                selectedRooms: JSON.stringify(selectedRoomDetails),
                totalPrice: totalPrice.toString(),
                tax: calcTax(totalPrice).toString(),
                grandTotal: (totalPrice + calcTax(totalPrice)).toString(),
            }
        })
    }




    return (
        <View className='flex-1'>
            <TouchableOpacity onPress={() => router.back()} className='absolute left-7 top-20 bg-primary p-2 rounded-full z-50'>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <View className='absolute bottom-0 border-slate-300 bg-white border-t-2 p-2 z-50 h-32 w-full'>
                <View className='flex-row justify-between w-full px-3 items-center'>
                    <View>
                        <Pressable onPress={() => setModalVisible(true)} className='flex-row items-center gap-x-2 mt-2'>
                            <FontAwesome name="calendar-o" size={13} color="black" />
                            <Text className='font-fbold border-b border-primary'>
                                {formatRange({ start: dateRange.start, end: dateRange.end })}
                            </Text>
                            <Feather name="edit-2" size={13} color="#FFE700" />
                        </Pressable>
                        <View>
                            {
                                totalPrice === 0 ? (<Text className='font-fbold mt-2'>Select room</Text>) :
                                    (<Text className='font-fbold mt-2'>
                                        {getTotalNights()} {getTotalNights() === 1 ? "night" : "nights"} | ₹{totalPrice}
                                    </Text>)
                            }

                        </View>
                    </View>
                    {
                        totalPrice ?
                            (<Pressable onPress={() => setSummaryModalVisible(true)}>
                                <Text className='font-fbold py-3 px-4 bg-primary rounded-full'>Summary</Text>
                            </Pressable>) :
                            (<Pressable>
                                <Text className='font-fbold py-3 px-4 bg-primary rounded-full'>Select room</Text>
                            </Pressable>)
                    }
                </View>
            </View>

            {/* modal for summary  */}
            <Modal
                visible={summaryModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSummaryModalVisible(false)}>
                <View style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: '100%'
                }}>
                    <View style={{
                        backgroundColor: "white",
                        // padding: 20,
                        borderRadius: 10,
                        alignItems: "center",
                        paddingVertical: 10,
                        paddingHorizontal: 20
                    }}>

                        <View className='flex-row justify-between items-center w-full p-4'>
                            <Text className='font-fbold text-2xl'>Summary</Text>
                            <Pressable onPress={() => setSummaryModalVisible(false)}>
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        </View>

                        <View>
                            {Object.keys(selectedRooms)
                                .filter((roomId) => selectedRooms[Number(roomId)] > 0)
                                .map((roomId) => {
                                    const room = hostel?.rooms.find(r => r.id === Number(roomId));
                                    const beds = selectedRooms[Number(roomId)];
                                    const nights = getTotalNights();
                                    const roomTotal = room ? beds * room.price * nights : 0;

                                    if (!room) return null;

                                    return (
                                        <View key={roomId} className='flex-row justify-between items-center w-full p-4'>
                                            <View>
                                                <Text className='font-fbold'>{room.roomType}</Text>
                                                <Text className='text-sm text-gray-500'>{beds} {beds === 1 ? "bed" : "beds"} x {nights} {nights === 1 ? "night" : "nights"}</Text>
                                            </View>
                                            <Text className='font-fbold'>₹{roomTotal}</Text>
                                        </View>
                                    );
                                })}
                        </View>
                        <View className='w-full border-gray-200 border-b border-dashed' />
                        <View className='flex-row justify-between items-center w-full p-4'>
                            <Text className='font-fregular text-lg'>Total Tax</Text>
                            <Text className='font-fbold text-lg'>₹{calcTax(totalPrice)}</Text>
                        </View>
                        <View className='flex-row justify-between items-center w-full p-4'>
                            <Text className='font-fregular text-lg'> Grand Total</Text>
                            <Text className='font-fbold text-lg'>₹{totalPrice + calcTax(totalPrice)}</Text>
                        </View>
                        <View className='w-full py-8'>
                            <Pressable onPress={changeToReview} className='self-end'>
                                <Text className='font-fbold py-3 px-4 bg-primary rounded-full'>Continue</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>

            </Modal>

            {/* modal for calender  */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: '100%'
                }}>
                    <View style={{
                        backgroundColor: "white",
                        // padding: 20,
                        borderRadius: 10,
                        alignItems: "center",
                    }}>
                        <View className='flex-row justify-between items-ce w-full p-3'>
                            <Pressable onPress={() => setModalVisible(false)}>
                                <Text> <AntDesign name="closecircle" size={24} color="grey" /></Text>
                            </Pressable>
                            <Text style={{ fontSize: 18, marginBottom: 10, fontWeight: 'bold' }}>
                                Select dates
                            </Text>
                            <View className='ml-8' />
                        </View>
                        <Calendar
                            markingType={'period'}
                            markedDates={markedDates}

                            onDayPress={day => {
                                if (!dateRange.start || (dateRange.start && dateRange.end)) {
                                    // Start new selection
                                    setDateRange({ start: day.dateString, end: null });
                                } else if (dateRange.start && !dateRange.end) {
                                    // If picked before, set end date (only if end > start)
                                    if (new Date(day.dateString) > new Date(dateRange.start)) {
                                        setDateRange({ start: dateRange.start, end: day.dateString });
                                    } else {
                                        // If end < start, start new selection
                                        setDateRange({ start: day.dateString, end: null });
                                    }
                                }
                            }}
                            minDate={new Date().toISOString().split('T')[0]}
                            style={{ width: screenWidth }}
                        />
                        <View className='pb-20'>
                            <TouchableOpacity
                                disabled={!dateRange.end}
                                onPress={() => setModalVisible(false)}
                                className={`${dateRange.end ? "bg-primary" : "bg-yellow-200"} px-44 py-6 rounded-full`}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        color: dateRange.end ? 'black' : '#a3a3a3', // Black when active, gray when disabled
                                    }}>
                                    Update
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* modal for images  */}
            <Modal
                visible={imagesModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    width: '100%'
                }}>
                    <View style={{
                        backgroundColor: "white",
                        borderRadius: 10,
                        padding: 20,
                        width: '100%',
                        height: '100%'
                    }}>
                        <View className='flex-row justify-between items-center w-full p-4 my-10'>
                            <Text className='font-fbold text-2xl'>Images</Text>
                            <Pressable onPress={() => setImagesModal(false)}>
                                <AntDesign name="close" size={24} color="black" />
                            </Pressable>
                        </View>
                        <ScrollView>
                            {
                                hostel?.images?.map((imgUrl, index) => (
                                    <Image
                                        key={index}
                                        source={imgUrl ? { uri: imgUrl } : image}
                                        resizeMode='cover'
                                        className='w-full mb-5 rounded-lg h-60'
                                    />
                                ))
                            }
                        </ScrollView>

                    </View>
                </View>
            </Modal>




            <ScrollView className='relative'>
                <View className='w-full'>
                    <Image
                        source={hostel?.images?.length ? { uri: hostel?.images[0] } : image}
                        resizeMode='cover'
                        className='h-80 w-full mb-2'
                    />
                    <View className='flex-row gap-x-2'>
                        <Image
                            source={hostel?.images?.length ? { uri: hostel?.images[1] } : image}
                            resizeMode='cover'
                            className='h-60 w-1/2 mb-2'
                        />
                        <Image
                            source={hostel?.images?.length ? { uri: hostel?.images[2] } : image}
                            resizeMode='cover'
                            className='h-60 w-1/2 mb-2'
                        />
                    </View>
                    <TouchableOpacity onPress={() => setImagesModal(true)} className='absolute right-7 bottom-10 bg-white p-2  z-50 flex-row items-center gap-x-4 px-4 rounded-lg'>
                        <FontAwesome name="photo" size={24} color="black" />
                        <Text className=' font-fbold'>View all</Text>
                    </TouchableOpacity>
                </View>
                <View className='p-4'>
                    <Text className='text-3xl font-fbold'>{hostel?.name}</Text>
                    <Text className='text-xl font-fmedium mt-2'>
                        {hostel?.description}
                    </Text>
                    <Text className='text-xl font-fmedium mt-2'>
                        {hostel?.address} {hostel?.city} {hostel?.state}
                    </Text>
                    <View className='mt-3'>

                        {hostel?.amenities?.map((item, index) => (
                            <Amenitiy key={index} name={item} />
                        ))}
                    </View>
                    <Text className='my-6 text-2xl font-fbold'>Rooms</Text>
                    <View className='mb-52'>
                        {hostel?.rooms?.length ? (
                            hostel?.rooms.map((item) => (
                                <RoomCard
                                    key={item.id}
                                    roomId={item.id}
                                    roomType={item.roomType}
                                    price={item.price}
                                    availability={item.availability}
                                    onBedsChange={(beds: number) => handleRoomSelection(item.id, beds, item.price)}
                                />
                            ))
                        ) : (
                            <Text className='text-center text-gray-500'>No rooms available</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

export default Hostel