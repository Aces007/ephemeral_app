import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="./screens/SurveyScreens/SurveyOne" />
      <Stack.Screen name="./screens/SurveyScreens/SurveyTwo" />
    </Stack>
  )
}
