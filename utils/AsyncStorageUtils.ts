import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error("Error storing value", error);
    }
};

export const getItem = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error("Error retrieving value", error);
    }
};

export const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing value", error);
    }
};
