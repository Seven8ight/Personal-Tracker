import { SafeAreaView, StatusBar, Text, View } from "react-native";

const Timer = (): React.ReactNode => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="black" />
      <View
        style={{
          flex: 1,
          borderRadius: 10,
          padding: 10,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Timer</Text>
      </View>
    </SafeAreaView>
  );
};

export default Timer;
