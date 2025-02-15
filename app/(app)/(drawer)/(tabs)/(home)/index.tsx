import {
  Image,
  StyleSheet,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { Link } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSessionStore } from "@/store";
import { homeStyles, QuickAccess, HomeNews } from "@/components/Home";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useSessionStore();

  return (
    <ThemedView style={styles.mainContainer}>
      <View style={homeStyles.paddingHor}>
        <ThemedText type="headline2" color="primary">
          {t("Kaixo!", { username: user?.name || user?.email })}
        </ThemedText>
        <ThemedText type="default" color="primary">
          {t("Arrasateko udaleko berriak eta zerbitzuak eskuragarri.")}
        </ThemedText>
      </View>
      <HomeNews></HomeNews>
      <QuickAccess></QuickAccess>
    </ThemedView>
  );
}

const padding = 24;
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    gap: 24,
    paddingTop: padding,
  },
});
