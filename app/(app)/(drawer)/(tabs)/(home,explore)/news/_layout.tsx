import { Stack } from "expo-router";


export default function NewsLayout() {
  return (
    <Stack>
      <Stack.Screen name="[new]" options={{ headerShown: false }} />
    </Stack>
  );
}