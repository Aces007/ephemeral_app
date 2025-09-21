import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> 

      <Stack.Screen name="(auth)" options={{ headerShown: false }}/>

      <Stack.Screen name="(introduction)" options={{ headerShown: false }}/>

      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    </Stack>
  );
}
