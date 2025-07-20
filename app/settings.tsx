import SettingsTab from '@/components/SettingsTab';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const Settings: React.FC = () => {

    // const { logout } = useContext(AuthContext)
    const logout = false;

    const handleLogout = async () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Logout",
                    style: "destructive",
                    onPress: async () => {
                        await logout();
                        router.replace('/'); // Navigate to login screen after logout
                    }
                }
            ]
        );
    };


    const optionsArray = [
        { id: '1', name: 'Notifications', icon: <FontAwesome5 name="bell" size={24} color="black" /> },
        { id: '2', name: 'Currency', icon: <FontAwesome5 name="dollar-sign" size={24} color="black" /> },
        // { id: '3', name: 'Logout', icon: <FontAwesome5 name="sign-out-alt" size={24} color="black" /> },
    ];

    return (
        <View style={styles.modal} className='px-10'>
            <View className='w-16 h-[4px] bg-gray-400 rounded-full self-center mb-10' />
            {optionsArray.map(item => {
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
            <Pressable onPress={handleLogout} className='gap-x-3 flex-row pb-4'>
                <Text> <FontAwesome5 name="sign-out-alt" size={24} color="black" /></Text>
                <Text className="font-fbold text-xl">Logout</Text>
            </Pressable>
            <View className='w-80 h-[1px] bg-gray-50 rounded-full self-center mb-7' />


        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        height: '40%', // Adjust height as needed (e.g., 30%, 40%, etc.)
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 }, // Adjust for top shadow
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Settings;
