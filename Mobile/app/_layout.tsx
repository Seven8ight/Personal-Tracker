import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Navigation" options={{ headerShown: false }} />
    </Stack>
  );
}
