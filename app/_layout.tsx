import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" /> {/* Splash screen */}
      <Stack.Screen name="screens/SurveyScreens/Surveys" />

      {/* Main app with tabs */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
