
import Feather from '@expo/vector-icons/Feather';
import Octicons from '@expo/vector-icons/Octicons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
const TabsLayout = () => {

    const handleTabPress = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
    };

    return (

        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                // tabBarActiveTintColor: '#000000',
                // tabBarInactiveTintColor: '#FFE700',
                tabBarStyle: {
                    position: 'absolute',
                    height: 80,
                    borderTopWidth: 0,
                    borderTopColor: 'transparent', // Ensuring no border
                    elevation: 0,
                    shadowColor: 'transparent',
                    shadowOpacity: 0,
                },
                tabBarBackground: () => (
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', 'white']} // Ensure both colors are visible
                        start={{ x: 0.5, y: 0 }} // Adjusted to prevent hard cut-off
                        end={{ x: 0.5, y: 0.3 }}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: 100, // Increased height to blend better
                        }}
                    />
                ),
            }}
        >
            <Tabs.Screen
                listeners={{
                    tabPress: handleTabPress
                }}
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Octicons
                            name="home"
                            size={24}
                            color={focused ? '#ff8a05' : '#3E1C00'} // Change color on focus
                        />
                    ),
                }}
            />

            <Tabs.Screen
                listeners={{
                    tabPress: handleTabPress
                }}
                name="bookings"
                options={{
                    title: 'Bookings',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Feather
                            name="credit-card"
                            size={24}
                            color={focused ? '#ff8a05' : '#3E1C00'} // Change color on focus
                        />
                    ),
                }}
            />



            <Tabs.Screen
                listeners={{
                    tabPress: handleTabPress
                }}
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Octicons
                            name="person"
                            size={24}
                            color={focused ? '#ff8a05' : '#3E1C00'} // Change color on focus
                        />
                    ),
                }}
            />

        </Tabs>

    );
};

export default TabsLayout;
