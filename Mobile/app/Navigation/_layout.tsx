import { TabBar } from "@/Components/TabBar";
import { Tabs } from "expo-router";

const RootLayout = (): React.ReactNode => {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="index"
        options={{ headerShown: false, tabBarShowLabel: false }}
      />
      <Tabs.Screen name="Timer" options={{ title: "Timer" }} />
      <Tabs.Screen name="Profile" options={{ title: "Profile" }} />
    </Tabs>
  );
};

export default RootLayout;
