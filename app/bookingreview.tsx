import { formatToUTCBookingReview, getNumberOfGuests, getTotalNights } from '@/utils/hostelUtils';
import { Picker } from '@react-native-picker/picker';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import UserInfo from '@/components/UserInfo';
import { useStripe } from '@stripe/stripe-react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import image from '../assets/images/c1.jpg';

const BookingReview = () => {
    const [editGuestModal, setEditGuestModal] = useState(false);
    const [guestList, setGuestList] = useState([]);
    const [editingGuestIndex, setEditingGuestIndex] = useState<number | null>(null);

    const { hostelImage, checkInDate, checkOutDate, selectedRooms, totalPrice, tax, grandTotal, totalNights } = useLocalSearchParams();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    let rooms: any[] = [];
    try {
        const selectedRoomsStr = Array.isArray(selectedRooms) ? selectedRooms[0] : selectedRooms;
        rooms = selectedRoomsStr ? JSON.parse(selectedRoomsStr) : [];
    } catch (e) {
        console.error("Invalid selectedRooms", e);
    }

    const nights = getTotalNights(totalNights);

    useEffect(() => {
        const guestCount = getNumberOfGuests(rooms);

        if (guestList.length !== guestCount) {
            const initialGuests = Array.from({ length: guestCount }, () => ({
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                gender: 'Male',
            }));
            setGuestList(initialGuests);
        }
    }, [rooms]);

    const getAmountInCents = (price) => {
        const priceValue = Array.isArray(price) ? price[0] : price;
        return Math.round(parseFloat(priceValue) * 100);
    };

    const fetchPaymentSheetParams = async () => {
        const response = await fetch(`http://192.168.29.221:8080/api/v1/payment-sheet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: getAmountInCents(grandTotal)
            })
        });

        const { paymentIntent, ephemeralKey, customer } = await response.json();

        return { paymentIntent, ephemeralKey, customer };
    };

    const initializePaymentSheet = async () => {
        try {
            const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams();

            const { error } = await initPaymentSheet({
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                merchantDisplayName: "The Hosteller",
                allowsDelayedPaymentMethods: true,
                defaultBillingDetails: { name: 'Saikat Mandal' },
            });

            if (error) {
                Alert.alert("Payment error", error.message);
            } else {
                setLoading(true);
            }
        } catch (e) {
            Alert.alert("Payment setup failed", e.message);
        }
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();
        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('✅ Success', 'Your order is confirmed!');
            router.replace("/(tabs)/home");
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);

    return (
        <View className='mt-20 flex-1'>
            <Pressable className='mt-4 mb-6 px-8' onPress={() => router.back()}>
                <Ionicons name="arrow-back-outline" size={24} color="black" />
            </Pressable>

            <ScrollView>
                <Text className='text-3xl font-fbold px-8'>Review your details</Text>

                <View className='flex-row items-center justify-between mt-8 border-b border-gray-200 pb-8 pt-4 mx-8'>
                    <View>
                        <Text>Check-In</Text>
                        <Text className='text-xl font-fbold'>{formatToUTCBookingReview(checkInDate)}</Text>
                    </View>
                    <Ionicons name="arrow-forward-outline" size={24} color="black" />
                    <View>
                        <Text>Check-Out</Text>
                        <Text className='text-xl font-fbold'>{formatToUTCBookingReview(checkOutDate)}</Text>
                    </View>
                </View>

                <Text className='text-2xl font-fbold py-6 px-8'>Room info</Text>
                {rooms.map((item, index) => (
                    <View
                        key={index}
                        className='flex-row justify-between items-center border-b border-gray-200 pb-8 pt-4 mx-8'
                    >
                        <View className='flex-row items-center gap-x-4'>
                            <Image
                                source={hostelImage ? { uri: Array.isArray(hostelImage) ? hostelImage[0] : hostelImage } : image}
                                className='h-20 w-20 rounded-2xl'
                            />
                            <View>
                                <Text className='font-fbold'>{item.roomType}</Text>
                                <Text className='font-fbold'>₹ {item.price} x {item.beds}</Text>
                                <Text className='font-fregular text-sm'>
                                    for {nights} {nights > 1 ? 'nights' : 'night'}
                                </Text>
                            </View>
                        </View>
                        <Text className='font-fregular'>₹ {item.price * item.beds}</Text>
                    </View>
                ))}

                <Text className='text-2xl font-fbold py-6 px-8'>Guest info</Text>
                <View className='border-b border-gray-200 pb-8 pt-4 mx-8'>
                    {guestList.map((guest, index) => (
                        <UserInfo
                            key={index}
                            name={guest.firstName || `Guest ${index + 1}`}
                            phone={guest.phone}
                            email={guest.email}
                            setEditGuestModal={() => {
                                setEditingGuestIndex(index);
                                setEditGuestModal(true);
                            }}
                        />
                    ))}
                </View>

                <Modal
                    visible={editGuestModal}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setEditGuestModal(false)}
                >
                    <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: 'rgba(0,0,0,0.5)', width: '100%' }}>
                        <View style={{ backgroundColor: "white", borderRadius: 10, padding: 20, width: '100%', height: '100%' }}>
                            <Pressable onPress={() => setEditGuestModal(false)}>
                                <MaterialIcons name="close" size={24} color="black" />
                            </Pressable>
                            <Text className='font-fbold my-10 text-2xl'>Edit Guest {editingGuestIndex !== null ? editingGuestIndex + 1 : ''}</Text>

                            {editingGuestIndex !== null && (
                                <>
                                    <TextInput
                                        placeholder="First Name"
                                        placeholderTextColor="black"
                                        className="border border-gray-300 rounded-xl h-16 px-4 text-lg"
                                        value={guestList[editingGuestIndex].firstName}
                                        onChangeText={(text) => {
                                            const updated = [...guestList];
                                            updated[editingGuestIndex].firstName = text;
                                            setGuestList(updated);
                                        }}
                                    />
                                    <TextInput
                                        placeholder="Last Name"
                                        placeholderTextColor="black"
                                        className="border border-gray-300 rounded-xl h-16 px-4 text-lg mt-8"
                                        value={guestList[editingGuestIndex].lastName}
                                        onChangeText={(text) => {
                                            const updated = [...guestList];
                                            updated[editingGuestIndex].lastName = text;
                                            setGuestList(updated);
                                        }}
                                    />
                                    <TextInput
                                        placeholder="Mobile Number"
                                        placeholderTextColor="black"
                                        keyboardType="phone-pad"
                                        className="border border-gray-300 rounded-xl h-16 px-4 text-lg mt-8"
                                        value={guestList[editingGuestIndex].phone}
                                        onChangeText={(text) => {
                                            const updated = [...guestList];
                                            updated[editingGuestIndex].phone = text;
                                            setGuestList(updated);
                                        }}
                                    />
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor="black"
                                        className="border border-gray-300 rounded-xl h-16 px-4 text-lg mt-8"
                                        value={guestList[editingGuestIndex].email}
                                        onChangeText={(text) => {
                                            const updated = [...guestList];
                                            updated[editingGuestIndex].email = text;
                                            setGuestList(updated);
                                        }}
                                    />
                                    <View className='border border-gray-300 rounded-xl overflow-hidden mt-8'>
                                        <Picker
                                            selectedValue={guestList[editingGuestIndex].gender}
                                            onValueChange={(value) => {
                                                const updated = [...guestList];
                                                updated[editingGuestIndex].gender = value;
                                                setGuestList(updated);
                                            }}
                                            style={{ height: 50, color: 'black' }}
                                        >
                                            <Picker.Item label="Select Gender" value="" />
                                            <Picker.Item label="Male" value="Male" />
                                            <Picker.Item label="Female" value="Female" />
                                        </Picker>
                                    </View>
                                </>
                            )}

                            <TouchableOpacity
                                onPress={() => {
                                    setEditGuestModal(false);
                                    setEditingGuestIndex(null);
                                }}
                                className='bg-primary p-4 flex justify-center items-center mt-10 mb-10 rounded-lg'
                            >
                                <Text className='text-xl font-fbold'>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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

                <View className='flex-row items-center justify-between mb-4 p-4 rounded-xl mx-4 bg-[#FFFAFA]'>
                    <Text className='text-xl font-fbold'>Grand total</Text>
                    <Text className='text-xl font-fsemibold'>₹ {grandTotal}</Text>
                </View>

                <View className='mt-8 border-t border-gray-200 mx-8 mb-8' />
                <Text className='mx-8'>By proceeding you acknowledge and accept the terms and conditions mentioned in the property policy and cancellation policy.</Text>

                <TouchableOpacity
                    onPress={async () => {
                        await initializePaymentSheet().then(openPaymentSheet);
                    }}
                    className='bg-primary mx-8 p-4 flex justify-center items-center mt-10 mb-10 rounded-lg'
                >
                    <Text className='text-xl font-fbold'>Proceed to pay</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

export default BookingReview;
