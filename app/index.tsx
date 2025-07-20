import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/(tabs)/home")}><Text className="bg-primary p-4 rounded-full">Get started</Text></TouchableOpacity>
    </View>
  );
}
