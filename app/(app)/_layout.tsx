import { useSessionStore } from "@/store";
import { Redirect, Stack, usePathname, useRouter } from "expo-router";

export default function appLayout() {
  const { session } = useSessionStore();
  const pathname = usePathname();
  console.log(pathname);
  if (!session) {
    return <Redirect href="/login"></Redirect>;
  } 
  return (
    <Stack>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />{" "}
    </Stack>
  );
}
