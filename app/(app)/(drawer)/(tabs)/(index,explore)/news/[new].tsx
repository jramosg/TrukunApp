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
import HomeNews from "@/components/Home/News";
import { homeStyles } from "@/components";

export default function HomeScreen() {
  const { t } = useTranslation();
  const { user } = useSessionStore();

  return <ThemedText>AAA</ThemedText>;
}
