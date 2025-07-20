import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Image, ImageBackground, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import girl from '../../assets/images/girl.jpg';
import leather from '../../assets/images/leather.jpg';

const Profile = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    // const { token } = useContext(AuthContext);

    // useEffect(() => {
    //     const getUserDetails = async () => {
    //         try {
    //             const res = await axios.get('http://192.168.29.221:8080/api/v1/auth/public/user', {
    //                 headers: {
    //                     'Authorization': `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             setUserDetails(res.data);
    //         } catch (error) {
    //             console.error('Error fetching user details:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     getUserDetails();
    // }, []);

    // if (loading) {
    //     return (
    //         <View className='flex-1 justify-center items-center'>
    //             <ActivityIndicator size='large' color='#51344D' />
    //         </View>
    //     );
    // }

    return (
        <View className='flex-1'>
            <View className='mt-20 px-8'>
                <View className='flex-row items-center justify-between'>
                    <Pressable onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                        router.push('/settings');
                    }}>
                        <Ionicons name='settings' size={32} color='black' />
                    </Pressable>
                    <Pressable onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                        router.push('/option');
                    }}>
                        <Entypo name='menu' size={32} color='black' />
                    </Pressable>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='items-center mt-10 rounded-3xl'>
                        <View className='h-80 w-4/6 rounded-e-[1.8em] bg-primary rounded-s-md items-center relative overflow-hidden'>
                            <ImageBackground source={leather} resizeMode='cover' className='absolute inset-0 w-full h-full opacity-50' />
                            <Text className='mt-8 font-fbold text-[#fff185] text-xl '>GLU VISA</Text>
                            <View className='border-[#51344D] h-32 w-32 border-4 rounded-full p-1 z-10 mt-8'>
                                <Image
                                    source={girl}
                                    className='rounded-full w-full h-full'
                                    onLoadStart={() => setImageLoaded(false)}
                                    onLoad={() => setImageLoaded(true)}
                                />
                                {!imageLoaded && (
                                    <ActivityIndicator
                                        className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
                                        color='#51344D'
                                    />
                                )}
                            </View>
                            <Text className='mt-8 font-fbold text-[#fff185] text-xl'>{userDetails?.firstName ?? 'N/A'} {userDetails?.lastName ?? ''}</Text>
                            <Text className='font-fbold text-[#fff185] text-sm'>Glu traveller</Text>
                        </View>
                    </View>
                    <Text className='font-fbold text-2xl mt-10 text-left'>Traveller info</Text>
                    <View>
                        <Text className='text-xl font-fregular mb-5 mt-8'>Full name: <Text className='text-xl font-fsemibold'>{userDetails?.firstName ?? 'N/A'} {userDetails?.lastName ?? ''}</Text></Text>
                        <Text className='text-xl font-fregular mb-5'>Also: <Text className='text-xl font-fsemibold'>{userDetails?.username ?? 'N/A'}</Text></Text>
                        <Text className='text-xl font-fregular mb-5'>Birthday: <Text className='text-xl font-fsemibold'>{userDetails?.birthDate ?? 'Not provided'}</Text></Text>
                        <Text className='text-xl font-fregular mb-5'>Gender: <Text className='text-xl font-fsemibold'>{userDetails?.gender ?? 'Not specified'}</Text></Text>
                        <Text className='text-xl font-fregular mb-5'>Phone number: <Text className='text-xl font-fsemibold'>{userDetails?.phone ?? 'Not available'}</Text></Text>
                        <Text className='text-xl font-fregular mb-5'>Email: <Text className='text-xl font-fsemibold'>{userDetails?.email ?? 'Not available'}</Text></Text>
                        <Text className='text-xl font-fregular mb-5'>Traveller from <Text className='text-xl font-fsemibold'>{userDetails?.country ?? 'Unknown'}</Text></Text>
                        <Text className='text-xl font-fregular mb-5'>Lives in city <Text className='text-xl font-fsemibold'>{userDetails?.city ?? 'Not specified'}</Text></Text>
                    </View>
                    <Text className='font-dregualar text-6xl text-center mb-0 mt-10 text-stone-500'>Glu</Text>
                    <Text className='font-fthin text-sm text-neutral-400 mb-48'>v1.2.0 build 15</Text>
                </ScrollView>
            </View>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
        </View>
    );
};

export default Profile;
