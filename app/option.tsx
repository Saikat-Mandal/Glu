import SettingsTab from '@/components/SettingsTab';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Option = () => {
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

    return (
        <View style={styles.modal} className='px-10'>
            <View className='w-16 h-[4px] bg-gray-400 rounded-full self-center mb-10' />

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
    );
};

const styles = StyleSheet.create({
    modal: {
        height: '80%',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    socialSection: {
        paddingBottom: 20,
    },
    socialButton: {
        padding: 8,
    },
});

export default Option;