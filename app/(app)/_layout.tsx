import { useSessionStore } from "@/store";
import { Redirect, Stack, } from "expo-router";

export default function AppLayout() {
  const { session } = useSessionStore();
  if (!session) {
    return <Redirect href="/login"></Redirect>;
  }
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
