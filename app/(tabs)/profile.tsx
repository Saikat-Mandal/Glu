import SettingsTab from '@/components/SettingsTab';
import { useAuth } from "@/context/AuthContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import axios from 'axios';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ImageBackground, Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import girl from '../../assets/images/girl.jpg';
import leather from '../../assets/images/leather.jpg';

const Profile = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const [openSettings, setOpenSettings] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)

    const { logout } = useAuth()


    const settingsArray = [
        { id: '1', name: 'Notifications', icon: <FontAwesome5 name="bell" size={24} color="black" /> },
        { id: '2', name: 'Currency', icon: <FontAwesome5 name="dollar-sign" size={24} color="black" /> },
        // { id: '3', name: 'Logout', icon: <FontAwesome5 name="sign-out-alt" size={24} color="black" /> },
    ];

    const onLogout = () => {
        logout()
        Alert.alert("Successfully logged out!")
        router.replace("/(tabs)/home")
    }

    const optionsArray = [
        {
            id: '1',
            name: 'About The Hosteller',
            icon: <MaterialIcons name="hotel-class" size={24} color="black" />,
            pagelink: "https://www.thehosteller.com/about/",
        },
        {
            id: '2',
            name: 'Career',
            icon: <FontAwesome5 name="briefcase" size={24} color="black" />,
            pagelink: "https://www.linkedin.com/company/the-hosteller-hospitality/jobs/?originalSubdomain=in",
        },
        {
            id: '3',
            name: 'Contact Us',
            icon: <FontAwesome5 name="phone" size={24} color="black" />,
            pagelink: "https://www.thehosteller.com/contactus/",
        },
        {
            id: '4',
            name: 'Terms and Conditions',
            icon: <FontAwesome5 name="file-contract" size={24} color="black" />,
            pagelink: "https://www.thehosteller.com/policies/",
        },
        {
            id: '5',
            name: 'Privacy Policy',
            icon: <FontAwesome5 name="user-shield" size={24} color="black" />,
            pagelink: "https://www.thehosteller.com/policies/",
        },
        {
            id: '6',
            name: 'Guest Policy',
            icon: <FontAwesome5 name="users" size={24} color="black" />,
            pagelink: "https://www.thehosteller.com/policies/",
        },
        {
            id: '7',
            name: 'Delete Account',
            icon: <FontAwesome5 name="trash-alt" size={24} color="#FF2400" />,
            textStyles: "text-[#FF2400]",
            pagelink: "/delete",
        }
    ];

    const handleSocialLink = async (url: string) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
        await Linking.openURL(url);
    };

    const SocialButton = ({ url, icon }: { url: string, icon: React.ReactNode }) => (
        <TouchableOpacity
            onPress={() => handleSocialLink(url)}
            style={styles.socialButton}
        >
            {icon}
        </TouchableOpacity>
    );

    const { token } = useAuth();

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get('http://192.168.29.221:8080/api/v1/auth/user', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                setUserDetails(res.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        getUserDetails();
    }, []);

    if (loading) {
        return (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size='large' color='#51344D' />
            </View>
        );
    }

    return (
        <View className='flex-1'>
            <View className='mt-10 px-8'>
                <View className='flex-row items-center justify-between'>
                    <Pressable onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                        setOpenSettings(true)
                    }} >
                        <Ionicons name='settings' size={32} color='black' />
                    </Pressable>
                    <Pressable onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                        setOpenOptions(true)
                    }} >
                        <Entypo name='menu' size={32} color='black' />
                    </Pressable>
                </View>

                {/* modal for settings */}

                <Modal
                    visible={openSettings}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setOpenSettings(false)}
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
                            height: '50%'
                        }}>

                            <View className='px-4'>
                                {/* <View className='w-16 h-[4px] bg-gray-400 rounded-full self-center mb-10' /> */}
                                <Pressable className='w-full mb-10' onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                                    setOpenSettings(false)
                                }}>
                                    <AntDesign className='self-end' name="closecircle" size={24} color="black" />
                                </Pressable>

                                {settingsArray.map(item => {
                                    return (
                                        <SettingsTab
                                            id={item.id}
                                            key={item.id}
                                            name={item.name}
                                            icon={item.icon}
                                            pagelink={item.pagelink}
                                        />
                                    )
                                })}
                                <Pressable onPress={onLogout} className='gap-x-3 flex-row pb-4'>
                                    <Text> <FontAwesome5 name="sign-out-alt" size={24} color="black" /></Text>
                                    <Text className="font-fbold text-xl">Logout</Text>
                                </Pressable>
                                <View className='w-80 h-[1px] bg-gray-50 rounded-full self-center mb-7' />


                            </View>

                        </View>
                    </View>
                </Modal>

                {/* modal for options  */}

                <Modal
                    visible={openOptions}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setOpenOptions(false)}
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
                            height: '80%'
                        }}>

                            <View className='px-4'>
                                {/* <View className='w-16 h-[4px] bg-gray-400 rounded-full self-center mb-10' /> */}
                                <Pressable className='w-full mb-10' onPress={() => {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
                                    setOpenOptions(false)
                                }}>
                                    <AntDesign className='self-end' name="closecircle" size={24} color="black" />
                                </Pressable>

                                <View className='px-4'>


                                    {/* Settings Options */}
                                    {optionsArray.map(item => (
                                        <SettingsTab
                                            key={item.id}
                                            id={item.id}
                                            name={item.name}
                                            icon={item.icon}
                                            textStyles={item.textStyles}
                                            pagelink={item.pagelink}
                                        />
                                    ))}

                                    {/* Social Media Section */}
                                    <View style={styles.socialSection}>
                                        <Text className='font-fbold text-xl text-center text-stone-500'>
                                            Check us out on
                                        </Text>
                                        <View className='flex-row justify-center mt-5 gap-x-10'>
                                            <SocialButton
                                                url="https://www.instagram.com/thehosteller/"
                                                icon={<Entypo name="instagram" size={24} color="#BE00A7" />}
                                            />
                                            <SocialButton
                                                url="https://x.com/thehosteller"
                                                icon={<FontAwesome6 name="x-twitter" size={24} color="black" />}
                                            />
                                            <SocialButton
                                                url="https://www.youtube.com/@The_Hosteller"
                                                icon={<Entypo name="youtube" size={24} color="red" />}
                                            />
                                        </View>
                                    </View>
                                </View>

                            </View>

                        </View>
                    </View>
                </Modal>


                <ScrollView showsVerticalScrollIndicator={false}>
                    <View className='items-center mt-20 rounded-3xl'>
                        <View
                            style={{
                                borderRadius: 30
                            }}
                            className='h-80 w-4/6 bg-primary items-center relative overflow-hidden'>
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

const styles = StyleSheet.create({

    socialSection: {
        paddingBottom: 20,
    },
    socialButton: {
        padding: 8,
    },
});


export default Profile;
