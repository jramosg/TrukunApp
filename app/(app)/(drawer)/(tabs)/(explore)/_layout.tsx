import { Stack } from "expo-router";


export default function Explore() {
  return (
    <Stack>
      <Stack.Screen name="explore" options={{ headerShown: false }} />
      <Stack.Screen name="news" options={{ headerShown: false }} />
    </Stack>
  );
}