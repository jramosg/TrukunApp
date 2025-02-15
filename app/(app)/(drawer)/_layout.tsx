import { ThemeSwitch } from "@/components";
import { ThemedText } from "@/components/ThemedText";
import { supabase } from "@/lib/supabase";
import { useSessionStore } from "@/store";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

function CustomDrawerContent(props) {
  const { user, setSession } = useSessionStore();
  const handleLogout = async () => {
    try {
      console.log("sigend out!");
      setSession(null);
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <ThemeSwitch></ThemeSwitch>
      <DrawerItem label="Saioa bukatu" onPress={handleLogout} />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Home",
            title: "settings",
            drawerType: "slide",
            headerShown: false,
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
